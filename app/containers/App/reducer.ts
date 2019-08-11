import { IAction } from '../../types';
import { IAppState } from './type';
import { ActionTypes } from './constants';

const initialState: IAppState = {
  isLoading: false,
  error: null,
};

export default function AppReducer(
  state: IAppState = initialState,
  action: IAction,
): IAppState {
  switch (action.type) {
    case ActionTypes.ACTIVATE_GLOBAL_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.DISABLE_GLOBAL_LOADING:
      return { ...state, isLoading: false };
    case ActionTypes.SHOW_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
