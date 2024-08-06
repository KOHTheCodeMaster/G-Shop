import {Injectable} from '@angular/core';
import {Category} from "../interface/Category";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor() {
    }

    //  Return a list of categories
    getCategoryList(): Category[] {
        return [
            {id: 1, name: 'Fruits'},
            {id: 2, name: 'Vegetables'},
            {id: 3, name: 'Dairy'},
            {id: 4, name: 'Beverages'},
            {id: 5, name: 'Snacks'},
        ];
    }

}
