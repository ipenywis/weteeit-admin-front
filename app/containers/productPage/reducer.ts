import { IAction } from 'types';
import { IProductPageState, ProductTypes } from './type';
import { ActionTypes } from './constants';

const initialState: IProductPageState = {
  isLoading: false,
  activeProductType: ProductTypes.TSHIRT,
  products: [],
};

function ProductPageReducer(
  state: IProductPageState = initialState,
  action: IAction,
): IProductPageState {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.CLEAR_LOADING:
      return { ...state, isLoading: false };
    case ActionTypes.SET_ACTIVE_TYPE:
      return { ...state, activeProductType: action.payload };
    default:
      return state;
  }
}

export default ProductPageReducer;
