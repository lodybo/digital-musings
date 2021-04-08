import React from 'react';
// import { Navigation } from './common';

type Props = {
  title?: string;
};

const Header = ({ title }: Props): JSX.Element => (
  <div
    className="
      p-10
    "
  >
    {!!title && (
      <h1
        className="
            text-5xl
          "
      >
        {title}
      </h1>
    )}
    {/*<Navigation data={navigation} navClass={'site-navi'} />*/}
  </div>
);

export default Header;
