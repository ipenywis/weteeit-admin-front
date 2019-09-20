import { ActionTypes } from './constants';
import { action } from 'typesafe-actions';
import { IAppError } from 'types';
import { IAuthAdmin } from 'containers/loginPage/type';

export const setActiveNavItem = (navItemId: string) =>
  action(ActionTypes.SET_ACTIVE_NAV_ITEM, navItemId);

export const openSearchBar = () => action(ActionTypes.OPEN_SEARCH_BAR);

export const closeSearchBar = () => action(ActionTypes.CLOSE_SEARCH_BAR);

export const setActiveSubMenu = (itemId: string) =>
  action(ActionTypes.SET_ACTIVE_SUBMENU, itemId);

export const activateGlobalLoading = () =>
  action(ActionTypes.ACTIVATE_GLOBAL_LOADING);

export const disableGlobalLoading = () =>
  action(ActionTypes.DISABLE_GLOBAL_LOADING);

export const needToAuthenticate = () =>
  action(ActionTypes.NEED_TO_AUTHENTICATE);

export const authenticated = () => action(ActionTypes.AUTHENTICATED);

//COMMON ACTIONS
export const showError = (error: IAppError) =>
  action(ActionTypes.SHOW_ERROR, error);

/**
 * This will only clean the errors state where the toast would hide automatically once the timer is up
 * It won't hide the toast instantly
 * use `Toaster.clear()` to hide toasts instantly
 */
export const hideErrors = () => action(ActionTypes.HIDE_ERRORS);

export const init = (isAuthenticated: boolean) =>
  action(ActionTypes.INIT, isAuthenticated);

export const initialized = () => action(ActionTypes.INITIALIZED);

export const setAuthAdmin = (authAdmin: IAuthAdmin) =>
  action(ActionTypes.SET_AUTH_ADMIN, authAdmin);
