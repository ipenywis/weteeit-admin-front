import * as React from 'react';
import styled from 'styled-components';
import { Card as BCard, IProps, HTMLDivProps } from '@blueprintjs/core';

const CardContainer = styled(BCard)``;

const CardHeader = styled.div``;

interface ICardProps extends IProps, HTMLDivProps {
  header?: string;
}

export function Card(props: ICardProps) {
  const { header } = props;
  return (
    <CardContainer {...props}>
      {header && <CardHeader>{header}</CardHeader>}
      {props.children}
    </CardContainer>
  );
}
