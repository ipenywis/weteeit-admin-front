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
import saga from './saga';
import { createSelector } from 'reselect';
import {
  makeIsApploading,
  makeSelectAppError,
  makeSelectDisableApp,
} from './selectors';
import { Dispatch } from 'redux';
import {
  activateGlobalLoading,
  disableGlobalLoading,
  hideErrors,
} from './actions';
import { AppLoading } from 'components/appLoading';
import { AppToaster } from 'components/toaster';
import { IAppState } from './type';
import { Intent, Icon } from '@blueprintjs/core';
import { MESSAGES } from './constants';

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
}

interface IAppProps extends IAppDispatchProps, IAppState {}

const key = 'app';

function App(props: IAppProps) {
  const { error, isLoading, disableApp } = props;

  //Register SAGA
  useInjectSaga({ key, saga });

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
          <SideNavigation disabled={isLoading} />
          <VerticalWrapper width="100%" height="100%">
            <NavBar disabled={isLoading} />
            <MainContainer>
              {isLoading && <AppLoading size="XL" />}
              {!isLoading && (
                <Switch>
                  <Route
                    exact
                    path={ROUTES.dashboard}
                    component={DashboardPage}
                  />
                  <Route exact path={ROUTES.profile} component={ProfilePage} />
                  <Route exact path={ROUTES.teamPage} component={TeamPage} />
                  <Route exact path={ROUTES.matchPage} component={MatchPage} />
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
  (isLoading, error, disableApp) => ({
    isLoading,
    error,
    disableApp,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch): IAppDispatchProps => ({
  activateLoading: () => dispatch(activateGlobalLoading()),
  disableLoading: () => dispatch(disableGlobalLoading()),
  hideErrors: () => dispatch(hideErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
