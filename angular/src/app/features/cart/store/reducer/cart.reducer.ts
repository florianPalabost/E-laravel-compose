import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {basketActionTypes} from "../action/basket.actions";
import {Product} from "../../../products/model/product";

export const basketFeatureKey = 'basket';

export interface BasketState extends EntityState<Product> {
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id
});

export const initialState = adapter.getInitialState({

});


export const cartReducer = createReducer(
  initialState,
  on(basketActionTypes.addProductToBasket, (state, action) => {
    return adapter.addOne(action.product, state);
  }),
  on(basketActionTypes.deleteProductFromBasket, (state, action) => {
    return adapter.removeOne(action.productId, state);
  }),
  on(basketActionTypes.updateProduct, (state, action) => {
    return adapter.updateOne(action.product, state);
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();



