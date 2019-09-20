import * as React from 'react';
import styled from 'styled-components';
import {
  Card as BCard,
  ICardProps as IBCardProps,
  Elevation,
} from '@blueprintjs/core';
import { theme } from 'styles/styled-components';
import { AppLoading } from 'components/appLoading';

interface ICardProps extends IBCardProps {
  header?: string;
  large?: boolean;
  standalone?: boolean;
  loading?: boolean;
}

const CardContainer = styled(BCard)`
  font-family: 'Open Sans', sans-serif;
  margin-right: ${(props: ICardProps) => !props.standalone && '4em'};
  min-width: ${(props: ICardProps) => (props.large ? '20em' : '14em')};
`;

const CardHeader = styled.div`
  font-size: 18px;
  color: ${theme.default.darkText};
  margin-bottom: 1em;
  font-weight: 500;
`;

export class Card extends React.Component<ICardProps> {
  static defaultProps = {
    elevation: Elevation.TWO,
  };

  render() {
    const { header, loading } = this.props;

    //const classes = loading ? Classes.SKELETON : '';

    return (
      <CardContainer {...this.props}>
        {header && <CardHeader>{header}</CardHeader>}
        {loading && <AppLoading size="L" showLoadingText={false} />}
        {!loading && this.props.children}
      </CardContainer>
    );
  }
}
