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
import { makeIsApploading } from './selectors';
import { Dispatch } from 'redux';
import { activateGlobalLoading, disableGlobalLoading } from './actions';
import { AppLoading } from 'components/appLoading';

/*const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;*/

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

interface IAppDispatchProps {
  activateLoading: () => void;
  disableLoading: () => void;
}

interface IAppProps extends IAppDispatchProps {
  isLoading?: boolean;
}

const key = 'app';

function App(props: IAppProps) {
  //Register Reducer
  //useInjectReducer({ key, reducer: AppReducer });
  //Register SAGA
  useInjectSaga({ key, saga });

  const { isLoading } = props;

  console.log('Props: ', props);

  return (
    <div style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}>
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
      <GlobalStyle />
      <BlueprintCustomStyle />
    </div>
  );
}

const mapStateToProps = createSelector(
  makeIsApploading(),
  isLoading => ({
    isLoading,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch): IAppDispatchProps => ({
  activateLoading: () => dispatch(activateGlobalLoading()),
  disableLoading: () => dispatch(disableGlobalLoading()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
