import React from 'react';
import styled from 'styled-components';

export interface IWrapperProps {
  width?: string;
  height?: string;
  useFlexBox?: boolean;
  vertical?: boolean;
  centerVertically?: boolean;
  centerHorizontally?: boolean;
}

const WrapperContainer = styled.div`
  width: ${(props: IWrapperProps) => props.width || '100%'};
  height: ${props => props.height || '100%'};
  display: ${props => (props.useFlexBox ? 'flex' : 'block')};
  flex-direction: ${props => (props.vertical ? 'row' : 'column')};
  justify-content: ${props => props.centerVertically && 'center'};
  align-items: ${props => props.centerHorizontally && 'center'};
`;

export default class Wrapper extends React.Component<IWrapperProps> {
  public static defaultProps = {
    useFlexBox: true,
    vertical: true,
  };

  constructor(props: IWrapperProps) {
    super(props);
  }

  render() {
    return (
      <WrapperContainer {...this.props}>
        {React.Children.map(this.props.children, (child, idx) => {
          return React.cloneElement(child as React.ReactElement, { key: idx });
        })}
      </WrapperContainer>
    );
  }
}
