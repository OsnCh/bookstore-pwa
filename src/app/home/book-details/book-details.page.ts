import { Component } from '@angular/core';
import { BaseBookComponent } from '../common/base-book.component';
import { HomeTitleService } from 'src/app/services/home-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksDataService } from 'src/app/services/books-data.service';
import { GetBooksItemModel } from 'src/app/shared/models/getBooksItem.model';
import { takeUntil } from 'rxjs/operators';
import { GetSelectCategoryModel } from 'src/app/shared/models/getSelectCategory.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeBookDataService } from 'src/app/services/change-book-data.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage extends BaseBookComponent {

  private isChanged: boolean = false;

  constructor(protected readonly titleService: HomeTitleService,
    private readonly route: ActivatedRoute,
    private readonly dataService: BooksDataService,
    private readonly formBuilder: FormBuilder,
    private readonly changeBookService: ChangeBookDataService,
    private readonly router: Router)  {
    super(titleService);
  }

  public book = new GetBooksItemModel();
  public categories: GetSelectCategoryModel[] = [];

  public bookForm: FormGroup;

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      price: ['' , [Validators.required, Validators.pattern(/[0-9]/)]],
      description: ['' , [Validators.required, Validators.minLength(20)]]
    })
    this.route.params.pipe(takeUntil(this.onDestroy)).subscribe(params => {
      this.dataService.getBookById(params['id']).then(book => {
        this.book = Object.assign({}, book);
        this.bookForm.controls['price'].setValue(book.price);
        this.bookForm.controls['description'].setValue(book.description)
        this.categories = this.dataService.books.categories;
        this.bookForm.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => this.isChanged = true)
      });
    });
  }

  public get selectCategory(): GetSelectCategoryModel{
    if(!this.book.category && this.categories.length > 0){
      let selectCategory = this.categories[0];
      this.book.category = selectCategory;
      this.isChanged = true;
    }
    return this.book.category;
  }

  public set selectCategory(value: GetSelectCategoryModel){
    this.book.category = value;
    this.isChanged = true;
  }

  public get disabledSave(){
    return !this.isChanged || !this.bookForm.valid;
  }

  public isValidControl(name: string): boolean{
    let control = this.bookForm.controls[name];
    if(!control){
      return false;
    }
    return control.valid;
  }

  public async save(){
    this.book.description = this.bookForm.controls['description'].value;
    this.book.price = this.bookForm.controls['price'].value;
    await this.changeBookService.updateBook(this.book);
    this.dataService.loadBooks();
    this.router.navigate(['/home']);
  }

  ionViewWillEnter(){
    this.showBackButton = true;
    this.title = "Book details"
  }

}
