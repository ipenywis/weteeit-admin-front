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

function App() {
  return (
    <div style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}>
      <AppContainer>
        <SideNavigation />
        <VerticalWrapper width="100%" height="100%">
          <NavBar />
          <MainContainer>
            <Switch>
              <Route exact path={ROUTES.dashboard} component={DashboardPage} />
              <Route exact path={ROUTES.profile} component={ProfilePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </MainContainer>
        </VerticalWrapper>
      </AppContainer>
      <GlobalStyle />
      <BlueprintCustomStyle />
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  null,
)(App);
