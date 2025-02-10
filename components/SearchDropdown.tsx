import * as React from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useMemo } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import Input from './Input';

interface SearchDropdownProps extends React.HTMLAttributes<HTMLElement> {
  items: string[];
  label: string,
  selectedItems: string[],
  onSetSelectedItems: (newItems) => void,
}

const SearchDropdown = (props: SearchDropdownProps) => {
  const searchInput = useInput('');
  const {
    className,
    items,
    label,
    selectedItems,
    onSetSelectedItems
  } = props;

  const handleSelectedItem = (selectedItem: string) => {
    onSetSelectedItems([...selectedItems, selectedItem]);
  }

  const {
    getDropdownProps,
  } = useMultipleSelection({
    selectedItems,
  });

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return !selectedItems.includes(item) && item.toLowerCase().includes(searchInput.value.toLowerCase());
    });
  }, [items, selectedItems, searchInput.value])

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items: filteredItems,
    itemToString(item) {
      return item ? item : ''
    },
    defaultHighlightedIndex: 0,
    selectedItem: null,
    inputValue: searchInput.value,
    stateReducer(state, actionAndChanges) {
      const {changes, type} = actionAndChanges

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: 0,
          }
        default:
          return changes
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            handleSelectedItem(newSelectedItem)
            searchInput.onInputChange('')
          }

          break
        case useCombobox.stateChangeTypes.InputChange:
          searchInput.onInputChange(newInputValue)
          break
        default:
          break
      }
    },
  })

  return (
    <div className={className}>
      <ScreenreaderOnlyLabel {...getLabelProps()}>{label}</ScreenreaderOnlyLabel>

      <div>
        <Input
          hideLabel
          type='text'
          name='search_dropdown'
          label='Search dropdown'
          placeholder='Enter a breed, e.g. "Pomeranian"'
          {...searchInput}
          {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
        />

        {isOpen &&
          <List
            showList={isOpen && !!filteredItems.length}
            {...getMenuProps()}
          >
            {filteredItems.map((item, index) => (
              <ListItem
                isHighlighted={index === highlightedIndex}
                isSelected={item === selectedItem}
                key={`${item}-${index}`}
                {...getItemProps({item, index})}
              >
                {item}
              </ListItem>
            ))}
          </List>
        }
      </div>
    </div>
  );
}

interface ListItemProps {
  isHighlighted: boolean,
  isSelected: boolean,
}

const ListItem = styled.li<ListItemProps>`
  padding: 0.5em;
  width: 100%;
  color: #DDD;

  ${({ isHighlighted }) => isHighlighted && `
    background: #333333;
  `};
`;

interface ListProps {
  showList: boolean,
}
const List = styled.ul<ListProps>`
  position: absolute;
  display: block;
  background: #212121;
  border-radius: 8px;
  border: 1px solid #555;
  list-style: none;
  top: 100%;
  width: 100%;
  overflow-y: auto;
  max-height: 30em;
  overflow-x: hidden;
  margin-top: 0.5em;
  z-index: 99;
  ${props => !props.showList && 'display: hidden'}
`;

const ScreenreaderOnlyLabel = styled.label`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export default styled(SearchDropdown)`
  position: relative;
  display: block;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
`;
