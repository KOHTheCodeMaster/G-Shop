import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../interface/Category";
import {NgFor} from "@angular/common";

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [RouterLink, NgFor],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

    categoryList: Category[];

    constructor(categoryService: CategoryService) {
        this.categoryList = categoryService.getCategoryList();
    }
}
