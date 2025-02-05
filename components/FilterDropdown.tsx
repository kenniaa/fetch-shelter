import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {Menu, MenuItem, MenuGroup, FocusableItem, ClickEvent, MenuChangeEvent} from '@szhsin/react-menu';
import {
  menuSelector,
  menuItemSelector,
  menuDividerSelector,
  menuHeaderSelector,
  menuContainerSelector,
} from '@szhsin/react-menu/style-utils';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FaCheck } from "react-icons/fa";

import Input from './Input';

interface FilterDropdownProps extends React.HTMLAttributes<HTMLElement>  {
  options: string[],
  onOptionSelect: (option: string) => void,
  buttonLabel: string,
  isOptionSelected?: (option: string) => boolean,
  filterPlaceholder?: string,
}

const FilterDropdown = (props: FilterDropdownProps) => {
  const [filter, setFilter] = useState('');

  const {
    className,
    options,
    onOptionSelect,
    buttonLabel,
    isOptionSelected,
    filterPlaceholder,
  } = props;

  return (
    <div className={className}>
      <Menu
        menuButton={
          <DropdownButton>
            <Label>
              {buttonLabel}
            </Label>
          </DropdownButton>
        }
        key='filter-multi-select'
        direction='bottom'
        align='start'
        position='auto'
        setDownOverflow
        overflow='auto'
        boundingBoxPadding='20'
        transition
        onMenuChange={(e: MenuChangeEvent) => e.open && setFilter('')}
      >
        <FocusableItem>
          {({ ref }) => (
            <Input
              hideLabel
              label='Filter by breed'
              name='filter'
              ref={ref}
              id='filter-input'
              type='text'
              placeholder={filterPlaceholder ? filterPlaceholder : 'Type to filter'}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
        </FocusableItem>

        <MenuGroup takeOverflow>
          {options.filter((option: string) => option.toUpperCase().includes(filter.trim().toUpperCase()))
            .map((option: string, index: number) => (
              <MenuItem
                onClick={(e: ClickEvent) => {
                  e.stopPropagation = true;
                  onOptionSelect(option);
                  e.keepOpen = true;
                }}
                key={`${option}-${index}`}
              >
                {!!isOptionSelected &&
                  <Check checked={isOptionSelected(option)}>
                    {isOptionSelected(option) &&
                      <FaCheck fill='White' />
                    }
                  </Check>
                }

                {option}
              </MenuItem>
            ))}
        </MenuGroup>
      </Menu>
    </div>
  )
}

const DropdownButton = styled.button`
  max-width: 100%;
  margin: 0.45em 0;
  font-size: 15px;
  font-weight: 400;
  padding: 0.55em 1em;
  background-color: #f0f0f0;
  border: 1px solid transparent;
  border-radius: 8px !important;
  font-family: 'Fira Sans', sans-serif;
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CheckProps {
  checked?: boolean,
  disabled?: boolean
}

const Check = styled.span<CheckProps>`
  width: 1em;
  height: 1em;
  border-radius: 3px;
  border: 1px solid ${props => props.checked ? `#413d87 !important` : '#cccccc' };
  border: 1px solid ${props => props.disabled ? `#CCC !important` : '#cccccc' };
  background-color: ${props => props.checked ? `#413d87 !important` : '#ffffff' };
  background-color: ${props => props.disabled ? `#CCC !important` : '#ffffff' };
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5em;
`;

const Label = styled.div`
  width: 100%;
  text-align: left;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
`;

const StyledDropdown = styled(FilterDropdown)`
  position: relative;
  width: 100%;

  ${menuContainerSelector?.name} {
    width: 100%;
  }

  ${menuSelector?.name} {
    box-sizing: border-box;
    z-index: 100;
    list-style: none;
    user-select: none;
    padding: 4px;
    height: max-content;
    max-height: 400px;
    overflow-y: auto;
    font-size: 15px;
    border: 1px solid #DDD;
    border-radius: 6px;
    min-width: 10em;
    width: 100%;
    background: #f7f8fa;
  }

  a {
    &:hover {
      filter: unset;
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
    text-decoration: none !important;
    background: #DDD;
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
    background: #DDD;
  }
`;

export default StyledDropdown;
