import _ from 'lodash';
import { Author } from '@tryghost/content-api';

type AuthorProperties = {
  name: string | null;
  sameAsArray: string | null;
  image: string | null;
  facebookUrl: string | null;
};

export const getAuthorProperties = ({
  website,
  twitter,
  facebook,
  name,
  profile_image,
}: Author): AuthorProperties => {
  let authorProfiles = [];

  authorProfiles.push(
    website ? website : null,
    twitter ? `https://twitter.com/${twitter.replace(/^@/, '')}/` : null,
    facebook ? `https://www.facebook.com/${facebook.replace(/^\//, '')}/` : null
  );

  authorProfiles = _.compact(authorProfiles);

  return {
    name: name || null,
    sameAsArray: authorProfiles.length
      ? `["${_.join(authorProfiles, '", "')}"]`
      : null,
    image: profile_image || null,
    facebookUrl: facebook
      ? `https://www.facebook.com/${facebook.replace(/^\//, '')}/`
      : null,
  };
};

export default getAuthorProperties;
