import React from 'react';
import { Text as BText, H3 } from '@blueprintjs/core';
import { Card } from 'components/card';
import styled from 'styled-components';
import { IOrder } from './type';
import { theme } from 'styles/styled-components';

interface IOrderWithName extends IOrder {
  name: string;
}

export interface IOrderInfoProps {
  currentItem?: IOrderWithName;

  onCloseButtonClick?: () => void;
}

const ElevatedCard = styled(Card)`
  z-index: 99;
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

export default function OrderInfo(props: IOrderInfoProps) {
  const { currentItem, onCloseButtonClick } = props;

  if (!currentItem)
    return (
      <ElevatedCard>
        <H3>Order is unavailable!</H3>
      </ElevatedCard>
    );

  return (
    <ElevatedCard
      header={currentItem.name}
      showCloseButton
      onCloseButtonClick={onCloseButtonClick}
    >
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
      <Text>{currentItem.wilaya}</Text>
      <Title>City</Title>
      <Text>{currentItem.city}</Text>
      <Title>Buyer Instructions</Title>
      <Text>{currentItem.instructions || 'No Instructions provided'}</Text>
    </ElevatedCard>
  );
}
