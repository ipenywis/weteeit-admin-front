import * as React from 'react';
import styled from 'styled-components';
import TicketSVG from '../../images/ticket.svg';

const AppBrandContainer = styled.div`
  display: flex;
  width: 100%;
  height: 4em;
  justify-content: center;
  align-items: center;
  box-shadow: -11px -4px 12px 1px rgba(15, 15, 15, 0.2);
`;

const LogoText = styled.div`
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  margin-left: 5px;
  color: #007bff;
  &:hover {
  }
`;

const LogoContainer = styled.div`
  color: #3498db;
  width: 2.5em;
  img {
    width: 100%;
    height: 100%;
  }
`;

export function AppBrand() {
  return (
    <AppBrandContainer>
      <LogoContainer>
        <img src={TicketSVG} />
      </LogoContainer>
      <LogoText>Easickets Dashboard</LogoText>
    </AppBrandContainer>
  );
}
