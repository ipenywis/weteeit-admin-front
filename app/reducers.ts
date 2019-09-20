/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import NavigationReducer from 'containers/App/sideNavigation/reducer';
import NavBarReducer from 'containers/App/navbar/reducer';
import FinalFormReducer from './finalFormDuck';
import AppReducer from 'containers/App/reducer';
import LoginReducer from 'containers/loginPage/reducer';
import ProductPageReducer from 'containers/productPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    app: AppReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    navigation: NavigationReducer,
    navBar: NavBarReducer,
    finalForm: FinalFormReducer,
    login: LoginReducer,
    productPage: ProductPageReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
