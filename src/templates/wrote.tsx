import React from 'react';
import { graphql } from 'gatsby';

import { PageLayout, Pagination } from '../components/common';
import PostCard from '../components/PostCard';
import { MetaData } from '../components/common/meta';
import { PostOrPage } from '@tryghost/content-api';
import { PaginationContext } from '../components/common/Pagination';
import { useGhostSettings } from '../components/common/hooks/ghostSettings';

type Props = {
  data: {
    allGhostPost: {
      edges: Array<{
        node: PostOrPage;
      }>;
    };
  };
  location: {
    pathname: string;
  };
  pageContext: PaginationContext;
};

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.ts under `postsPerPage`.
 *
 */
const Wrote = ({ data, location, pageContext }: Props): JSX.Element => {
  const { title } = useGhostSettings();
  const posts = data.allGhostPost.edges;

  return (
    <>
      <MetaData location={location} />
      <PageLayout title={title || ''}>
        <div
          className="
            p-10
          "
        >
          <section
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
            "
          >
            {posts.map(({ node }) => (
              // The tag below includes the markup for each post - components/common/PostCard.tsx
              <PostCard key={node.id} post={node} />
            ))}
          </section>

          <Pagination pageContext={pageContext} />
        </div>
      </PageLayout>
    </>
  );
};

export default Wrote;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
