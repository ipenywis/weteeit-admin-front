import React from 'react';
import { Text as BText } from '@blueprintjs/core';
import styled from 'styled-components';
import { theme } from 'styles/styled-components';
import { IProduct } from 'containers/productPage/type';

export interface IProductPreview {
  product: IProduct;
}

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 12em;
  padding: 11px;
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 2em;
  display: flex;
  justify-content: center;

  img {
    width: 12em;
    height: 12em;
    box-shadow: 0px 0px 12px 3px rgba(15, 15, 15, 0.2);
  }
`;

const Title = styled.div`
  font-size: 19px;
  color: ${theme.default.darkText};
  font-weight: 600;
  margin-bottom: 3px;
`;

const Text = styled(BText)`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
`;

interface IProductAvailabilityProps {
  available: boolean;
}

const ProductAvailability = styled.span`
  background-color: ${({ available }: IProductAvailabilityProps) =>
    available ? '#27ae60' : '#e74c3c'};
  color: #fff;
  font-size: 15px;
  width: fit-content;
  padding: 0 4px;
  border-radius: 3px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export default function ProductPreview(props: IProductPreview) {
  const { product } = props;

  return (
    <PreviewContainer>
      <PreviewImage>
        <img src={product.imageUrl} alt="Product Image Preview" />
      </PreviewImage>
      <ProductAvailability available={product.available}>
        {product.available ? 'available' : 'not available'}
      </ProductAvailability>
      <Title>Name</Title>
      <Text>{product.name}</Text>
      <Title>Type</Title>
      <Text>{product.type.toLowerCase()}</Text>
      <Title>Price</Title>
      <Text>{product.price}</Text>
    </PreviewContainer>
  );
}
