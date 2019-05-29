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
  name: string;
  path: string;
}
export const NavigationItems = {
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
  },
  match: { name: 'Match', path: '/match' },
  stadium: { name: 'Stadium', path: '/stadium' },
  team: { name: 'Team', path: '/team' },
};

//Action Types
export enum ActionTypes {
  SET_ACTIVE_NAV_ITEM = 'app/navigation/SET_ACTIVE_NAV_ITEM',
}
