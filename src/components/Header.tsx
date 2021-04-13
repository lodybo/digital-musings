import React from 'react';
import { Navigation } from './common';
import { useGhostSettings } from './common/hooks/ghostSettings';

type Props = {
  title?: string;
};

const Header = ({ title }: Props): JSX.Element => {
  const { navigation } = useGhostSettings();

  return (
    <>
      <Navigation navigation={navigation} />

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
      </div>
    </>
  );
};

export default Header;
