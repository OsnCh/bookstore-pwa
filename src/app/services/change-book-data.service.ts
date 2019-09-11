import { Injectable, EventEmitter } from '@angular/core';
import { UpdateBookRepository } from './repositories/update-book.repository';
import { UpdateBookModel } from '../shared/models/updateBook.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BookEntity } from '../shared/entities/book.entity';
import { GetBooksModel } from '../shared/models/getBooks.model';
import { LoadingController } from '@ionic/angular';
import { GetBooksItemModel } from '../shared/models/getBooksItem.model';

@Injectable()
export class ChangeBookDataService{

    constructor(private readonly repository: UpdateBookRepository,
        private readonly http: HttpClient,
        private readonly loadingController: LoadingController){
            window.addEventListener('online', () => this.sendOfflineData())
        }

    public readonly apiDataPushedEvent: EventEmitter<void> = new EventEmitter<void>(); 

    public async updateBook(model: GetBooksItemModel): Promise<void>{
        let loader = await this.loadingController.create({
            message: 'Loading'
        });
        await loader.present();
        let updateModel = new UpdateBookModel();
        updateModel.id = model.id;
        updateModel.description = model.description;
        updateModel.categoryId = model.category.id;
        updateModel.name = model.name;
        updateModel.price = model.price;
        await this.update(updateModel);
        await loader.dismiss();
    }

    private async update(model: UpdateBookModel): Promise<void>{
        if(window.navigator.onLine){
            await this.sendUpdateToApi(model);
            return;
        }
        return this.saveDataForOffline(model);
    }

    public async updateCacheResponse(model: GetBooksModel): Promise<GetBooksModel>{
        let savedBooks = await this.repository.getAll();
        model.books.forEach(v => {
            let updatesBook = savedBooks.find(s => s.id == v.id);
            if(!updatesBook){
                return;
            }
            v.category = model.categories.find(v => v.id == updatesBook.categoryId);
            v.description = updatesBook.description;
            v.name = updatesBook.name;
            v.price = updatesBook.price;
        });
        return model;
    }

    private async saveDataForOffline(model: UpdateBookModel): Promise<void>{
        let updateEntity = new BookEntity();
        updateEntity.categoryId = model.categoryId;
        updateEntity.description = model.description;
        updateEntity.id = model.id;
        updateEntity.name = model.name;
        updateEntity.price = model.price;
        let books = await this.repository.getAll()
        let existBook = books.find(b => b.id == model.id);
        if(existBook){
            this.repository.delete(existBook._id);
        }
        return this.repository.add(updateEntity)
    }

    public async sendOfflineData(): Promise<void>{
        console.log('online')
        let books = await this.repository.getAll();
        if(!books || books.length == 0 || !window.navigator.onLine){
            return;
        }
        for(let i=0; i< books.length; i++){
            let entity = books[i];
            let model = new UpdateBookModel();
            model.categoryId = entity.categoryId;
            model.description = entity.description;
            model.id = entity.id;
            model.name = entity.name;
            model.price = entity.price;
            await this.sendUpdateToApi(model)
        }
        this.repository.clear();
        this.apiDataPushedEvent.emit();
    }

    private async sendUpdateToApi(model: UpdateBookModel): Promise<void>{
        await new Promise((resolve) => this.http.post(`${environment.apiUrl}book/update`, model).
            subscribe(() => resolve(), () => resolve()))
    }
}