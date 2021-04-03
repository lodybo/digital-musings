import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { useGhostSettings } from './hooks/ghostSettings';

import '../../styles/global.css';
import Header from '../Header';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props): JSX.Element => {
  const { lang, codeinjection_styles } = useGhostSettings();

  return (
    <>
      <Helmet>
        <html lang={lang || 'en'} />
        <style type="text/css">{`${codeinjection_styles}`}</style>
        <body
          className="
            font-body
            bg-primary-light
            text-black
          "
        />
      </Helmet>

      <Header />

      <main>{children}</main>
    </>
  );
};

export default PageLayout;
