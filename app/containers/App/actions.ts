import { ActionTypes } from './constants';
import { action } from 'typesafe-actions';

export const setActiveNavItem = (navItemId: string) =>
  action(ActionTypes.SET_ACTIVE_NAV_ITEM, navItemId);

export const openSearchBar = () => action(ActionTypes.OPEN_SEARCH_BAR);

export const closeSearchBar = () => action(ActionTypes.CLOSE_SEARCH_BAR);
