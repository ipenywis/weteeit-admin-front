import { ROUTES } from 'routes';

/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

//Navigation items names and corresponding ids
export interface INavigationItem {
  [name: string]: any;
  path?: string;
  submenu?: INavigationItem[];
}

//Side Navigation Routes
export const NavigationItems = {
  dashboard: {
    name: 'Dashboard',
    path: ROUTES.dashboard,
  },
  match: {
    name: 'Product',
    path: ROUTES.product,
  },
};

//Action Types
export enum ActionTypes {
  SET_ACTIVE_NAV_ITEM = 'app/navigation/SET_ACTIVE_NAV_ITEM',
  OPEN_SEARCH_BAR = 'app/navbar/OPEN_SEARCH_BAR',
  CLOSE_SEARCH_BAR = 'app/navbar/CLOSE_SEARCH_BAR',
  SET_ACTIVE_SUBMENU = 'app/navigation/SET_ACTIVE_SUBMENU',
  ACTIVATE_GLOBAL_LOADING = 'app/ACTIVATE_GLOBAL_LOADING',
  DISABLE_GLOBAL_LOADING = 'app/DISABLE_GLOBAL_LOADING',
  SHOW_ERROR = 'app/SHOW_ERROR',
  HIDE_ERRORS = 'app/HIDE_ERRORS',
  NEED_TO_AUTHENTICATE = 'app/NEED_TO_AUTHENTICATE',
  AUTHENTICATED = 'app/AUTHENTICATED',
  INIT = 'app/INIT', ///< Bootstrap App
  INITIALIZED = 'app/INITIALIZED',
  SET_AUTH_ADMIN = 'app/SET_AUTH_ADMIN',
}

export const MESSAGES = {
  INTERNAL_APP_ERROR: 'An Internal Error Occurred, Please Try again later!',
};
