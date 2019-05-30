import * as React from 'react';
import styled from 'styled-components';

interface IVerticalWrapperProps {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  children?: any[];
}

const VerticalContainer = styled.div`
  width: ${(props: IVerticalWrapperProps) => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  display: flex;
  flex-direction: column;
`;

export function VerticalWrapper(props: IVerticalWrapperProps) {
  console.log('Width: ', props.width ? props.width : 'auto');
  return <VerticalContainer {...props}>{props.children}</VerticalContainer>;
}
