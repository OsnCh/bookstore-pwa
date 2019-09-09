import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { HomeTitleService } from '../services/home-title.service';
import { BooksPage } from './books/books.page';
import { BookDetailsPage } from './book-details/book-details.page';
import { BooksDataService } from '../services/books-data.service';

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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage, BookDetailsPage, BooksPage],
  providers: [HomeTitleService, BooksDataService]
})
export class HomePageModule { }
