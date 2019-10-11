import React from 'react';
import styled from 'styled-components';
import { Select, ISelectProps, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, IActionProps } from '@blueprintjs/core';

export interface IListDropdown extends Partial<ISelectProps<string>> {
  dropdownItems: string[];
  activeDropdownItem?: string;
  iconName?: IActionProps['icon'];

  onDropdownItemSelect?: (
    item: string,
    e: React.SyntheticEvent<any, Event>,
  ) => void;
}

const Dropdown = styled(Select)`
  margin-bottom: 1em;
`;

const itemListRenderer: ItemRenderer<string> = (
  item,
  { handleClick, modifiers },
) => {
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

export function ListDropdown(props: IListDropdown) {
  const {
    dropdownItems,
    activeDropdownItem,
    onDropdownItemSelect,
    iconName,
  } = props;

  return (
    <Dropdown
      items={dropdownItems as any}
      itemRenderer={itemListRenderer}
      onItemSelect={onDropdownItemSelect as any}
      activeItem={activeDropdownItem}
      filterable={false}
      disabled={props.disabled}
    >
      <Button
        icon={iconName}
        text={activeDropdownItem || (dropdownItems && dropdownItems[0])}
        disabled={props.disabled}
      />
    </Dropdown>
  );
}
