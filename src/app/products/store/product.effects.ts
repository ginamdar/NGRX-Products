import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductService} from '../services/product.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import * as fromProductActions from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductActions.loadProducts),
    mergeMap(() => this.productService.getProducts()
      .pipe(
        map(
          products => fromProductActions.loadProductsSuccess({products})
        ),
        catchError((err) => of(fromProductActions.loadProductsFailure({error: err})))
      ))
    )
  );

}
