import { Component, OnInit } from '@angular/core';
import { BaseBookComponent } from '../common/base-book.component';
import { HomeTitleService } from 'src/app/services/home-title.service';
import { ActivatedRoute } from '@angular/router';
import { BooksDataService } from 'src/app/services/books-data.service';
import { GetBooksItemModel } from 'src/app/shared/models/getBooksItem.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage extends BaseBookComponent {

  constructor(protected readonly titleService: HomeTitleService,
    private readonly route: ActivatedRoute,
    private readonly dataService: BooksDataService)  {
    super(titleService);
  }

  public book = new GetBooksItemModel();

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.onDestroy)).subscribe(params => {
      this.dataService.getBookById(params['id']).then(book => this.book = book);
    });
  }

  ionViewWillEnter(){
    this.showBackButton = true;
    this.title = "Book details"
  }

}
