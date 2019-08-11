import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectRoute = (state: ApplicationRootState) => state.router;
const selectNavigation = (state: ApplicationRootState) => state.navigation;
const selectNavBar = (state: ApplicationRootState) => state.navBar;
const selectApp = (state: ApplicationRootState) => state.app;

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.location,
  );

const makeNavActiveItem = () =>
  createSelector(
    selectNavigation,
    navigation => navigation.activeNavItem,
  );

const makeIsSearchBarOpen = () =>
  createSelector(
    selectNavBar,
    navBar => navBar.isSearchBarOpen,
  );

const makeActiveSubMenu = () =>
  createSelector(
    selectNavigation,
    navigation => navigation.activeSubMenu,
  );

const makeIsApploading = () =>
  createSelector(
    selectApp,
    app => app.isLoading,
  );

export {
  makeSelectLocation,
  makeNavActiveItem,
  makeIsSearchBarOpen,
  makeActiveSubMenu,
  makeIsApploading,
};
