/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import * as React from 'react';
///import { FormattedMessage } from 'react-intl';
//import messages from './messages';
import { connect } from 'react-redux';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';

/* eslint-disable react/prefer-stateless-function */
function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader header="Dashboard" subHeader="Quick Overview" />
    </PageContainer>
  );
}

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(
  mapStateToProps,
  null,
)(DashboardPage);
