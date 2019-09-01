import { action } from 'typesafe-actions';
import { ActionTypes } from './constants';

export const setLoginError = (error: string) =>
  action(ActionTypes.SET_LOGIN_ERROR, error);

export const clearLoginErrors = () => action(ActionTypes.CLEAR_LOGIN_ERRORS);
