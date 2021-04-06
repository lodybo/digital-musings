import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { useGhostSettings } from './hooks/ghostSettings';

import '../../styles/global.css';

type Props = {
  children: ReactNode;
};

const PostLayout = ({ children }: Props): JSX.Element => {
  const {
    lang,
    codeinjection_styles,
    codeinjection_head,
    codeinjection_foot,
  } = useGhostSettings();

  return (
    <>
      <Helmet>
        <html lang={lang || 'en'} />
        <style type="text/css">{`${codeinjection_styles}`}</style>
        {codeinjection_head}
        <body
          className="
            font-body
            bg-primary-light
            text-black
          "
        />
      </Helmet>

      <main>{children}</main>

      <footer
        className="
          bg-tertiary-light
          text-primary-dark
          p-10
          mt-10
        "
      >
        {codeinjection_foot}
        <p>
          Copyright {new Date().getFullYear()} Lody Borgers. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};

export default PostLayout;
