import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CategoryService} from "../../../service/category.service";

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [
        NgForOf,
        RouterLink
    ],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css'
})
export class CategoryComponent {

    categories: string[];

    constructor(categoryService: CategoryService) {
        this.categories = categoryService.getCategoryList();    //  Get the list of categories
    }

}
