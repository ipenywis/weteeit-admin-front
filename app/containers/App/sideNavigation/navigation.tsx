import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectLocation, makeNavActiveItem } from '../selectors';
import styled from 'styled-components';
import { AppBrand } from 'components/appBrand';
import { theme } from '../../../styles/styled-components';
import { Dispatch } from 'redux';
import { setActiveNavItem } from '../actions';
import { NavigationItems, INavigationItem } from '../constants';
import { Link } from 'react-router-dom';

export interface INavigationProps {
  activeNavItem?: string;
  location?: any;

  setActiveNavItem?: (itemId: string) => void;
}

const NavigationContainer = styled.div`
  min-width: 16%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 25px 1px rgba(15, 15, 15, 0.12);
  z-index: 20;
  background-color: #fff;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 0;
`;

interface INavItemProps {
  active?: boolean;
}

const NavItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.8em;
  border-bottom: 1px solid rgba(113, 109, 109, 0.03);
  padding: 0px 25px;
  color: #3d5170;
  font-weight: 400;
  font-size: 14px;
  transition: box-shadow 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0.1875rem 0 0 ${theme.default.primary};
    background-color: ${theme.default.componentBackgroundSecondary};
    color: ${theme.default.primary};
  }

  ${(props: INavItemProps) =>
    props.active &&
    `
    box-shadow: inset 0.1875rem 0 0 ${theme.default.primary};
    background-color: ${theme.default.componentBackgroundSecondary};
    color: ${theme.default.primary};
  `}
`;

function SideNavigation(props: INavigationProps) {
  const { activeNavItem } = props;

  const onItemClick = (itemId: string) => {
    props.setActiveNavItem && props.setActiveNavItem(itemId);
  };

  const navItemsKeys = Object.keys(NavigationItems);
  return (
    <NavigationContainer>
      <AppBrand />
      <InnerContainer>
        {navItemsKeys.map((item, idx) => {
          const navItem: INavigationItem = NavigationItems[item];
          return (
            <Link to={navItem.path}>
              <NavItem
                key={`${item}-${idx}`}
                active={activeNavItem === item}
                onClick={() => onItemClick(item)}
              >
                {navItem.name}
              </NavItem>
            </Link>
          );
        })}
      </InnerContainer>
    </NavigationContainer>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveNavItem: (itemId: string) => {
    console.log('Dispatching...');
    dispatch(setActiveNavItem(itemId));
  },
});

const mapStateToProps = createSelector(
  makeSelectLocation(),
  makeNavActiveItem(),
  (location, activeNavItem) => {
    return {
      location: location,
      activeNavItem: activeNavItem,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideNavigation);
