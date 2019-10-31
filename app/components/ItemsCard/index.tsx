import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'components/card';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { theme } from 'styles/styled-components';
import { Button, Overlay, Intent, Classes, IconName } from '@blueprintjs/core';
import { ListDropdown } from 'components/listDropdown';

export interface IBaseItem {
  name: string;
  imageUrl?: string;
  price?: number;
}

export interface IItemsCardProps<T extends IBaseItem> {
  header: string;
  items: T[] | null;
  dropdownItems?: string[];
  noItemsMessage?: string;
  loading?: boolean;
  activeDropdownItem?: string;

  updateCard?: JSX.Element;
  deleteAlert?: JSX.Element;
  infoCard?: JSX.Element;
  customAlert?: JSX.Element;
  customAlertIcon?: IconName;
  customAlertIntent?: Intent;

  filterItems?: (item: T) => boolean;
  onDropdownItemSelect?: (
    item: string,
    e: React.SyntheticEvent<any, Event>,
  ) => void;
}

const FlexCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5em;
`;

const LeftSide = styled(HorizontalWrapper)`
  flex: 1;
`;

const RightSide = styled(HorizontalWrapper)`
  justify-content: flex-end;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.2em;
  background-color: ${theme.default.itemBackground};
  padding: 20px;
  margin-bottom: 1em;
  transition: all 200ms ease-in-out;
  box-shadow: 0px 0px 5px 0px rgba(15, 15, 15, 0.2);

  &:hover {
    filter: contrast(0.94);
  }
`;

const ItemLogo = styled.div`
  width: 2em;
  border-radius: 50%;
  margin-right: 2em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ItemName = styled.div`
  font-size: 18px;
  color: #000;
  margin-right: 2em;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-right: 2em;
  color: ${theme.default.muted};
`;

const StyledOverlay = styled(Overlay as any)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlContainer = styled.div`
  margin-right: 10px;

  &:last-of-type {
    margin-right: 0px;
  }
`;

function UpdateItem<T>({
  updateCard,
  item,
}: {
  updateCard: JSX.Element;
  item: T;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(prevValue => !prevValue);
  };

  return (
    <ControlContainer>
      <Button icon="edit" intent={Intent.WARNING} onClick={toggleOverlay} />
      <StyledOverlay
        isOpen={isOpen}
        onClose={toggleOverlay}
        className={Classes.OVERLAY_SCROLL_CONTAINER}
        canOutsideClickClose={false}
        canEscapeKeyClose
        transitionDuration={50}
      >
        {React.cloneElement(updateCard, {
          onCloseButtonClick: toggleOverlay,
          currentItem: item,
        })}
      </StyledOverlay>
    </ControlContainer>
  );
}

function DeleteItem<T>({
  item,
  deleteAlert,
}: {
  item: T;
  deleteAlert: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ControlContainer>
      <Button
        icon="trash"
        intent={Intent.DANGER}
        onClick={() => setIsOpen(true)}
      />
      {deleteAlert &&
        React.cloneElement(deleteAlert, {
          isOpen,
          setIsOpen,
          currentItem: item,
        })}
    </ControlContainer>
  );
}

function CustomAlert<T>({
  item,
  customAlert,
  alertIcon,
  alertIntent,
}: {
  item: T;
  customAlert?: JSX.Element;
  alertIcon?: IconName;
  alertIntent?: Intent;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ControlContainer>
      <Button
        icon={alertIcon}
        intent={alertIntent}
        onClick={() => setIsOpen(true)}
      />
      {customAlert &&
        React.cloneElement(customAlert, {
          isOpen,
          setIsOpen,
          currentItem: item,
        })}
    </ControlContainer>
  );
}

function ItemInfo<T>({ item, infoCard }: { item: T; infoCard: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <ControlContainer>
      <Button
        icon="info-sign"
        intent={Intent.PRIMARY}
        onClick={toggleOverlay}
      />
      {infoCard && (
        <StyledOverlay
          isOpen={isOpen}
          onClose={toggleOverlay}
          className={Classes.OVERLAY_SCROLL_CONTAINER}
          canOutsideClickClose={false}
          canEscapeKeyClose
          transitionDuration={50}
        >
          {React.cloneElement(infoCard, {
            onCloseButtonClick: toggleOverlay,
            currentItem: item,
          })}
        </StyledOverlay>
      )}
    </ControlContainer>
  );
}

export default function ItemsCard<T extends IBaseItem>(
  props: IItemsCardProps<T>,
) {
  const {
    header,
    items,
    noItemsMessage,
    loading,
    dropdownItems,
    onDropdownItemSelect,
    activeDropdownItem,
    updateCard,
    deleteAlert,
    infoCard,
    customAlert,
    customAlertIcon,
    customAlertIntent,
  } = props;

  const isItemsValid = items && items.length > 0;
  const isDropDownValid = dropdownItems && dropdownItems.length > 0;

  return (
    <FlexCard header={header} interactive loading={loading}>
      {isDropDownValid && (
        <ListDropdown
          dropdownItems={dropdownItems as any}
          onDropdownItemSelect={onDropdownItemSelect}
          activeDropdownItem={activeDropdownItem}
        />
      )}
      {!isItemsValid && <b>{noItemsMessage || 'No Items Available!'}</b>}
      {isItemsValid &&
        (items as T[]).map((item, idx) => {
          //Filter Items rendering if defined
          if (props.filterItems && !props.filterItems(item)) return null;
          const itemKey = `${item.name}-${idx}`;
          return (
            <Item key={itemKey}>
              <LeftSide>
                {item.imageUrl && (
                  <ItemLogo>
                    <img src={item.imageUrl} alt="item-image" />
                  </ItemLogo>
                )}
                <ItemName>{item.name}</ItemName>
                {item.price && <ItemPrice>{item.price}</ItemPrice>}
              </LeftSide>
              <RightSide>
                {customAlert && (
                  <CustomAlert
                    item={item}
                    customAlert={customAlert}
                    alertIntent={customAlertIntent}
                    alertIcon={customAlertIcon}
                  />
                )}
                {infoCard && <ItemInfo item={item} infoCard={infoCard} />}
                {updateCard && (
                  <UpdateItem item={item} updateCard={updateCard} />
                )}
                {deleteAlert && (
                  <DeleteItem item={item} deleteAlert={deleteAlert} />
                )}
              </RightSide>
            </Item>
          );
        })}
    </FlexCard>
  );
}
