/**
 *
 * App.tsx
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import BlueprintCustomStyle from '../../styles/custom-bp3-styles';
import styled from 'styled-components';
import SideNavigation from './sideNavigation/navigation';
import { VerticalWrapper } from 'components/verticalWrapper';
import NavBar from './navbar';
import { connect } from 'react-redux';
import { theme } from 'styles/styled-components';
import DashboardPage from 'containers/DashboardPage';
import ProfilePage from 'containers/ProfilePage';
import { ROUTES } from '../../routes';
import hocWithSaga from 'utils/injectSaga';
import appSaga from './saga';
import { createSelector } from 'reselect';
import {
  makeIsApploading,
  makeSelectAppError,
  makeSelectDisableApp,
  makeSelectIsAuthenticated,
  makeSelectApiUrl,
  makeSelectIsInitialized,
} from './selectors';
import { Dispatch } from 'redux';
import {
  activateGlobalLoading,
  disableGlobalLoading,
  hideErrors,
  needToAuthenticate,
  authenticated,
  init,
  initialized,
} from './actions';
import { AppLoading } from 'components/appLoading';
import { AppToaster } from 'components/toaster';
import { IAppState } from './type';
import { Intent, Icon } from '@blueprintjs/core';
import { MESSAGES } from './constants';
import LoginPage from 'containers/loginPage';
import { PrivateRoute } from 'components/privateRoute';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from './graphqlSetup';
import { makeSelectAuthAdmin } from './selectors';
import { IAuthAdmin } from 'containers/loginPage/type';
import ProductPage from 'containers/productPage';
import { OrderPage } from 'containers/orderPage';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  overflow: auto;
`;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${theme.default.mainBackground};
`;

const DisabledAppMessage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-size: 18px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    margin-bottom: 1em;
  }
`;

interface IAppDispatchProps {
  activateLoading: () => void;
  disableLoading: () => void;
  hideErrors: () => void;
  needToAuthenticate: () => void;
  authenticated: () => void;
  init: (isAuthenticated: boolean) => void;
  initialized: () => void;
}

export interface IAppProps extends IAppDispatchProps, IAppState {
  authAdmin: IAuthAdmin;
}

const key = 'app';

class App extends React.Component<IAppProps> {
  componentDidUpdate() {
    //Initialize Application
    //NOTE: Initialization will take place in bootstrap saga only if admin is authenticated
    if (!this.props.isInitialized && !this.props.disableApp) {
      this.props.init(this.props.isAuthenticated);
    }
  }

  render() {
    const {
      error,
      isLoading,
      disableApp,
      isAuthenticated,
      authAdmin,
    } = this.props;

    //Show if there are any errors
    //NOTE: most of times errors are global which means any component can set app error
    if (error && error.message && error.message.trim() !== '') {
      AppToaster.show({
        message: error.message,
        intent: Intent.DANGER,
        icon: 'error',
        onDismiss: this.props.hideErrors,
      });
      this.props.hideErrors();
    }

    return (
      <div style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}>
        {!disableApp && (
          <ApolloProvider client={apolloClient}>
            <AppContainer>
              {isAuthenticated && <SideNavigation disabled={isLoading} />}
              <VerticalWrapper width="100%" height="100%">
                {isAuthenticated && (
                  <NavBar
                    isSearchBarOpen={false}
                    disabled={isLoading}
                    username={authAdmin && authAdmin.username}
                  />
                )}
                <MainContainer>
                  {isLoading && <AppLoading size="XL" />}
                  {!isLoading && (
                    <Switch>
                      <PrivateRoute
                        redirectTo={ROUTES.login}
                        allowAccess={isAuthenticated}
                        exact
                        path={ROUTES.dashboard}
                        render={() => <DashboardPage />}
                      />
                      <PrivateRoute
                        redirectTo={ROUTES.login}
                        allowAccess={isAuthenticated}
                        exact
                        path={ROUTES.profile}
                        render={() => <ProfilePage />}
                      />
                      <PrivateRoute
                        allowAccess={!isAuthenticated}
                        redirectTo={ROUTES.dashboard}
                        exact
                        path={ROUTES.login}
                        render={() => <LoginPage />}
                      />
                      <PrivateRoute
                        allowAccess={isAuthenticated}
                        redirectTo={ROUTES.login}
                        exact
                        path={ROUTES.product}
                        render={() => <ProductPage />}
                      />
                      <PrivateRoute
                        allowAccess={isAuthenticated}
                        redirectTo={ROUTES.login}
                        exact
                        path={ROUTES.order}
                        render={() => <OrderPage />}
                      />
                      <Route component={NotFoundPage} />
                    </Switch>
                  )}
                </MainContainer>
              </VerticalWrapper>
            </AppContainer>
          </ApolloProvider>
        )}
        {disableApp && (
          <DisabledAppMessage>
            <Icon icon="error" iconSize={25} intent={Intent.DANGER} />
            {MESSAGES.INTERNAL_APP_ERROR}
          </DisabledAppMessage>
        )}
        <GlobalStyle />
        <BlueprintCustomStyle />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  makeIsApploading(),
  makeSelectAppError(),
  makeSelectDisableApp(),
  makeSelectIsAuthenticated(),
  makeSelectApiUrl(),
  makeSelectIsInitialized(),
  makeSelectAuthAdmin(),
  (
    isLoading,
    error,
    disableApp,
    isAuthenticated,
    apiUrl,
    isInitialized,
    authAdmin,
  ): IAppState | any => ({
    isLoading,
    error,
    disableApp,
    isAuthenticated,
    apiUrl,
    isInitialized,
    authAdmin,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch): IAppDispatchProps => ({
  activateLoading: () => dispatch(activateGlobalLoading()),
  disableLoading: () => dispatch(disableGlobalLoading()),
  hideErrors: () => dispatch(hideErrors()),
  needToAuthenticate: () => dispatch(needToAuthenticate()),
  authenticated: () => dispatch(authenticated()),
  init: (isAuthenticated: boolean) => dispatch(init(isAuthenticated)),
  initialized: () => dispatch(initialized()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(hocWithSaga({ key, saga: appSaga }, { apolloClient })(App));
