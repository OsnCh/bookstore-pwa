export class UpdateBookModel{
    id: string;
    price: number;
    categoryId: string;
    name: string;
    readonly isActive: boolean = true;
    description: string;
}