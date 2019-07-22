import * as React from 'react';
import styled from 'styled-components';

interface IHorizontalWrapperProps {
  width?: string;
  height?: string;
  spaceBetween?: boolean;
  children?: any;
}

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ width }: IHorizontalWrapperProps) => (width ? width : 'auto')};
  height: ${({ height }: IHorizontalWrapperProps) =>
    height ? height : 'auto'};
  justify-content: ${props => props.spaceBetween && 'space-between'};
  margin: 2em 0;
  flex-wrap: wrap;
`;

export function HorizontalWrapper(props: IHorizontalWrapperProps) {
  return <HorizontalContainer {...props}>{props.children}</HorizontalContainer>;
}
