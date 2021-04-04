import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { PageLayout, Pagination } from '../components/common';
import PostCard from '../components/PostCard';
import { MetaData } from '../components/common/meta';

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.ts under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
  const posts = data.allGhostPost.edges;

  return (
    <>
      <MetaData location={location} />
      <PageLayout>
        <div
          className="
            p-10
          "
        >
          <section
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
            "
          >
            {posts.map(({ node }) => (
              // The tag below includes the markup for each post - components/common/PostCard.tsx
              <PostCard key={node.id} post={node} />
            ))}

            <Pagination pageContext={pageContext} />
          </section>
        </div>
      </PageLayout>
    </>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
};

export default Index;

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