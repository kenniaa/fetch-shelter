import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { useContext } from 'react';
import { ErrorsContext } from '../contexts/ErrorContext';

interface PageProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Page = (props: PageProps) => {
  const errorContext = useContext(ErrorsContext);

  const { ErrorNotification } = errorContext;

  const { className, children } = props;

  return (
    <Article>
      <Header />

      <section className={className}>
        <ErrorNotification />

        {children}
      </section>

      <Footer />
    </Article>
  );
};

const Article = styled.article`
  display: flex;
  flex-direction: column;
  line-height: 24px;
  min-height: 100vh;
  align-items: stretch;
`;

export default styled(Page)`
  padding: 1rem;
  line-height: 24px;
  flex-grow: 1;
  background: #181818;
  width: calc(100% - 2rem);
  max-width: 1240px;
  margin: 0 auto;
`;
