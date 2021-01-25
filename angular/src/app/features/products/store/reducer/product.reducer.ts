import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {productActionTypes} from "../action/product.actions";
import {Product} from "../../model/product";

export const productFeatureKey = 'products';

export interface ProductState extends EntityState<Product> {
  productsLoaded: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id
});

export const initialState = adapter.getInitialState({
  productsLoaded: false
});


export const productReducer = createReducer(
  initialState,
  on(productActionTypes.productsLoaded, (state, action) => {
    return adapter.addMany(
      action.products,
      {...state, productsLoaded: true}
    );
  }),
  on(productActionTypes.oneProductLoaded, (state, action) => {
    return adapter.addOne(action.product, {...state, productsLoaded: true});
  }),
  on(productActionTypes.addProduct, (state, action) => {
    return adapter.addOne(action.product, state);
  }),
  on(productActionTypes.deleteProduct, (state, action) => {
    return adapter.removeOne(action.productId, state);
  }),
  on(productActionTypes.updateProduct, (state, action) => {
    return adapter.updateOne(action.product, state);
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();



