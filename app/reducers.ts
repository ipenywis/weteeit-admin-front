/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import NavigationReducer from 'containers/App/sideNavigation/reducer';
import NavBarReducer from 'containers/App/navbar/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    navigation: NavigationReducer,
    navBar: NavBarReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
