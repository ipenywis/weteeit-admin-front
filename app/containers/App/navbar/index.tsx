import * as React from 'react';
import { connect } from 'react-redux';
// import { createSelector } from 'reselect';
import styled from 'styled-components';
import SearchBar from 'components/searchBar';
import { Dispatch } from 'redux';
import { openSearchBar, closeSearchBar, needToAuthenticate } from '../actions';
import { createSelector } from 'reselect';
import { makeIsSearchBarOpen } from '../selectors';
import ProfileBell from 'components/profileBell';
import { Divider } from '@blueprintjs/core';
import { push } from 'connected-react-router';
import * as cookies from 'js-cookie';
import { AUTH_COOKIE_KEY } from 'common';

export interface INavBarProps extends IDispatchProps {
  isSearchBarOpen?: boolean;
  disabled?: boolean;
  username?: string;
}
interface IDispatchProps {
  openSearchBar?: () => void;
  closeSearchBar?: () => void;
  pushRoute?: (path: string) => void;
  needToAuthenticate?: () => void;
}

const NavBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 4em;
  box-shadow: 0px 0px 5px 0px rgba(15, 15, 15, 0.12);
  z-index: 10;
  background-color: #fff;
  padding: 0 15px 0 0;
`;

const CustomDivider = styled(Divider)`
  margin: 0;
`;

function NavBar(props: INavBarProps) {
  const { isSearchBarOpen, disabled } = props as INavBarProps;

  const logout = () => {
    //Delete auth cookie
    cookies.remove(AUTH_COOKIE_KEY);
    //Change to un-authenticated state
    props.needToAuthenticate && props.needToAuthenticate();
  };

  return (
    <NavBarContainer>
      {!disabled && (
        <SearchBar
          isOpen={!disabled && (isSearchBarOpen as boolean)}
          onOpenClick={!disabled ? props.openSearchBar : () => {}}
          onCloseClick={!disabled ? props.closeSearchBar : () => {}}
        />
      )}
      {!disabled && <CustomDivider />}
      {!disabled && (
        <ProfileBell
          pushRoute={props.pushRoute}
          onLogout={logout}
          username={props.username as string}
        />
      )}
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
  pushRoute: (path: string) => {
    dispatch(push(path));
  },
  needToAuthenticate: () => dispatch(needToAuthenticate()),
});

export default connect<void, void, INavBarProps>(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
