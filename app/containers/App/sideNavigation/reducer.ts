import { NavigationItems } from '../constants';
import { INavigationState } from '../type';
import { IAction } from 'types';
import { ActionTypes } from '../constants';

export const initialState: INavigationState = {
  activeNavItem: NavigationItems.dashboard.name,
  activeSubMenu: '',
};

function NavigationReducer(
  state: INavigationState = initialState,
  action: IAction,
) {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_NAV_ITEM:
      return { ...state, activeNavItem: action.payload };
    case ActionTypes.SET_ACTIVE_SUBMENU:
      return { ...state, activeSubMenu: action.payload };
    default:
      return state;
  }
}

export default NavigationReducer;
