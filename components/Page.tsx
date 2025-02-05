import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

interface PageProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Page = (props: PageProps) => {
  const {
    className,
    children
  } = props;

  return (
    <article>
      <Header/>

      <section className={className}>
        {children}
      </section>

      <Footer/>
    </article>
  );
}

export default styled(Page)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 1rem;
  max-width: 1250px;
  color: #333;
  line-height: 24px;
`;
