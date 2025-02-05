import * as React from 'react';
import styled from 'styled-components';
import {useRef} from "react";
import {UseSelectSelectedItemChange, useSelect} from "downshift";
import Button from "./Button";

interface ItemObject {
  label: string,
  value: string,
  icon: string,
}

interface DropdownProps extends React.HTMLAttributes<HTMLElement> {
  items: ItemObject[]
  selectedItem: ItemObject,
  onSetItem: (newSelectedItem: ItemObject) => void,
  label: string
}

const Dropdown = (props: DropdownProps) => {
  const {
    className,
    items,
    selectedItem,
    onSetItem,
    label
  } = props

  const itemToString = option => (option ? option?.label : '');

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getLabelProps
  } = useSelect({
    items: items,
    itemToString,
    selectedItem,
    onSelectedItemChange: ({selectedItem: newSelectedItem}) =>
      onSetItem(newSelectedItem),
  })

  return (
    <div className={className}>
      <ScreenreaderOnlyLabel {...getLabelProps()}>{label}</ScreenreaderOnlyLabel>

      <Button
        {...getToggleButtonProps()}
      >
        <div>
          <span>{selectedItem ? itemToString(selectedItem) : label}</span>
        </div>
      </Button>

      <Menu
        isOpen={isOpen}
        {...getMenuProps()}
      >
        {isOpen && items.map((option, index) => (
          <ListItem
            hoveredItem={highlightedIndex === index}
            key={`${option?.label}${index}`}
            {...getItemProps({
              item: option,
              index
            })}
          >
            {option?.icon &&
              <span>
                *
              </span>
            }
            <span>{option?.label}</span>
          </ListItem>
        ))}
      </Menu>
    </div>
  );
}

interface ListItemProps {
  hoveredItem: boolean
}

const ListItem = styled.li<ListItemProps>`
  display: flex;
  align-items: baseline;
  padding: 0.5em;
  
  ${({ hoveredItem, theme }) => hoveredItem && `
    background: #DDD;
  `};
`;

interface MenuProps {
  isOpen: boolean
}

const Menu = styled.ul<MenuProps>`
  position: absolute;
  background: #FFFFFFFF;
  border-radius: 8px;
  list-style: none;
  overflow-y: auto;
  max-height: 30em;
  z-index: 2;
  overflow-x: hidden;
  margin-top: 0.5em;
  ${({ isOpen }) => !isOpen && 'display: none;'};

  border: ${({ isOpen }) => isOpen ? `1px solid #DDD}` : 'none'};

  &:focus {
    outline: none;
  }
`;

const ScreenreaderOnlyLabel = styled.label`
  position:absolute;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow: hidden;
`;

export default styled(Dropdown)`

`;
