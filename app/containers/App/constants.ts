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
    path: '/',
  },
  match: {
    name: 'Match',
    path: '/match',
    submenu: {
      newMatch: {
        name: 'New Match',
        path: '/match/new',
      },
    },
  },
  stadium: { name: 'Stadium', path: '/stadium' },
  team: {
    name: 'Team',
    path: '/team',
  },
};

//Action Types
export enum ActionTypes {
  SET_ACTIVE_NAV_ITEM = 'app/navigation/SET_ACTIVE_NAV_ITEM',
  OPEN_SEARCH_BAR = 'app/navbar/OPEN_SEARCH_BAR',
  CLOSE_SEARCH_BAR = 'app/navbar/CLOSE_SEARCH_BAR',
  SET_ACTIVE_SUBMENU = 'app/navigation/SET_ACTIVE_SUBMENU',
}
