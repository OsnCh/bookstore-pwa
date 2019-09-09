import { GetSelectCategoryModel } from './getSelectCategory.model';

export class GetBooksItemModel{
    id: string;
    price: number;
    category: GetSelectCategoryModel = new GetSelectCategoryModel();
    name: string;
    description: string;
    isActive: boolean;
}