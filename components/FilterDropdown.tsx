import * as React from 'react';
import styled from 'styled-components';
import {
  Menu,
  MenuItem,
  MenuGroup,
  ClickEvent,
  MenuChangeEvent,
} from '@szhsin/react-menu';
import {
  menuSelector,
  menuItemSelector,
  menuDividerSelector,
  menuHeaderSelector,
  menuContainerSelector,
} from '@szhsin/react-menu/style-utils';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FaTimes } from 'react-icons/fa';

import Input from './Input';
import Button from './Button';
import useInput from '../hooks/useInput';
import { useMemo } from 'react';

interface FilterDropdownProps extends React.HTMLAttributes<HTMLElement> {
  options: string[];
  onOptionSelect: (option: string) => void;
  label: string | React.ReactElement;
  filterPlaceholder?: string;
  selectedOptions: string[];
  onRemoveOption: (option: string) => void;
  onSearch: () => void;
}

const FilterDropdown = (props: FilterDropdownProps) => {
  const filterInput = useInput('');

  const {
    className,
    options,
    onOptionSelect,
    label,
    filterPlaceholder,
    selectedOptions,
    onRemoveOption,
    onSearch,
  } = props;

  // const isOptionSelected = (option: string) => selectedOptions.includes(option)

  const filteredItems = useMemo(() => {
    return options.filter((item) => {
      return (
        !selectedOptions.includes(item) &&
        item.toLowerCase().includes(filterInput.value.toLowerCase())
      );
    });
  }, [options, selectedOptions, filterInput.value]);

  return (
    <div className={className}>
      <Menu
        menuButton={<Button>{label}</Button>}
        key='filter-multi-select'
        arrow
        direction='bottom'
        align='start'
        position='anchor'
        setDownOverflow
        overflow='auto'
        transition
        boundingBoxPadding='20'
        onMenuChange={(e: MenuChangeEvent) =>
          e.open && filterInput.onInputChange('')
        }
      >
        {!!selectedOptions.length && (
          <SelectedItems>
            {selectedOptions.map((option, index) => (
              <Item key={`${option}-${index}`}>
                {option}

                <Button bare onClick={() => onRemoveOption(option)}>
                  <FaTimes />
                </Button>
              </Item>
            ))}
          </SelectedItems>
        )}

        <FilterBar>
          <Input
            hideLabel
            label='Filter by breed'
            name='filter'
            id='filter-input'
            type='text'
            placeholder={
              filterPlaceholder ? filterPlaceholder : 'Type to filter'
            }
            {...filterInput}
          />

          <Button primary onClick={() => onSearch()}>
            Search
          </Button>
        </FilterBar>

        <MenuGroup takeOverflow>
          {filteredItems.map((option: string, index: number) => (
            <MenuItem
              onClick={(e: ClickEvent) => {
                e.stopPropagation = true;
                onOptionSelect(option);
                e.keepOpen = true;
              }}
              key={`${option}-${index}`}
            >
              {option}
            </MenuItem>
          ))}
        </MenuGroup>
      </Menu>
    </div>
  );
};

const FilterBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  grid-gap: 0.5rem;
`;

const Item = styled.div`
  background: #424242;
  color: #fff;
  padding: 4px 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  grid-gap: 4px;
`;

const SelectedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
  font-size: 14px;
`;

const StyledDropdown = styled(FilterDropdown)`
  position: relative;
  width: 100%;

  ${menuContainerSelector?.name} {
    width: 100%;
  }

  ${menuSelector?.name} {
    position: absolute;
    box-sizing: border-box;
    z-index: 100;
    list-style: none;
    user-select: none;
    height: auto;
    color: inherit;
    min-height: 50px;
    border-radius: 6px;
    min-width: 10rem;
    box-shadow: none;
    padding: 0.5rem;
    width: 450px;
    font-size: 16px;
    background: #212121;
    border: 1px solid #555;

    @media screen and (max-width: 500px) {
      width: 350px;
    }

    @media screen and (max-width: 375px) {
      width: 250px;
    }
  }

  ${menuItemSelector.name} {
    font-weight: 400;
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 6px;
    width: 100%;
    text-decoration: none;
    word-break: break-word;
    display: flex;
    align-items: center;
  }

  ${menuItemSelector.hover} {
    text-decoration: none;
    background: #333333;
    outline: none;
  }

  ${menuItemSelector.focusable} {
    &:hover {
      background: unset !important;
    }

    a {
      display: block;
      text-decoration: none;

      &:focus {
        outline: none;
      }
    }
  }

  ${menuHeaderSelector?.name} {
    color: #666666;
    font-size: 13px;
    padding: 5px 6px;
    text-transform: uppercase;
  }

  ${menuDividerSelector.name} {
    height: 1px;
    margin: 5px 6px;
    background: #ddd;
  }

  .szh-menu__arrow {
    display: block;
    position: absolute;
    left: 80px;
    top: -0.375rem;
    -webkit-transform: translateX(-50%) rotate(45deg);
    transform: translateX(-50%) rotate(45deg);
    box-sizing: border-box;
    width: 0.75rem;
    height: 0.75rem;
    background: #212121;
    border-color: #555555 transparent transparent #555555;
    border-style: solid;
    border-width: 1px;
    z-index: -1;
  }
`;

export default StyledDropdown;
