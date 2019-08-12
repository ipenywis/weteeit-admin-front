import { IAction, IAppError } from '../../types';
import { IAppState } from './type';
import { ActionTypes } from './constants';

const initialState: IAppState = {
  isLoading: false,
  disableApp: false,
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
    case ActionTypes.SHOW_ERROR: {
      if (action.payload && (action.payload as IAppError).state === 'critical')
        return { ...state, error: action.payload, disableApp: true };
      else return { ...state, error: action.payload };
    }
    case ActionTypes.HIDE_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
}