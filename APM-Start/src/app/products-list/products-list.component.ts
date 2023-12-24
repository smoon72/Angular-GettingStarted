import { Component, OnDestroy, OnInit } from '@angular/core';

import { IProduct } from '../product'
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';

  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  private _listFilter!:string;
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  errorMessage?:string;

  sub?: Subscription;

  get listFilter():string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }
  
  constructor(private productService: ProductService) { }

  onRatingClicked(message: string) {
    this.pageTitle = 'Product List: ' + message;
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.listFilter = '';
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err,
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleImage():void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();

    return this.products.filter(product => 
      product.productName.toLowerCase().includes(filterBy))
  }

}
