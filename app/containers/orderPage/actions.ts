import { IOrder } from './type';
import { action } from 'typesafe-actions';
import { ActionsTypes } from './constants';

export const setOrders = (orders: IOrder[]) =>
  action(ActionsTypes.SET_ORDERS, orders);

export const enableOrdersLoading = () =>
  action(ActionsTypes.ENABLE_ORDERS_LOADING);
export const disableOrdersLoading = () =>
  action(ActionsTypes.DISABLE_ORDERS_LOADING);
