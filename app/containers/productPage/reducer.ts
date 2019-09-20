import { IAction } from 'types';
import { IProductPageState } from './type';
import { ActionTypes } from './constants';

const initialState: IProductPageState = {
  isLoading: false,
};

function ProductPageReducer(
  state: IProductPageState = initialState,
  action: IAction,
): IProductPageState {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.CLEAR_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export default ProductPageReducer;
