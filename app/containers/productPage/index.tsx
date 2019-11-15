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
import AddNewProduct from './addNewProduct';
import { ApolloClient } from 'apollo-boost';
import {
  makeSelectProducts,
  makeSelectIsLoading,
  makeSelectActiveProductType,
} from './selectors';
import { ProductTypes, IProduct } from './type';
import {
  clearLoading,
  setloading,
  setProducts,
  setActiveType,
} from './actions';
import {
  disableGlobalLoading,
  activateGlobalLoading,
} from 'containers/App/actions';
import { GET_PRODUCTS_BY_TYPE } from './queries';

interface IDispatchProps {
  setProducts: (products: IProduct[]) => void;
  activateGlobalLoading: () => void;
  disableGlobalLoading: () => void;
  setLoading: () => void;
  clearLoading: () => void;
  setActiveType: (type: ProductTypes) => void;
}

export interface IStateProps {
  products: IProduct[];
  isLoading: boolean;
  activeProductType: string;
  authAdmin?: IAuthAdmin;
}

interface IProductPageProps {}

class ProductPage extends React.Component<
  IProductPageProps & IDispatchProps & IStateProps
> {
  async loadProducts(apolloClient: ApolloClient<any>, type?: ProductTypes) {
    const { activeProductType } = this.props;

    //Start Loading
    this.props.setLoading();

    const queryVariables = {
      type: type ? type.toLowerCase() : activeProductType.toLowerCase(),
      pageId: null,
      limitPerPage: null,
    };

    const productsWithType = await apolloClient
      .query({ query: GET_PRODUCTS_BY_TYPE, variables: queryVariables })
      .catch(err => {
        this.props.disableGlobalLoading();
      });

    if (
      productsWithType &&
      productsWithType.data &&
      productsWithType.data.productsWithPagination
    ) {
      const products = productsWithType.data.productsWithPagination.products;
      //const pagination = productsWithType.data.productsWithPagination.pagination;

      this.props.setProducts(products);
    } else {
      this.props.setProducts([]);
      this.props.disableGlobalLoading();
    }

    this.props.clearLoading();
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <PageContainer>
            <PageHeader header="Product" subHeader="Manage Products" />
            <Products
              apolloClient={client}
              loadProducts={this.loadProducts.bind(this)}
            />
            <AddNewProduct
              apolloClient={client}
              name="addProduct"
              header="Add new Product"
              submitButtonText="Add"
              loadProducts={this.loadProducts.bind(this)}
            />
          </PageContainer>
        )}
      </ApolloConsumer>
    );
  }
}

const mapStateToProps = createSelector(
  makeSelectProducts(),
  makeSelectIsLoading(),
  makeSelectActiveProductType(),
  makeSelectAuthAdmin(),
  (products, isLoading, activeProductType, authAdmin) => ({
    products,
    isLoading,
    activeProductType,
    authAdmin,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setProducts: (products: IProduct[]) => dispatch(setProducts(products)),
  activateGlobalLoading: () => dispatch(activateGlobalLoading()),
  disableGlobalLoading: () => dispatch(disableGlobalLoading()),
  setLoading: () => dispatch(setloading()),
  clearLoading: () => dispatch(clearLoading()),
  setActiveType: (type: ProductTypes) => dispatch(setActiveType(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPage);
