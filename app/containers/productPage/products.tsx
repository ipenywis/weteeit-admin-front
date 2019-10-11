import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IProduct, ProductTypesValues, ProductTypes } from './type';
import {
  setProducts,
  setloading,
  clearLoading,
  setActiveType,
} from './actions';
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
import {
  makeSelectIsLoading,
  makeSelectActiveProductType,
  makeSelectProducts,
} from './selectors';
import { isProductType } from 'utils/common';
import ItemsCard from 'components/ItemsCard';
import ProductForm from './productForm';
import { DeleteProductAlert } from './deleteProduct';

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

  async loadProducts(type?: ProductTypes) {
    const { apolloClient, activeProductType } = this.props;

    //Start Loading
    this.props.setLoading();

    const queryVariables = {
      type: type ? type.toLowerCase() : activeProductType.toLowerCase(),
      pageId: 1,
      limitPerPage: 10,
    };

    const productsWithType = await apolloClient
      .query({ query: GET_PRODUCTS_BY_TYPE, variables: queryVariables })
      .catch(err => {});

    if (!productsWithType) {
      this.props.disableGlobalLoading();
      AppToaster.show({
        message: 'Error, Cannot Load Products at the moment',
        intent: Intent.DANGER,
      });
      return false;
    }

    const products = productsWithType.data.productsWithPagination.products;
    const pagination = productsWithType.data.productsWithPagination.pagination;

    console.log('Products: ', products);
    console.log('Pagination: ', pagination);

    this.props.setProducts(products);

    this.props.clearLoading();

    return true;
  }

  onProductTypeSelect(type: string) {
    const productType: ProductTypes = isProductType(type);
    this.props.setActiveType(productType);
    //Load Products with specified type
    this.loadProducts(productType);
  }

  async updateProduct(product: IProduct) {
    //const storedProduct: ApolloQueryResult<IProduct> = await this.props.apolloClient.query(STORE_)
  }

  render() {
    if (this.props.disabled) return null;

    const { isLoading, activeProductType, products, apolloClient } = this.props;

    console.log('Props: ', this.props);

    return (
      <ItemsCard
        header="Available Products"
        items={products}
        loading={isLoading}
        noItemsMessage="No Products Found"
        dropdownItems={Object.values(ProductTypesValues)}
        onDropdownItemSelect={this.onProductTypeSelect.bind(this)}
        activeDropdownItem={activeProductType.toLocaleLowerCase()}
        deleteAlert={<DeleteProductAlert />}
        updateCard={
          <ProductForm
            apolloClient={apolloClient}
            header="Update Product"
            name="updateProduct"
            elevated
            submitButtonText="Update"
            showCloseButton
            onSubmit={this.updateProduct.bind(this)}
          />
        }
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
  makeSelectProducts(),
  makeSelectIsLoading(),
  makeSelectActiveProductType(),
  (products, isLoading, activeProductType) => ({
    products,
    isLoading,
    activeProductType,
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

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(hocWithSaga<IProductsProps>({ key, saga: productsSaga })(Products));
