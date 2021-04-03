import React from 'react';
import { useGhostSettings } from './common/hooks/ghostSettings';
// import { Navigation } from './common';

const Header = () => {
  const { title } = useGhostSettings();

  return (
    <div
      className="
        p-10
      "
    >
      <h1
        className="
          text-5xl
        "
      >
        {title}
      </h1>
      {/*<Navigation data={navigation} navClass={'site-navi'} />*/}
    </div>
  );
};

export default Header;
