import React from 'react';
import ProductForm, { IProductFormProps } from './productForm';
import { ApolloClient } from 'apollo-boost';
import { STORE_PRODUCT } from './queries';
import { IProduct } from './type';
import { AppToaster } from 'components/toaster';
import { Intent } from '@blueprintjs/core';
import { WithOptional } from 'types';

export interface IAddNewProductProps
  extends WithOptional<IProductFormProps, 'onSubmit'> {
  apolloClient: ApolloClient<any>;
}

export class AddNewProduct extends React.Component<IAddNewProductProps> {
  async addNewProduct(product: IProduct) {
    console.log('Product to store: ', product);
    const storedProduct = await this.props.apolloClient
      .mutate({
        mutation: STORE_PRODUCT,
        variables: { ...product, type: product.type.toLowerCase() },
      })
      .catch(err => {
        console.log('ApolloError: ', JSON.stringify(err));
        err.graphQLErrors.map(gqErr => {
          console.log('GqErr: ', gqErr);
        });
        AppToaster.show({
          message: 'Cannot Save Product, Please Try again later',
          intent: Intent.DANGER,
        });
      });

    if (storedProduct)
      AppToaster.show({
        message: 'Product Saved Successfully',
        intent: Intent.SUCCESS,
      });
  }

  render() {
    return (
      <ProductForm {...this.props} onSubmit={this.addNewProduct.bind(this)} />
    );
  }
}
