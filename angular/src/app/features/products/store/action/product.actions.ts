import { createAction, props } from '@ngrx/store';
import {Update} from "@ngrx/entity";
import {Product} from "../../model/product";

export const loadProducts = createAction(
  '[Product] Load Products',
);
export const productsLoaded = createAction(
  '[Products Effect] Products Loaded Successfully',
  props<{products: Product[]}>()
);
export const productsFailedLoad = createAction(
  '[Products Effect] Products Failed Loaded',
  props<{error: any}>()
);


export const addProduct = createAction(
'[Product] Add Product',
  props<{product: Product}>()
);


export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{productId: string}>()
);


export const updateProduct = createAction(
  '[Product] Update Product',
  props<{product: Update<Product>}>()
);
export const updateProductSuccess = createAction(
  '[Products Effect] Updated Product Successfully',
);
export const updateProductFailed = createAction(
  '[Products Effect] Product updated Failed',
  props<{error: any}>()
);


export const productActionTypes = {
  loadProducts,
  productsLoaded,
  productsFailedLoad,
  addProduct,
  deleteProduct,
  updateProduct,
  updateProductSuccess,
  updateProductFailed
};





