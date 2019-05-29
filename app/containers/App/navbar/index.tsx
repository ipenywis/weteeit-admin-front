import * as React from 'react';
import { connect } from 'react-redux';
//import { createSelector } from 'reselect';
import styled from 'styled-components';

export interface INavBarProps {}

const NavBarContainer = styled.div`
  width: 100%;
  height: 2.8em;
  box-shadow: 0px 1px 12px 1px rgba(15, 15, 15, 0.12);
  z-index: 10;
  background-color: #fff;
`;

export function NavBar(props: INavBarProps) {
  return <NavBarContainer>NavBarHere</NavBarContainer>;
}

const mapStateToProps = () => {};

export default connect(mapStateToProps)(NavBar);
