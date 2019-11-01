import { IShippingPageState } from './type';
import { IAction } from 'types';
import { ActionsTypes } from './constants';

const initialState: IShippingPageState = {
  isShippingsLoading: false,
  shippings: [],
};

export default function ShippingPageReducer(
  state: IShippingPageState = initialState,
  action: IAction,
): IShippingPageState {
  switch (action.type) {
    case ActionsTypes.SET_SHIPPINGS:
      return { ...state, shippings: action.payload };
    case ActionsTypes.SET_SHIPPINGS_LOADING:
      return { ...state, isShippingsLoading: true };
    case ActionsTypes.CLEAR_SHIPPINGS_LOADING:
      return { ...state, isShippingsLoading: false };
    default:
      return state;
  }
}
