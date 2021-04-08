import React from 'react';
import { PageLayout } from '../components/common';
import { useGhostAuthor } from '../components/common/hooks/ghostAuthor';

const indexPage = (): JSX.Element => {
  const { name, profile_image } = useGhostAuthor();

  return (
    <PageLayout title="Hello">
      <div
        className="
          flex
          flex-col
        "
      >
        <h1>I am Lody</h1>

        {profile_image && <img src={profile_image} alt={name} />}
      </div>
    </PageLayout>
  );
};

export default indexPage;
