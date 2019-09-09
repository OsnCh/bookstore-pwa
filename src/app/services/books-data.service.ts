import { Injectable, EventEmitter } from '@angular/core';
import { GetBooksModel } from '../shared/models/getBooks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';
import { GetBooksItemModel } from '../shared/models/getBooksItem.model';

@Injectable()
export class BooksDataService{

    constructor(private readonly httpClient: HttpClient,
        private loadingController: LoadingController){}

    public booksChange: EventEmitter<GetBooksModel> = new EventEmitter();

    private _books: GetBooksModel = new GetBooksModel();
    public get books(): GetBooksModel{
        return this._books;
    }
    public set books(value: GetBooksModel){
        this._books = value;
        this.booksChange.emit(value);
    }

    async loadBooks(): Promise<void>{
        let loader = await this.loadingController.create({
            message: 'Loading'
        });
        await loader.present();       
        this.httpClient.get<GetBooksModel>(`${environment.apiUrl}book/all`).
            subscribe((data) => {
                this.books = data;
                loader.dismiss()
            }, () => {
                this.books = new GetBooksModel();
                loader.dismiss()
            })
    }

    public async getBookById(id: string): Promise<GetBooksItemModel>{
        let book = this.books.books.find(b => b.id == id)
        if(!book){
            await this.loadBooks();
            await new Promise((resolve) => {
                let loadSubscr = this.booksChange.subscribe(() => {
                    book = this.books.books.find(b => b.id == id)
                    loadSubscr.unsubscribe();
                    resolve();
                })
            })
        }
        return book || new GetBooksItemModel();
    }

}