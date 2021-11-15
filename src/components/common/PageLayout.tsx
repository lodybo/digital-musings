import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { useGhostSettings } from './hooks/ghostSettings';

import '../../styles/global.css';
import Header from '../Header';
import classNames from 'classnames';

type Props = {
  title?: string;
  contentIsPost?: boolean;
  children: ReactNode;
};

const PageLayout = ({
  title,
  children,
  contentIsPost = false,
}: Props): JSX.Element => {
  const { lang, codeinjection_styles, codeinjection_head, codeinjection_foot } =
    useGhostSettings();

  const triggerMailToLink = () => {
    window.open('mailto:hi@lodybo.nl', '_blank');
  };

  return (
    <>
      <Helmet>
        <html lang={lang || 'en'} />
        <style type="text/css">{`${codeinjection_styles}`}</style>
        <script defer data-domain="lodybo.com" src="/js/measurements.js" />
        {codeinjection_head}
        <body
          className="
            font-body
            bg-primary-light
            text-black
            flex
            flex-col
          "
        />
      </Helmet>

      {!contentIsPost && <Header title={title} />}

      <main className={classNames({ 'flex-auto': !contentIsPost })}>
        {children}
      </main>

      <footer
        className="
          flex-shrink-0
          flex
          flex-col
          justify-start
          sm:flex-row
          sm:justify-between
          bg-tertiary-light
          text-primary-dark
          p-10
          mt-10
        "
      >
        <p>
          Copyright {new Date().getFullYear()} Lody Borgers. All rights
          reserved.
        </p>

        <ul
          className="
            flex
            flex-col
            md:flex-row
            divide-y
            md:divide-y-0
            divide-x-0
            md:divide-x
            divide-tertiary-dark
            mt-5
            sm:mt-0
          "
        >
          <li key="twitter">
            <a
              className="
                inline-block
                mb-2.5
                md:mb-0
                mr-0
                md:mr-2.5
                text-primary-light
                hover:text-primary-dark
                border-primary-light
                hover:border-primary-dark
              "
              href="https://www.twitter.com/lodybo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow me on Twitter
            </a>
          </li>

          <li key="email">
            <a
              className="
                inline-block
                mb-2.5
                md:mb-0
                ml-0
                md:ml-2.5
                text-primary-light
                hover:text-primary-dark
                border-primary-light
                hover:border-primary-dark
              "
              href="#"
              onClick={triggerMailToLink}
            >
              Email me
            </a>
          </li>
        </ul>
      </footer>
      {codeinjection_foot}
    </>
  );
};

export default PageLayout;
