import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'components/card';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { theme } from 'styles/styled-components';
import { Button, Overlay, Intent, Classes } from '@blueprintjs/core';
import { ListDropdown } from 'components/listDropdown';

export interface IBaseItem {
  name: string;
  imageUrl: string;
  price: number;
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
      <Button icon="edit" intent={Intent.PRIMARY} onClick={toggleOverlay} />
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
  } = props;

  const isItemsValid = items && items.length > 0;

  return (
    <FlexCard header={header} interactive loading={loading}>
      <ListDropdown
        dropdownItems={dropdownItems as any}
        onDropdownItemSelect={onDropdownItemSelect}
        activeDropdownItem={activeDropdownItem}
      />
      {!isItemsValid && <b>{noItemsMessage || 'No Items Available!'}</b>}
      {isItemsValid &&
        (items as T[]).map((item, idx) => {
          const itemKey = `${item.name}-${idx}`;
          return (
            <Item key={itemKey}>
              <LeftSide>
                <ItemLogo>
                  <img src={item.imageUrl} alt="item-image" />
                </ItemLogo>
                <ItemName>{item.name}</ItemName>
              </LeftSide>
              <RightSide>
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
