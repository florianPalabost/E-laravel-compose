import { createAction, props } from '@ngrx/store';
import {Update} from "@ngrx/entity";
import {Product} from "../../../products/model/product";


export const addProductToBasket = createAction(
'[Basket] Add Product to cart',
  props<{product: Product}>()
);

export const addProductToBasketSuccess = createAction(
  '[Basket] Successfully added product to cart ',
  props<{product: Product}>()
);


export const deleteProductFromBasket = createAction(
  '[Basket] Delete Product from cart',
  props<{productId: string}>()
);

export const deleteProductFromBasketSuccess = createAction(
  '[Basket] Delete Product from cart Successfully',
  props<{product: Product}>()
);


export const updateProduct = createAction(
  '[Basket] Update Product',
  props<{product: Update<Product>}>()
);
export const updateProductSuccess = createAction(
  '[Basket Effect] Updated Product Successfully',
);
export const updateProductFailed = createAction(
  '[Basket Effect] Product updated Failed',
  props<{error: any}>()
);


export const basketActionTypes = {
  addProductToBasket,
  addProductToBasketSuccess,
  deleteProductFromBasket,
  deleteProductFromBasketSuccess,
  updateProduct,
  updateProductSuccess,
  updateProductFailed
};





