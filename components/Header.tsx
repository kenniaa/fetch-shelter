import * as React from 'react';
import styled from 'styled-components';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
}

const Header = (props: HeaderProps) => {
  const {
    className,
  } = props;

  return (
    <header className={className}>
      header
    </header>
  );
}

export default styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1em;
  background: palevioletred;
  max-height: 160px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);


`;
