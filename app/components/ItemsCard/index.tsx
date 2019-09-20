import React from 'react';
import styled from 'styled-components';
import { Card } from 'components/card';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { theme } from 'styles/styled-components';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';

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
  height: 3em;
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

const itemListRenderer: ItemRenderer<string> = (
  item,
  { handleClick, modifiers },
) => {
  console.log('In renderer: ', item);

  return (
    <MenuItem
      active={modifiers.active}
      key={item}
      onClick={handleClick}
      text={item}
      label={item}
    />
  );
};

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
  } = props;

  const isItemsValid = items && items.length > 0;

  console.log('Bnti: ', dropdownItems);

  return (
    <FlexCard header={header} interactive loading={loading}>
      <Select
        items={dropdownItems as any}
        itemRenderer={itemListRenderer}
        onItemSelect={onDropdownItemSelect as any}
        filterable={false}
      >
        <Button icon="tag" text={dropdownItems && dropdownItems[0]} />
      </Select>
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
              <RightSide />
            </Item>
          );
        })}
    </FlexCard>
  );
}
