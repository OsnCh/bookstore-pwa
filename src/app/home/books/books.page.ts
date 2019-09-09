import { Component } from '@angular/core';
import { BaseBookComponent } from '../common/base-book.component';
import { HomeTitleService } from 'src/app/services/home-title.service';
import { BooksDataService } from 'src/app/services/books-data.service';
import { takeUntil } from 'rxjs/operators';
import { GetBooksItemModel } from 'src/app/shared/models/getBooksItem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage extends BaseBookComponent{

  constructor(protected readonly titleService: HomeTitleService,
    private readonly dataService: BooksDataService,
    private readonly router: Router)  {
    super(titleService);
  }

  public books: GetBooksItemModel[] = []

  ngOnInit() {
    this.dataService.booksChange.
      pipe(takeUntil(this.onDestroy)).subscribe(data => this.books = data.books)
    this.dataService.loadBooks();
  }

  ionViewWillEnter(){
    this.showBackButton = false;
    this.title = "Books"
  }

  public navigateDetails(id: string){
    this.router.navigate(['/home', 'book', 'details', id])
  }

}
