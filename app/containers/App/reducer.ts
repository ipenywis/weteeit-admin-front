import { IAction, IAppError } from '../../types';
import { IAppState } from './type';
import { ActionTypes } from './constants';

const initialState: IAppState = {
  isAuthenticated: false,
  isLoading: false,
  disableApp: false,
  error: null,
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  isInitialized: false,
  authAdmin: null,
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
    case ActionTypes.AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case ActionTypes.NEED_TO_AUTHENTICATE:
      return { ...state, isAuthenticated: false };
    case ActionTypes.SHOW_ERROR: {
      if (action.payload && (action.payload as IAppError).state === 'critical')
        return { ...state, error: action.payload, disableApp: true };
      else return { ...state, error: action.payload };
    }
    case ActionTypes.HIDE_ERRORS:
      return { ...state, error: null };
    case ActionTypes.INITIALIZED:
      return { ...state, isInitialized: true };
    case ActionTypes.SET_AUTH_ADMIN:
      return { ...state, authAdmin: action.payload };
    default:
      return state;
  }
}
