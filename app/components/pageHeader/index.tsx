import * as React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Open Sans', sans-serif;
`;

const SubHeaderText = styled.div`
  font-size: 10px;
  color: ${theme.default.muted};
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const HeaderText = styled.div`
  font-size: 23px;
  font-weight: 600;
  color: ${theme.default.darkText};
`;

export interface IPageHeaderProps {
  header: string;
  subHeader?: string;
}

export default function PageHeader(props: IPageHeaderProps) {
  return (
    <Container>
      {props.subHeader && <SubHeaderText>{props.subHeader}</SubHeaderText>}
      <HeaderText>{props.header}</HeaderText>
    </Container>
  );
}
