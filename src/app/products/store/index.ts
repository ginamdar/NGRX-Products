import {
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {Product} from '../models/product';
import {loadProductsFailure, loadProductsSuccess} from './product.actions';

export const productStateFeatureKey = 'productState';

export interface ProductState {
  products: Product[];
  error: any;
}

export const initialState: ProductState = {
  products: undefined,
  error: undefined
}

export const reducers = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return {
      products: action.products,
      error: undefined
    }
  }),
  on(loadProductsFailure, (state, action) => {
    return {
      products: state.products,
      error: action.error
    }
  }),
);

export const selectProductsFeature = createFeatureSelector<ProductState>(productStateFeatureKey);

export const selectProducts = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.products
);


export const metaReducers: MetaReducer<ProductState>[] = !environment.production ? [] : [];
