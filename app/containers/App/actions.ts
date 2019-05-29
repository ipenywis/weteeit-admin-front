import { ActionTypes } from './constants';
import { action } from 'typesafe-actions';

export const setActiveNavItem = (navItemId: string) =>
  action(ActionTypes.SET_ACTIVE_NAV_ITEM, navItemId);
