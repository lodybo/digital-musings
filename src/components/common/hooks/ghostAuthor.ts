import { Author } from '@tryghost/content-api';
import { graphql, useStaticQuery } from 'gatsby';

export const useGhostAuthor = (): Author => {
  const { author } = useStaticQuery(
    graphql`
      query {
        author: ghostAuthor {
          ...GhostAuthorFields
        }
      }
    `
  );

  return author;
};
