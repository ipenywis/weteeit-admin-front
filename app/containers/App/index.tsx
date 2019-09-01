/**
 *
 * App.js
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
import TeamPage from 'containers/TeamPage';
import MatchPage from 'containers/MatchPage';
import { useInjectSaga } from 'utils/injectSaga';
import appSaga, { bootstrap as bootstrapSaga } from './saga';
import { createSelector } from 'reselect';
import {
  makeIsApploading,
  makeSelectAppError,
  makeSelectDisableApp,
  makeSelectIsAuthenticated,
} from './selectors';
import { Dispatch } from 'redux';
import {
  activateGlobalLoading,
  disableGlobalLoading,
  hideErrors,
  needToAuthenticate,
  authenticated,
} from './actions';
import { AppLoading } from 'components/appLoading';
import { AppToaster } from 'components/toaster';
import { IAppState } from './type';
import { Intent, Icon } from '@blueprintjs/core';
import { MESSAGES } from './constants';
import loginPage from 'containers/loginPage';
import { PrivateRoute } from 'components/privateRoute';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
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
}

interface IAppProps extends IAppDispatchProps, IAppState {}

const key = 'app';

function App(props: IAppProps) {
  const { error, isLoading, disableApp, isAuthenticated } = props;

  //TODO: Add AUTH Session checking code here to check if user is authenticated
  //if (!isAuthenticated) props.authenticated();

  //Register App SAGA
  useInjectSaga({ key, saga: appSaga });

  //Register Bootstrap SAGA
  //NOTE: Bootstrap can only be initialized if user is Authenticated
  if (isAuthenticated) useInjectSaga({ key, saga: bootstrapSaga });

  //Show if there are any errors
  //NOTE: most of times errors are global which means any component can set app error
  if (error && error.message && error.message.trim() !== '') {
    AppToaster.show({
      message: error.message,
      intent: Intent.DANGER,
      icon: 'error',
      onDismiss: props.hideErrors,
    });
    props.hideErrors();
  }

  return (
    <div style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}>
      {!disableApp && (
        <AppContainer>
          {isAuthenticated && <SideNavigation disabled={isLoading} />}
          <VerticalWrapper width="100%" height="100%">
            {isAuthenticated && <NavBar disabled={isLoading} />}
            <MainContainer>
              {isLoading && <AppLoading size="XL" />}
              {!isLoading && (
                <Switch>
                  <PrivateRoute
                    redirectTo={ROUTES.login}
                    allowAccess={isAuthenticated}
                    exact
                    path={ROUTES.dashboard}
                    component={DashboardPage}
                  />
                  <PrivateRoute
                    redirectTo={ROUTES.login}
                    allowAccess={isAuthenticated}
                    exact
                    path={ROUTES.profile}
                    component={ProfilePage}
                  />
                  <PrivateRoute
                    redirectTo={ROUTES.login}
                    allowAccess={isAuthenticated}
                    exact
                    path={ROUTES.teamPage}
                    component={TeamPage}
                  />
                  <PrivateRoute
                    redirectTo={ROUTES.login}
                    allowAccess={isAuthenticated}
                    exact
                    path={ROUTES.matchPage}
                    component={MatchPage}
                  />
                  <PrivateRoute
                    allowAccess={!isAuthenticated}
                    redirectTo={ROUTES.dashboard}
                    exact
                    path={ROUTES.login}
                    component={loginPage}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              )}
            </MainContainer>
          </VerticalWrapper>
        </AppContainer>
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

const mapStateToProps = createSelector(
  makeIsApploading(),
  makeSelectAppError(),
  makeSelectDisableApp(),
  makeSelectIsAuthenticated(),
  (isLoading, error, disableApp, isAuthenticated): IAppState => ({
    isLoading,
    error,
    disableApp,
    isAuthenticated,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch): IAppDispatchProps => ({
  activateLoading: () => dispatch(activateGlobalLoading()),
  disableLoading: () => dispatch(disableGlobalLoading()),
  hideErrors: () => dispatch(hideErrors()),
  needToAuthenticate: () => dispatch(needToAuthenticate()),
  authenticated: () => dispatch(authenticated()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
