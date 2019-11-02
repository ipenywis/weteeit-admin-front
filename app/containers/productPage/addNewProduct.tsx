import React from 'react';
import ProductForm, { IProductFormProps } from './productForm';
import { ApolloClient } from 'apollo-boost';
import { STORE_PRODUCT } from './mutations';
import { IProduct, ProductTypes } from './type';
import { AppToaster } from 'components/toaster';
import { Intent } from '@blueprintjs/core';
import { WithOptional } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setActiveType } from './actions';

interface IDispatchProps {
  setActiveType: (type: ProductTypes) => void;
}

export interface IAddNewProductProps
  extends WithOptional<IProductFormProps, 'onSubmit'> {
  apolloClient: ApolloClient<any>;

  loadProducts: (apolloClient: ApolloClient<any>, type?: ProductTypes) => void;
}

class AddNewProduct extends React.Component<
  IAddNewProductProps & IDispatchProps
> {
  async addNewProduct(product: IProduct) {
    const storedProduct = await this.props.apolloClient
      .mutate({
        mutation: STORE_PRODUCT,
        variables: { ...product, type: product.type.toLowerCase() },
      })
      .catch(err => {
        AppToaster.show({
          message: 'Cannot Save Product, Please Try again later',
          intent: Intent.DANGER,
        });
      });

    if (storedProduct) {
      AppToaster.show({
        message: 'Product Saved Successfully',
        intent: Intent.SUCCESS,
      });

      //Set Current Product Type as Active Type
      this.props.setActiveType(product.type);
      //Re-Fetch Products
      this.props.loadProducts(this.props.apolloClient, product.type);
    }
  }

  render() {
    return (
      <ProductForm
        {...this.props}
        onSubmit={this.addNewProduct.bind(this)}
        resetOnSuccessfulSubmit
      />
    );
  }
}

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setActiveType: (type: ProductTypes) => dispatch(setActiveType(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewProduct);
