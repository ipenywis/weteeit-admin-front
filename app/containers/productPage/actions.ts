import { action } from 'typesafe-actions';
import { IProduct, ProductTypes } from './type';
import { ActionTypes } from './constants';

export const setProducts = (products: IProduct[]) =>
  action(ActionTypes.SET_PRODUCTS, products);

export const setloading = () => action(ActionTypes.SET_LOADING);
export const clearLoading = () => action(ActionTypes.CLEAR_LOADING);

export const setActiveType = (type: ProductTypes) =>
  action(ActionTypes.SET_ACTIVE_TYPE, type);
