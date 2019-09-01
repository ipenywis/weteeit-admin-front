import React from 'react';
import styled from 'styled-components';
import { Link as RLink, LinkProps } from 'react-router-dom';
import { theme } from 'styles/styled-components';

export interface ILinkProps extends LinkProps {}

const StyledLink = styled(RLink)`
  color: ${theme.default.primary};
  transition: color 150ms ease-in-out;

  &:hover {
    color: ${theme.default.primaryHover};
  }
`;

export function Link(props: ILinkProps) {
  return <StyledLink {...props}>{props.children}</StyledLink>;
}
