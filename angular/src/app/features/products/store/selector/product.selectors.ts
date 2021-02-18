import {createFeatureSelector, createSelector} from '@ngrx/store';
import {productFeatureKey, ProductState, selectAll, selectIds} from '../reducer/product.reducer';

export const productFeatureSelector = createFeatureSelector<ProductState>(productFeatureKey);

export const getAllProducts = createSelector(
  productFeatureSelector,
  selectAll
);

export const selectAllProducts = createSelector(
  productFeatureSelector,
  selectAll
);

export const selectOneProduct = ({productId}) => createSelector(
  getAllProducts,
  (products) => {
    console.log(products);
    if (productId === undefined) {
      return undefined;
    }
    return products.find((product) => product.id === productId);
  }
);

export const areProductsLoaded = createSelector(
  productFeatureSelector,
  state => state.productsLoaded
);


