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

export const areProductsLoaded = createSelector(
  productFeatureSelector,
  state => state.productsLoaded
);

// export const getProductsByColumn = ({columnTitle}) => createSelector(
//   selectAllProducts,
//   (products, props) => {
//     // const res = products.length > 0 ? products.map((product) => product.column === columnTitle) : [];
//     return products;
//   }
// );
