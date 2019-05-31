import * as React from 'react';
import { connect } from 'react-redux';
//import { createSelector } from 'reselect';
import styled from 'styled-components';
import SearchBar from 'components/searchBar';
import { Dispatch } from 'redux';
import { openSearchBar, closeSearchBar } from '../actions';
import { createSelector } from 'reselect';
import { makeIsSearchBarOpen } from '../selectors';
import ProfileBell from 'components/profileBell';
import { Divider } from '@blueprintjs/core';

export interface INavBarProps {
  isSearchBarOpen?: boolean;
}
interface IDispatchProps {
  openSearchBar: () => void;
  closeSearchBar: () => void;
}

const NavBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 3.7em;
  box-shadow: 0px 1px 12px 1px rgba(15, 15, 15, 0.12);
  z-index: 10;
  background-color: #fff;
  padding: 0 15px 0 0;
`;

const CustomDivider = styled(Divider)`
  margin: 0;
`;

function NavBar(props: INavBarProps | IDispatchProps) {
  const { isSearchBarOpen } = props as INavBarProps;

  return (
    <NavBarContainer>
      <SearchBar
        isOpen={isSearchBarOpen as boolean}
        onOpenClick={(props as IDispatchProps).openSearchBar}
        onCloseClick={(props as IDispatchProps).closeSearchBar}
      />
      <CustomDivider />
      <ProfileBell />
    </NavBarContainer>
  );
}

const mapStateToProps = createSelector(
  makeIsSearchBarOpen(),
  isSearchBarOpen => ({
    isSearchBarOpen,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  openSearchBar: () => {
    dispatch(openSearchBar());
  },
  closeSearchBar: () => {
    dispatch(closeSearchBar());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
