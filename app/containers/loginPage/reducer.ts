import { IAction } from '../../types';
import { ILoginState } from './type';
import { ActionTypes } from './constants';

const initialState: ILoginState = {
  staySignedIn: false,
  error: null,
  authAdmin: null,
};

export default function LoginReducer(
  state: ILoginState = initialState,
  action: IAction,
) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state };
    case ActionTypes.SET_LOGIN_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.CLEAR_LOGIN_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
}
