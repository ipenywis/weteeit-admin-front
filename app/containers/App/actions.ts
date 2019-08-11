import { ActionTypes } from './constants';
import { action } from 'typesafe-actions';

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

//COMMON ACTIONS
export const showError = (error: string) =>
  action(ActionTypes.SHOW_ERROR, error);
