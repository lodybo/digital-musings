import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import { MetaData } from '../components/common/meta';
import { PageLayout } from '../components/common';
import { PostOrPage } from '@tryghost/content-api';

type Props = {
  data: {
    ghostPage: PostOrPage;
  };
  location: {
    pathname: string;
  };
};

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location }: Props): JSX.Element => {
  const page = data.ghostPage;

  return (
    <>
      <MetaData data={page} title="What I wrote | Lodybo" location={location} />
      <Helmet>
        <style type="text/css">{`${page.codeinjection_styles}`}</style>
      </Helmet>
      <PageLayout title={'Blog'}>
        <div className="container">
          <article className="content">
            <h1 className="content-title">{page.title}</h1>

            {/* The main page content */}
            <section
              className="content-body load-external-scripts"
              dangerouslySetInnerHTML={{ __html: page.html || '' }}
            />
          </article>
        </div>
      </PageLayout>
    </>
  );
};

export default Page;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
