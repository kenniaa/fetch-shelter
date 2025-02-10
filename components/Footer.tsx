import * as React from 'react';
import styled from 'styled-components';

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
}

const Footer = (props: FooterProps) => {
  const {
    className,
  } = props;

  return (
    <footer className={className}>

    </footer>
  );
}

export default styled(Footer)`
  display: flex;
  padding: 1em;
  background: #212121;
  max-height: 160px;
  width: 100%;
  flex-shrink: 0;
`;
