import { IAction } from 'types';
import { IOrderPageState } from './type';
import { ActionsTypes } from './constants';

const initialState: IOrderPageState = {
  isOrdersLoading: false,
  orders: [],
};

function OrderPageReducer(
  state: IOrderPageState = initialState,
  action: IAction,
) {
  switch (action.type) {
    case ActionsTypes.ENABLE_ORDERS_LOADING:
      return { ...state, isOrdersLoading: true };
    case ActionsTypes.DISABLE_ORDERS_LOADING:
      return { ...state, isOrdersLoading: false };
    case ActionsTypes.SET_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}

export default OrderPageReducer;
