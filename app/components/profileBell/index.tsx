import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import {
  Popover,
  Position,
  Menu,
  MenuItem,
  Intent,
  MenuDivider,
} from '@blueprintjs/core';
import Wrapper from 'components/wrapper';

export interface IProfileBellProps {}

const ProfileBellContainer = styled.div`
  min-width: 11em;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;

  div,
  svg {
    transition: all 250ms ease-in-out;
  }
`;

const ProfileImage = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 12px 1px rgba(15, 15, 15, 0.1);
  cursor: pointer;
  transition: all 250ms ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const ProfileName = styled.div`
  font-size: 12px;
  margin-left: 6px;
  color: ${theme.default.semiDark};
  cursor: pointer;

  &:hover {
    color: ${theme.default.semiLight};
  }
`;

const ArrowIcon = styled.div`
  margin-left: 5px;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3px;
  color: ${theme.default.light};
`;

const CustomPopover = styled(Popover as any)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomMenu = styled(Menu)`
  min-width: 120px;
`;

const CustomMenuItem = styled(MenuItem)`
  font-size: 13px;
  padding: 2px 5px;
`;

export default class ProfileBell extends React.Component<IProfileBellProps> {
  renderProfileDropdown() {
    return (
      <CustomMenu large={false}>
        <CustomMenuItem text="Edit Info" />
        <MenuDivider />
        <CustomMenuItem text="Logout" intent={Intent.DANGER} />
      </CustomMenu>
    );
  }

  render() {
    return (
      <ProfileBellContainer>
        <CustomPopover
          content={this.renderProfileDropdown()}
          position={Position.BOTTOM}
          minimal={true}
        >
          <Wrapper centerVertically={true} centerHorizontally={true}>
            <ProfileImage>
              <img src="https://s3.amazonaws.com/37assets/svn/1065-IMG_2529.jpg" />
            </ProfileImage>
            <ProfileName>Islem Maboud</ProfileName>
            <ArrowIcon>
              <FontAwesomeIcon icon={faSortDown} size="sm" />
            </ArrowIcon>
          </Wrapper>
        </CustomPopover>
      </ProfileBellContainer>
    );
  }
}
