import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IProduct, ProductTypesValues } from './type';
import { setProducts, setloading, clearLoading } from './actions';
import {
  activateGlobalLoading,
  disableGlobalLoading,
} from 'containers/App/actions';
import ApolloClient from 'apollo-boost';
import { GET_PRODUCTS_BY_TYPE } from './queries';
import { AppToaster } from 'components/toaster';
import { Intent } from '@blueprintjs/core';
import productsSaga from './saga';
import hocWithSaga from 'utils/injectSaga';
import { makeSelectIsLoading } from './selectors';
import { wait } from 'utils/common';
import ItemsCard from 'components/ItemsCard';

interface IDispatchProps {
  setProducts: (products: IProduct[]) => void;
  activateGlobalLoading: () => void;
  disableGlobalLoading: () => void;
  setLoading: () => void;
  clearLoading: () => void;
}

export interface IStateProps {
  isLoading: boolean;
}

export interface IProductsProps {
  apolloClient: ApolloClient<any>;
  disabled?: boolean;
}

const key = 'productPage';

class Products extends React.Component<
  IProductsProps & IStateProps & IDispatchProps
> {
  componentWillMount() {
    console.log('fetching Products');
    this.loadProducts();
  }

  async loadProducts() {
    const { apolloClient } = this.props;

    //Start Loading
    this.props.setLoading();

    const queryVariables = {
      type: 'tshirt',
      pageId: 1,
      limitPerPage: 10,
    };

    const productsWithDefaultType = await apolloClient
      .query({ query: GET_PRODUCTS_BY_TYPE, variables: queryVariables })
      .catch(err => {
        this.props.disableGlobalLoading();
        AppToaster.show({
          message: 'Error, Cannot Load Products at the moment',
          intent: Intent.DANGER,
        });
      });

    console.log('Response: ', productsWithDefaultType);

    await wait();

    this.props.clearLoading();
  }

  render() {
    if (this.props.disabled) return null;

    const { isLoading } = this.props;

    const products: IProduct[] = [];

    return (
      <ItemsCard
        header="Available Products"
        items={products}
        loading={isLoading}
        noItemsMessage="No Products Found"
        dropdownItems={Object.values(ProductTypesValues)}
        onDropdownItemSelect={v => console.log('Item: ', v)}
      />
    );
  }
}

/*
<FlexCard header="Available Products" interactive loading={isLoading}>
        {!isProductsValid && <b>No Products Available!</b>}
        {isProductsValid &&
          products.map((product, idx) => {
            const productKey = `${product.name}-${idx}`;
            return (
              <ProductItem key={productKey}>
                <LeftSide>
                  <ProductLogo>
                    <img src={product.imageUrl} alt="product-image" />
                  </ProductLogo>
                  <ProductName>{product.name}</ProductName>
                </LeftSide>
                <RightSide />
              </ProductItem>
            );
          })}
      </FlexCard>


*/

const mapStateToProps = createSelector(
  makeSelectIsLoading(),
  isLoading => ({
    isLoading,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setProducts: (products: IProduct[]) => dispatch(setProducts(products)),
  activateGlobalLoading: () => dispatch(activateGlobalLoading()),
  disableGlobalLoading: () => dispatch(disableGlobalLoading()),
  setLoading: () => dispatch(setloading()),
  clearLoading: () => dispatch(clearLoading()),
});

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(hocWithSaga<IProductsProps>({ key, saga: productsSaga })(Products));
