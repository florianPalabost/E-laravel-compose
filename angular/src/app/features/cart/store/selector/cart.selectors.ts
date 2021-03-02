import {createFeatureSelector, createSelector} from '@ngrx/store';
import {basketFeatureKey, BasketState, selectAll, selectIds} from '../reducer/basket.reducer';

export const basketFeatureSelector = createFeatureSelector<BasketState>(basketFeatureKey);

export const getAllProducts = createSelector(
  basketFeatureSelector,
  selectAll
);

export const selectAllProducts = createSelector(
  basketFeatureSelector,
  selectAll
);

export const selectOneProduct = ({productId}) => createSelector(
  getAllProducts,
  (products) => {
    if (productId === undefined) {
      return undefined;
    }
    return products.find((product) => product.id === productId);
  }
);



