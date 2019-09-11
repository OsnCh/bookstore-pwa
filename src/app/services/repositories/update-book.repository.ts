import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { BookEntity } from 'src/app/shared/entities/book.entity';

@Injectable()
export class UpdateBookRepository extends BaseRepository<BookEntity>{
    constructor(){
        super({
            name: 'books',
            properties: [
                { name: 'id', unique: true },
                { name: 'price' },
                { name: 'categoryId' },
                { name: 'name' },
                { name: 'description' }
            ]
        });
    }
}