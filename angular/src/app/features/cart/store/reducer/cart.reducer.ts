import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {cartActionTypes} from "../action/cart.actions";
import {Product} from "../../../products/model/product";

export const cartFeatureKey = 'cart';

export interface CartState extends EntityState<Product> {
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id
});

export const initialState = adapter.getInitialState({
});


export const cartReducer = createReducer(
  initialState,
  on(cartActionTypes.addProductToCart, (state, action) => {
    return adapter.addOne(action.product, state);
  }),
  on(cartActionTypes.deleteProductFromCart, (state, action) => {
    return adapter.removeOne(action.productId, state);
  }),
  on(cartActionTypes.updateProduct, (state, action) => {
    return adapter.updateOne(action.product, state);
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();



