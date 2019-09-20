import * as React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { createSelector } from 'reselect';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeSelectAuthAdmin } from 'containers/App/selectors';
import { IAuthAdmin } from 'containers/loginPage/type';
import Products from './products';
import { ApolloConsumer } from '@apollo/react-hooks';

interface IProductPageProps {
  authAdmin: IAuthAdmin;
}

function ProductPage(props: IProductPageProps) {
  return (
    <ApolloConsumer>
      {client => (
        <PageContainer>
          <PageHeader header="Product" subHeader="Manage Products" />
          <Products apolloClient={client} />
        </PageContainer>
      )}
    </ApolloConsumer>
  );
}

const mapStateToProps = createSelector(
  makeSelectAuthAdmin(),
  authAdmin => ({
    authAdmin,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPage);
