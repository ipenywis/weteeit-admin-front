import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IProduct, ProductTypesValues, ProductTypes } from './type';
import { setActiveType } from './actions';
import {
  activateGlobalLoading,
  disableGlobalLoading,
} from 'containers/App/actions';
import ApolloClient from 'apollo-boost';
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
import { DeleteProductAlert } from './deleteProductAlert';
import { UPDATE_PRODUCT } from './mutations';
import { AppToaster } from 'components/toaster';
import { Intent } from '@blueprintjs/core';

interface IDispatchProps {
  activateGlobalLoading: () => void;
  disableGlobalLoading: () => void;
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

  loadProducts: (apolloClient: ApolloClient<any>, type?: ProductTypes) => void;
}

const key = 'productPage';

class Products extends React.Component<
  IProductsProps & IStateProps & IDispatchProps
> {
  componentWillMount() {
    this.props.loadProducts(this.props.apolloClient);
  }

  onProductTypeSelect(type: string) {
    const productType: ProductTypes = isProductType(type);
    this.props.setActiveType(productType);
    //Load Products with specified type
    this.props.loadProducts(this.props.apolloClient, productType);
  }

  updateSuccess(product: IProduct) {
    AppToaster.show({
      message: `Product ${product.name} Successfully Updated`,
      intent: Intent.SUCCESS,
    });
  }

  updateError(product: IProduct) {
    AppToaster.show({
      message: `Product ${product.name} Cannot be Updated`,
      intent: Intent.DANGER,
    });
  }

  async updateProduct(product: IProduct) {
    const updateResult = await this.props.apolloClient
      .mutate({
        mutation: UPDATE_PRODUCT,
        variables: { ...product, type: product.type.toLowerCase() },
      })
      .catch(err => {
        this.updateError(product);
      });

    if (updateResult) {
      //Product Successfully Updated
      if (updateResult.data.product) {
        const updatedProduct = updateResult.data.product;
        const updatedProductType = isProductType(updatedProduct.type);
        this.updateSuccess(product);
        //Set Active Product Type
        this.props.setActiveType(updatedProductType);
        //Re-Fetch Products of newly updated type (if updated!)
        this.props.loadProducts(this.props.apolloClient, updatedProductType);
      }
      //Product Update Error!
      else this.updateError(product);
    }
  }

  render() {
    if (this.props.disabled) return null;

    const {
      isLoading,
      activeProductType,
      products,
      apolloClient,
      loadProducts,
    } = this.props;

    return (
      <ItemsCard
        header="Available Products"
        items={products}
        loading={isLoading}
        noItemsMessage="No Products Found with selected type"
        dropdownItems={Object.values(ProductTypesValues)}
        onDropdownItemSelect={this.onProductTypeSelect.bind(this)}
        activeDropdownItem={activeProductType.toLocaleLowerCase()}
        deleteAlert={
          <DeleteProductAlert loadProducts={() => loadProducts(apolloClient)} />
        }
        updateCard={
          <ProductForm
            apolloClient={apolloClient}
            header="Update Product"
            name="updateProduct"
            elevated
            submitButtonText="Update"
            showCloseButton
            resetOnSuccessfulSubmit={false}
            onSubmit={this.updateProduct.bind(this)}
          />
        }
      />
    );
  }
}

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
  activateGlobalLoading: () => dispatch(activateGlobalLoading()),
  disableGlobalLoading: () => dispatch(disableGlobalLoading()),
  setActiveType: (type: ProductTypes) => dispatch(setActiveType(type)),
});

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(hocWithSaga<IProductsProps>({ key, saga: productsSaga })(Products));
