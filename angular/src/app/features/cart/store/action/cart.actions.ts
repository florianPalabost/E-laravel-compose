import { createAction, props } from '@ngrx/store';
import {Update} from "@ngrx/entity";
import {Product} from "../../../products/model/product";


export const addProductToCart = createAction(
'[Cart] Add Product to cart',
  props<{product: Product}>()
);

export const addProductToCartSuccess = createAction(
  '[Cart] Successfully added product to cart ',
  props<{product: Product}>()
);


export const deleteProductFromCart = createAction(
  '[Cart] Delete Product from cart',
  props<{productId: string}>()
);

export const deleteProductFromCartSuccess = createAction(
  '[Cart] Delete Product from cart Successfully',
  props<{product: Product}>()
);


export const updateProduct = createAction(
  '[Cart] Update Product',
  props<{product: Update<Product>}>()
);
export const updateProductSuccess = createAction(
  '[Cart Effect] Updated Product Successfully',
);
export const updateProductFailed = createAction(
  '[Cart Effect] Product updated Failed',
  props<{error: any}>()
);


export const cartActionTypes = {
  addProductToCart,
  addProductToCartSuccess,
  deleteProductFromCart,
  deleteProductFromCartSuccess,
  updateProduct,
  updateProductSuccess,
  updateProductFailed
};





