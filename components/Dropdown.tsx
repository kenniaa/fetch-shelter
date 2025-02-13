import * as React from 'react';
import styled from 'styled-components';
import { useSelect } from 'downshift';
import Button from './Button';

interface ItemObject {
  label: string;
  value: string;
}

interface DropdownProps extends React.HTMLAttributes<HTMLElement> {
  items: ItemObject[];
  selectedItem: ItemObject;
  onSetItem: (newSelectedItem: ItemObject) => void;
  label: string;
}

const Dropdown = (props: DropdownProps) => {
  const { className, items, selectedItem, onSetItem, label } = props;

  const itemToString = (option) => (option ? option?.label : '');

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getLabelProps,
  } = useSelect({
    items: items,
    itemToString,
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      onSetItem(newSelectedItem),
  });

  return (
    <div className={className}>
      <ScreenreaderOnlyLabel {...getLabelProps()}>
        {label}
      </ScreenreaderOnlyLabel>

      <div>
        <Button {...getToggleButtonProps()}>
          <div>
            {selectedItem ? `Sort by: ${itemToString(selectedItem)}` : label}
          </div>
        </Button>

        <Menu isOpen={isOpen} {...getMenuProps()}>
          {isOpen &&
            items.map((option, index) => (
              <ListItem
                isHighlighted={highlightedIndex === index}
                key={`${option?.label}${index}`}
                {...getItemProps({
                  item: option,
                  index,
                })}
              >
                <span>{option?.label}</span>
              </ListItem>
            ))}
        </Menu>
      </div>
    </div>
  );
};

interface ListItemProps {
  isHighlighted: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 0.5rem;
  width: 100%;
  color: #ddd;

  ${({ isHighlighted }) =>
    isHighlighted &&
    `
    background: #333333;
  `};
`;

interface MenuProps {
  isOpen: boolean;
}

const Menu = styled.ul<MenuProps>`
  position: absolute;
  background: #212121;
  border-radius: 8px;
  border: 1px solid #555;
  overflow-y: auto;
  z-index: 99;
  overflow-x: hidden;
  width: 100%;
  margin-top: 0.5rem;
  ${({ isOpen }) => !isOpen && 'display: none;'};

  &:focus {
    outline: none;
  }
`;

const ScreenreaderOnlyLabel = styled.label`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export default styled(Dropdown)`
  position: relative;
`;
