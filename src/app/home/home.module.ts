import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { HomePage } from './home.page';
import { HomeTitleService } from '../services/home-title.service';
import { BooksPage } from './books/books.page';
import { BookDetailsPage } from './book-details/book-details.page';
import { BooksDataService } from '../services/books-data.service';
import { UpdateBookRepository } from '../services/repositories/update-book.repository';
import { ChangeBookDataService } from '../services/change-book-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books'
  },
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'books',
        component: BooksPage
      },
      {
        path: 'book/details/:id',
        component: BookDetailsPage
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgSelectModule
  ],
  declarations: [HomePage, BookDetailsPage, BooksPage],
  providers: [HomeTitleService, BooksDataService, 
    UpdateBookRepository, ChangeBookDataService]
})
export class HomePageModule { }
