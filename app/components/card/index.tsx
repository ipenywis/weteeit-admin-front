import * as React from 'react';
import styled from 'styled-components';
import {
  Card as BCard,
  ICardProps as IBCardProps,
  Elevation,
  Icon,
} from '@blueprintjs/core';
import { theme } from 'styles/styled-components';
import { AppLoading } from 'components/appLoading';

interface ICardProps extends IBCardProps {
  header?: string;
  large?: boolean;
  standalone?: boolean;
  loading?: boolean;
  showCloseButton?: boolean;

  onCloseButtonClick?: () => void;
}

const CardContainer = styled(BCard)`
  font-family: 'Open Sans', sans-serif;
  margin-right: ${(props: ICardProps) => !props.standalone && '4em'};
  min-width: ${(props: ICardProps) => (props.large ? '20em' : '14em')};
  width: fit-content;
  position: relative;
`;

const CardHeader = styled.div`
  font-size: 18px;
  color: ${theme.default.darkText};
  margin-bottom: 1em;
  font-weight: 500;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 6px;
  right: 9px;
  cursor: pointer;

  svg {
    color: #95a5a6;
    transition: all 120ms ease-in-out;
    &:hover {
      color: #7f8c8d;
    }
  }
`;

export class Card extends React.Component<ICardProps> {
  static defaultProps = {
    elevation: Elevation.TWO,
  };

  render() {
    const { header, loading, showCloseButton } = this.props;

    return (
      <CardContainer
        className={this.props.className}
        standalone={this.props.standalone}
        large={this.props.large}
      >
        {showCloseButton && (
          <CloseButton onClick={this.props.onCloseButtonClick}>
            <Icon icon="cross" iconSize={16} />
          </CloseButton>
        )}
        {header && <CardHeader>{header}</CardHeader>}
        {loading && <AppLoading size="L" showLoadingText={false} />}
        {!loading && this.props.children}
      </CardContainer>
    );
  }
}
