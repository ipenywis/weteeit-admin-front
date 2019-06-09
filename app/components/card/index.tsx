import * as React from 'react';
import styled from 'styled-components';
import {
  Card as BCard,
  ICardProps as IBCardProps,
  Elevation,
} from '@blueprintjs/core';
import { theme } from 'styles/styled-components';

const CardContainer = styled(BCard)`
  font-family: 'Open Sans', sans-serif;
  margin-right: 4em;
  min-width: 12em;
`;

const CardHeader = styled.div`
  font-size: 18px;
  color: ${theme.default.darkText};
  margin-bottom: 1em;
  font-weight: 500;
`;

interface ICardProps extends IBCardProps {
  header?: string;
}

export class Card extends React.Component<ICardProps> {
  static defaultProps = {
    elevation: Elevation.TWO,
  };

  render() {
    const { header } = this.props;
    return (
      <CardContainer {...this.props}>
        {header && <CardHeader>{header}</CardHeader>}
        {this.props.children}
      </CardContainer>
    );
  }
}
