import { useStaticQuery, graphql } from 'gatsby';
import { Settings } from '@tryghost/content-api';

export const useGhostSettings = (): Settings => {
  const { settings } = useStaticQuery(
    graphql`
      query {
        settings: ghostSettings {
          ...GhostSettingsFields
        }
      }
    `
  );

  return settings;
};
