import { IShipping } from './type';
import { action } from 'typesafe-actions';
import { ActionsTypes } from './constants';

export const setShippings = (shippings: IShipping[]) =>
  action(ActionsTypes.SET_SHIPPINGS, shippings);

export const setShippingsLoading = () =>
  action(ActionsTypes.SET_SHIPPINGS_LOADING);
export const clearShippingsLoading = () =>
  action(ActionsTypes.CLEAR_SHIPPINGS_LOADING);
