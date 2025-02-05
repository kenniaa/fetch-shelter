import * as React from 'react';
import styled from 'styled-components';
import useInput from "../hooks/useInput";
import {useMemo, useState} from "react";
import {useCombobox, useMultipleSelection} from "downshift";
import Input from "./Input";
import Button from "./Button";

interface SearchDropdownProps extends React.HTMLAttributes<HTMLElement> {
  items: string[];
  label: string,
}

const SearchDropdown = (props: SearchDropdownProps) => {
  const searchInput = useInput('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredItems = useMemo(() => getFilteredItems(selectedItems, searchInput.value), [selectedItems, searchInput.value],)

  const {
    className,
    items,
    label,
  } = props;

  const getFilteredItems = (selectedItems: string[], searchInput: string)=> {
    const lowerCasedInputValue = searchInput.toLowerCase()

    return items.filter(function filterBook(item) {
      return (!selectedItems.includes(item) && item.toLowerCase().includes(lowerCasedInputValue))
    })
  }

  const {
    getSelectedItemProps,
    getDropdownProps,
    removeSelectedItem
  } = useMultipleSelection({
    selectedItems,
    onStateChange({selectedItems: newSelectedItems, type}) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems)
          break
        default:
          break
      }
    },
  });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items,
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
            setSelectedItems([...selectedItems, newSelectedItem])
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
        {selectedItems.map((item, index) => (
          <span {...getSelectedItemProps({selectedItem: item, index})}>
            {item}
            <span
              onClick={e => {
                e.stopPropagation()
                removeSelectedItem(item)
              }}
            >
              &#10005;
            </span>
          </span>
        ))}

        <div>
          <Input
            type='text'
            name='name'
            label='Name'
            placeholder='Enter a breed, e.g. "Bichon Frise"'
            {...searchInput}
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
        </div>

        {isOpen &&
          <List {...getMenuProps()}>
            {filteredItems.map((item, index) => (
              <ListItem
                key={`${item}-${index}`}

              >

              </ListItem>
            ))}
          </List>
        }
      </div>
    </div>
  );
}

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1em 1fr;
  grid-gap: 0.5em;
  align-items: center;
  padding: 0.5em;
`;

const List = styled.ul`
    position: absolute;
    background: #FFFFFF;
    border-radius: 8px;
    list-style: none;
    top: 101%;
    bottom: unset;
    overflow-y: auto;
    max-height: 30em;
    overflow-x: hidden;
    margin-top: 0;
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

export default styled(SearchDropdown)`
  position: relative;
  display: block;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #DDD;
  color: #333;
  background: grey;
  cursor: pointer;

  &:focus-within, &:hover {
    outline: 1px dashed purple;
    outline-offset: 3px;
  }
`;
