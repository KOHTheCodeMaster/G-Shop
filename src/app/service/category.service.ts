import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor() {
    }

    //  Return a list of categories
    getCategoryList(): string[] {
        return [
            'Fruits',
            'Vegetables',
            'Dairy',
            'Beverages',
            'Snacks',
        ];
    }

}
