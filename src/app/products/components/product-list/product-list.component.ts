import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import {select, Store} from '@ngrx/store';
import {ProductState, selectProducts} from '../../store';
import * as productActions from '../../store/product.actions';
import {Observable} from 'rxjs';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService, public router: Router, private store: Store<ProductState>) {}

  ngOnInit() {
    this.store.dispatch(productActions.loadProducts());
    this.loadProducts();
  }

  loadProducts() {
    const productsObserver = {
      next: products => {
        this.store.dispatch(productActions.loadProductsSuccess({ products: products }));
      },
      error: err => {
        this.store.dispatch(productActions.loadProductsFailure({error: err}));
        console.error(err)
      }
    };

    this.productService.getProducts().subscribe(productsObserver);
    this.products$ = this.store
      .pipe(
        select(selectProducts)
      )
  }

  deleteProduct(id: number) {
    const productsObserver = {
      next: () => {
        console.log("Product Deleted");
        this.ngOnInit();
      },
      error: err => console.error(err)
    };
    this.productService.deleteProduct(id).subscribe(productsObserver);
  }
}
