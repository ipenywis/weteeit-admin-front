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

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import styled from 'styled-components';
import SideNavigation from './sideNavigation/navigation';
import { VerticalWrapper } from 'components/verticalWrapper';
import { NavBar } from './navbar';
import { connect } from 'react-redux';

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
`;

function App() {
  return (
    <div style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}>
      <Switch>
        <AppContainer>
          <SideNavigation />
          <VerticalWrapper width="100%" height="100%">
            <NavBar />
            <MainContainer>
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </MainContainer>
          </VerticalWrapper>
        </AppContainer>
      </Switch>
      <GlobalStyle />
    </div>
  );
}

const mapStateToProps = state => {
  console.log('App: ', state);
  return state;
};

export default connect(
  mapStateToProps,
  null,
)(App);
