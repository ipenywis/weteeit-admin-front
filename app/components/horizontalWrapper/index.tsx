import * as React from 'react';
import styled from 'styled-components';

interface IHorizontalWrapperProps {
  width?: string;
  height?: string;
  children?: any[];
}

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ width }: IHorizontalWrapperProps) => (width ? width : 'auto')};
  height: ${({ height }: IHorizontalWrapperProps) =>
    height ? height : 'auto'};
`;

export function HorizontalWrapper(props: IHorizontalWrapperProps) {
  return <HorizontalContainer>{props.children}</HorizontalContainer>;
}
