import { Author } from '@tryghost/content-api';
import { graphql, useStaticQuery } from 'gatsby';

export const useGhostAuthor = (): Author => {
  const { authors } = useStaticQuery(
    graphql`
      query {
        authors: allGhostAuthor(filter: { name: { eq: "Lody Borgers" } }) {
          edges {
            node {
              ...GhostAuthorFields
            }
          }
        }
      }
    `
  );

  return authors.edges[0].node;
};
