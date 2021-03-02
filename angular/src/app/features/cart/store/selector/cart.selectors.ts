import {createFeatureSelector, createSelector} from '@ngrx/store';
import {cartFeatureKey, selectAll, selectIds, CartState} from '../reducer/cart.reducer';

export const cartFeatureSelector = createFeatureSelector<CartState>(cartFeatureKey);



export const getAllProductsInCart = createSelector(
  cartFeatureSelector,
  selectAll
);

export const selectOneProduct = ({productId}) => createSelector(
  getAllProductsInCart,
  (products) => {
    if (productId === undefined) {
      return undefined;
    }
    return products.find((product) => product.id === productId);
  }
);



