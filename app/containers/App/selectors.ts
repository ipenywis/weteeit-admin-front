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

const makeSelectAppError = () =>
  createSelector(
    selectApp,
    app => app.error,
  );

const makeSelectDisableApp = () =>
  createSelector(
    selectApp,
    app => app.disableApp,
  );

const makeSelectIsAuthenticated = () =>
  createSelector(
    selectApp,
    app => app.isAuthenticated,
  );

const makeSelectApiUrl = () =>
  createSelector(
    selectApp,
    app => app.apiUrl,
  );

const makeSelectIsInitialized = () =>
  createSelector(
    selectApp,
    app => app.isInitialized,
  );

const makeSelectAuthAdmin = () =>
  createSelector(
    selectApp,
    app => app.authAdmin,
  );

export {
  makeSelectLocation,
  makeNavActiveItem,
  makeIsSearchBarOpen,
  makeActiveSubMenu,
  makeIsApploading,
  makeSelectAppError,
  makeSelectDisableApp,
  makeSelectIsAuthenticated,
  makeSelectApiUrl,
  makeSelectIsInitialized,
  makeSelectAuthAdmin,
};
