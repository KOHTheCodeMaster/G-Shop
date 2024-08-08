import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Product} from "../interface/Product";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productsKey = 'products';
    private productsUrl = '/assets/products.json';

    constructor(private http: HttpClient) {
        // Initialize local storage with products.json data if not already present
        if (!localStorage.getItem(this.productsKey)) this.loadInitialData();
    }

    private getProductListFromLocalStorage(): Product[] {
        return JSON.parse(localStorage.getItem(this.productsKey) || '[]');
    }

    // Load initial data from JSON file into local storage
    private loadInitialData() {
        this.http.get<Product[]>(this.productsUrl).subscribe((productsJsonData: Product[]) =>
            localStorage.setItem(this.productsKey, JSON.stringify(productsJsonData)));
    }

    // Get all products
    getProducts(): Observable<Product[]> {
        const products: Product[] = this.getProductListFromLocalStorage();
        return of(products);
    }

    // Get a product by ID
    getProductById(productId: string): Product | undefined {
        return this.getProductListFromLocalStorage()
            .find((product: Product) => product.id === Number(productId));
    }

    createProduct(product: Product): Observable<Product> {
        const products: Product[] = this.getProductListFromLocalStorage();
        product.id = products.length ? products[products.length - 1].id + 1 : 1; // Generate new product id
        products.push(product);
        localStorage.setItem(this.productsKey, JSON.stringify(products));
        // this.saveProductsToJson(products); // Save updated products to JSON file
        return of(product);
    }

/*
    // Update an existing product
    updateProduct(updatedProduct: Product): Observable<Product> {
        let products: Product[] = this.getProductListFromLocalStorage();
        products = products.map((product: Product) => product.id === updatedProduct.id ? updatedProduct : product);
        localStorage.setItem(this.productsKey, JSON.stringify(products));
        this.saveProductsToJson(products); // Save updated products to JSON file
        return of(updatedProduct);
    }

    // Delete a product by ID
    deleteProduct(productId: number): Observable<void> {
        let products: Product[] = this.getProductListFromLocalStorage();
        products = products.filter((product: Product) => product.id !== productId);
        localStorage.setItem(this.productsKey, JSON.stringify(products));
        this.saveProductsToJson(products); // Save updated products to JSON file
        return of();
    }

    // Saving Products is out of scope for this course.  This is a placeholder for a real application.
    private saveProductsToJson(products: Product[]): void {
    }
*/

}
