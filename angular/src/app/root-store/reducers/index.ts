import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {UserState} from "../../features/user/store/reducer/user.reducer";
import * as fromProduct from '../../features/products/store/reducer/product.reducer';
import * as fromCart from '../../features/cart/store/reducer/cart.reducer';
import * as fromUser from '../../features/user/store/reducer/user.reducer';
import {clearState} from "../clearState";
import { localStorageSync } from "ngrx-store-localstorage";

export interface State {
  user: UserState,
  products: fromProduct.ProductState,
  cart: fromCart.CartState
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.userReducer,
  products: fromProduct.productReducer,
  cart: fromCart.cartReducer
};

const reducerKeys = [
  fromProduct.productFeatureKey,
  fromUser.userFeatureKey,
  fromCart.cartFeatureKey
];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return  localStorageSync({keys: reducerKeys})(reducer);
}


export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer, clearState];
