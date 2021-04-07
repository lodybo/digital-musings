import React from 'react';
import { graphql } from 'gatsby';
import { PostOrPage, Tag as GhostTag } from '@tryghost/content-api';

import { Pagination, PageLayout } from '../components/common';
import { MetaData } from '../components/common/meta';
import PostCard from '../components/PostCard';
import { PaginationContext } from '../components/common/Pagination';

type Props = {
  data: {
    ghostTag: GhostTag;
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
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const Tag = ({ data, location, pageContext }: Props): JSX.Element => {
  const tag = data.ghostTag;
  const posts = data.allGhostPost.edges;

  return (
    <>
      <MetaData data={tag} location={location} />
      <PageLayout title={tag.name || ''}>
        <div>
          <header
            className="
              py-2.5
              px-10
              text-lg
              sm:text-xl
              md:text-2xl
            "
          >
            {tag.description ? <p>{tag.description}</p> : null}
          </header>
          <section>
            {posts.map(({ node }) => (
              <PostCard key={node.id} post={node} />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </PageLayout>
    </>
  );
};

export default Tag;

export const pageQuery = graphql`
  query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostTag(slug: { eq: $slug }) {
      ...GhostTagFields
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
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
