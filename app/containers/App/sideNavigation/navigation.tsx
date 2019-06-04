import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  makeSelectLocation,
  makeNavActiveItem,
  makeActiveSubMenu,
} from '../selectors';
import styled from 'styled-components';
import { AppBrand } from 'components/appBrand';
import { theme } from '../../../styles/styled-components';
import { Dispatch } from 'redux';
import { setActiveNavItem, setActiveSubMenu } from '../actions';
import { NavigationItems, INavigationItem } from '../constants';
import { Link } from 'react-router-dom';
import Wrapper from 'components/wrapper';

export interface INavigationProps {
  activeNavItem?: string;
  location?: any;
  activeSubMenu?: string;

  setActiveNavItem?: (itemId: string) => void;
  setActiveSubMenu?: (itemId: string | null) => void;
}

const NavigationContainer = styled.div`
  min-width: 16%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 6px 1px rgba(15, 15, 15, 0.12);
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
  position: relative;

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

const SubMenu = styled.div`
  position: absolute;
  min-width: 130px;
  min-height: 5em;
  top: 0;
  right: -9.5em;
  background-color: #fff;
  box-shadow: 0px 0px 10px 1px rgba(15, 15, 15, 0.17);
`;

const CustomLink = styled(Link)`
  position: relative;
  width: 100%;
`;

function SideNavigation(props: INavigationProps) {
  const { activeNavItem, activeSubMenu, setActiveSubMenu } = props;

  const onItemClick = (itemId: string) => {
    props.setActiveNavItem && props.setActiveNavItem(itemId);
  };

  const renderNavItem = (
    navItem: INavigationItem,
    item: string,
    key: string,
    renderSubMenuOnHover = true,
  ) => {
    const path = navItem.path ? navItem.path : '/';
    const isActive = activeNavItem === item;
    let navItemRef: HTMLDivElement | null = null;

    let subMenu: JSX.Element | null = null;
    if (navItem.submenu)
      subMenu = renderSubMenu(navItem.submenu as INavigationItem[]);
    const isSubMenuOpen = navItem.submenu && activeSubMenu === item;
    let timer: number;

    //Mouse Enter
    const onNavItemHover = () => {
      console.log('Container Enter');
      //Clear Timeout if started
      if (timer) clearTimeout(timer);
      if (renderSubMenuOnHover && navItemRef)
        navItemRef &&
          (navItemRef as HTMLDivElement).addEventListener('mouseover', () => {
            navItem.submenu && setActiveSubMenu && setActiveSubMenu(item);
          });
    };

    return (
      <Wrapper height="auto" width="100%">
        <CustomLink to={path} key={key}>
          <NavItem
            onMouseEnter={onNavItemHover}
            active={isActive}
            onClick={() => onItemClick(item)}
            ref={ref => (navItemRef = ref)}
          >
            <div>{navItem.name}</div>
          </NavItem>
          {isSubMenuOpen && subMenu}
        </CustomLink>
      </Wrapper>
    );
  };

  const renderSubMenu = (navItems: INavigationItem[]) => {
    const navItemsKeys = Object.keys(navItems);
    return (
      <SubMenu>
        {navItemsKeys.map((item, idx) => {
          const navItem: INavigationItem = navItems[item];
          return renderNavItem(navItem, item, `${item}-${idx}`);
        })}
      </SubMenu>
    );
  };

  const onMouseLeave = () => {
    setActiveSubMenu && setActiveSubMenu(null);
  };

  const navItemsKeys = Object.keys(NavigationItems);
  return (
    <NavigationContainer>
      <AppBrand />
      <InnerContainer>
        {navItemsKeys.map((item, idx) => {
          const navItem: INavigationItem = NavigationItems[item];
          return (
            <Wrapper height="auto" onMouseLeave={onMouseLeave}>
              {renderNavItem(navItem, item, `${item}-${idx}`)}
            </Wrapper>
          );
        })}
      </InnerContainer>
    </NavigationContainer>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveNavItem: (itemId: string) => {
    dispatch(setActiveNavItem(itemId));
  },
  setActiveSubMenu: (itemId: string) => {
    dispatch(setActiveSubMenu(itemId));
  },
});

const mapStateToProps = createSelector(
  makeSelectLocation(),
  makeNavActiveItem(),
  makeActiveSubMenu(),
  (location, activeNavItem, activeSubMenu) => {
    return {
      location,
      activeNavItem,
      activeSubMenu,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideNavigation);
