import { useStaticQuery, graphql } from 'gatsby';

export interface GhostSettingsNavigationField {
  label: string;
  url: string;
}

export interface GhostSettingsFields {
  title: string | null;
  description: string | null;
  logo: string | null;
  icon: string | null;
  cover_image: string | null;
  facebook: string | null;
  twitter: string | null;
  lang: string | null;
  timezone: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  codeinjection_styles: string | null;
  navigation: GhostSettingsNavigationField[];
}

export const useGhostSettings = (): GhostSettingsFields => {
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
