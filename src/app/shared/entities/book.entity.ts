import { BaseEntity } from './base.entity';

export class BookEntity extends BaseEntity{
    id: string;
    price: number;
    categoryId: string;
    name: string;
    description: string;
}