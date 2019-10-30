import React, { useEffect, useState } from 'react';
import {
  Text as BText,
  H3,
  Intent,
  Divider,
  Popover,
  PopoverInteractionKind,
  Callout,
} from '@blueprintjs/core';
import { Card } from 'components/card';
import styled from 'styled-components';
import { IOrder, IProductWithQuantity } from './type';
import { theme } from 'styles/styled-components';
import { ApolloClient } from 'apollo-boost';
import { GET_ORDER_PRODUCTS, GET_SHIPPING } from './queries';
import { AppToaster } from 'components/toaster';
import { IProduct } from 'containers/productPage/type';
import ProductPreview from './productPreview';
import { HorizontalWrapper } from 'components/horizontalWrapper';

interface IOrderWithName extends IOrder {
  name: string;
}

export interface IOrderInfoProps {
  currentItem?: IOrderWithName;
  apolloClient: ApolloClient<any>;

  onCloseButtonClick?: () => void;
}

const ElevatedCard = styled(Card)`
  z-index: 99;
  max-width: 24em;
`;

const Title = styled.div`
  font-size: 19px;
  color: ${theme.default.darkText};
  font-weight: 600;
  margin-bottom: 3px;
`;

const SuccessTitle = styled(Title)`
  color: ${theme.default.success};
  font-weight: 800;
  font-size: 22px;
  text-decoration: underline;
`;

const Text = styled(BText)`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const TotalPrice = styled(Text)`
  color: ${theme.default.primary};
  font-size: 22px;
  font-weight: 700;
  margin-top: 7px;
`;

const ProductsContainer = styled.div`
  min-width: 8em;
  height: auto;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProductPreviewImg = styled.img`
  width: 4em;
  height: 4em;
  margin-right: 1em;
`;

const ProductDetail = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-right: 0.3em;
`;

function Preview({
  product,
  quantity,
}: {
  product: IProduct;
  quantity: number;
}) {
  return (
    <Popover
      interactionKind={PopoverInteractionKind.HOVER}
      content={<ProductPreview product={product} />}
    >
      <ProductInfo>
        <ProductPreviewImg src={product.imageUrl} />
        <ProductDetail>{product.name}</ProductDetail>
        <ProductDetail>x{quantity}</ProductDetail>
        <ProductDetail>=</ProductDetail>
        <ProductDetail>{product.price * quantity}DZD</ProductDetail>
      </ProductInfo>
    </Popover>
  );
}

export default function OrderInfo(props: IOrderInfoProps) {
  const { currentItem, onCloseButtonClick, apolloClient } = props;

  const [orderProducts, setOrderProducts] = useState<
    IProductWithQuantity[] | null
  >(null);

  const [shippingPrice, setShippingPrice] = useState<number | null>(null);

  const loadOrderProducts = async () => {
    if (currentItem) {
      const currentOrderProducts = await apolloClient.query({
        query: GET_ORDER_PRODUCTS,
        variables: { orderId: currentItem.id },
      });

      if (currentOrderProducts && currentOrderProducts.data) {
        setOrderProducts(currentOrderProducts.data
          .orderProducts as IProductWithQuantity[]);
      } else {
        AppToaster.show({
          message: 'Cannot Load Order Products',
          intent: Intent.DANGER,
        });
      }
    }
  };

  const getShippingDetails = async (wilaya: string) => {
    const shippingResponse = await props.apolloClient
      .query({ query: GET_SHIPPING, variables: { wilaya } })
      .catch(err => {});

    if (
      shippingResponse &&
      shippingResponse.data &&
      shippingResponse.data.shipping
    ) {
      setShippingPrice(shippingResponse.data.shipping.price);
    } else {
      AppToaster.show({
        message: 'Cannot Load shipping information',
        intent: Intent.DANGER,
      });
    }
  };

  if (!currentItem)
    return (
      <ElevatedCard>
        <H3>Order is unavailable!</H3>
      </ElevatedCard>
    );

  useEffect(() => {
    loadOrderProducts();
    getShippingDetails(currentItem.wilaya);
  }, []);

  //Calulate Price
  let totalPrice = 0;
  if (orderProducts) {
    for (const op of orderProducts) {
      totalPrice += op.product.price * op.quantity;
    }
  }

  return (
    <ElevatedCard
      header={currentItem.name}
      showCloseButton
      onCloseButtonClick={onCloseButtonClick}
    >
      <ProductsContainer>
        {orderProducts &&
          orderProducts.map((op, idx) => {
            return (
              <>
                <Preview product={op.product} quantity={op.quantity} />
                <Divider />
              </>
            );
          })}
      </ProductsContainer>
      <Title>Transaction ID</Title>
      <Text>{currentItem.transactionId}</Text>
      <Title>First Name</Title>
      <Text>{currentItem.firstName}</Text>
      <Title>Last Name</Title>
      <Text>{currentItem.lastName}</Text>
      <Title>Phone Number</Title>
      <Text>{currentItem.phone}</Text>
      <Title>Facebook Profile</Title>
      <Text>{currentItem.facebook_profile || 'No Facebook provided'}</Text>
      <Title>Wilaya</Title>
      <Text>
        {currentItem.wilaya} ({shippingPrice}DZD)
      </Text>
      <Title>City</Title>
      <Text>{currentItem.city}</Text>
      <Title>Buyer Instructions</Title>
      <Text>{currentItem.instructions || 'No Instructions provided'}</Text>
      <SuccessTitle>Total Price</SuccessTitle>
      {shippingPrice && (
        <>
          <HorizontalWrapper noMargin>
            <Text>{totalPrice}</Text>
            <Text> + </Text>
            <Text>({shippingPrice} shipping)</Text>
          </HorizontalWrapper>
          <Divider />
          <TotalPrice>{totalPrice + shippingPrice}DZD</TotalPrice>
        </>
      )}
      {!shippingPrice && (
        <Callout intent={Intent.DANGER}>
          Error, Cannot fetch shipping information! Please reload the page
        </Callout>
      )}
    </ElevatedCard>
  );
}
