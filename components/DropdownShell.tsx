import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { Menu } from '@szhsin/react-menu';
import { menuSelector } from '@szhsin/react-menu/style-utils';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Button from './Button';

interface DropdownShellProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  label: string | React.ReactElement;
}

const DropdownShell = (props: DropdownShellProps) => {
  const { className, label, children } = props;

  return (
    <div className={className}>
      <Menu
        menuButton={<Button>{label}</Button>}
        arrow
        direction='bottom'
        align='start'
        position='anchor'
        setDownOverflow
        overflow='auto'
        transition
        boundingBoxPadding='20'
        key='select'
      >
        {children}
      </Menu>
    </div>
  );
};

export default styled(DropdownShell)`
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
