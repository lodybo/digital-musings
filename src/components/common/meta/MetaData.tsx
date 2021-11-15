import React from 'react';

import { resolve } from '../../../utils/url-resolve';
import config from '../../../utils/siteConfig';
import ArticleMeta from './ArticleMeta';
import WebsiteMeta from './WebsiteMeta';
import AuthorMeta from './AuthorMeta';
import { Author, GhostData, PostOrPage, Tag } from '@tryghost/content-api';
import { useGhostSettings } from '../hooks/ghostSettings';

const dataIsPost = (data: GhostData | undefined): data is PostOrPage =>
  data
    ? Object.prototype.hasOwnProperty.call(data, 'created_at') &&
      !(data as PostOrPage).page
    : false;

const dataIsPage = (data: GhostData | undefined): data is PostOrPage =>
  data
    ? Object.prototype.hasOwnProperty.call(data, 'created_at') &&
      (data as PostOrPage).page !== undefined &&
      (data as PostOrPage).page === true
    : false;

const dataIsTag = (data: GhostData | undefined): data is Tag =>
  data ? Object.prototype.hasOwnProperty.call(data, 'name') : false;

const dataIsAuthor = (data: GhostData | undefined): data is Author =>
  data ? Object.prototype.hasOwnProperty.call(data, 'bio') : false;

type Props = {
  data?: GhostData;
  location: {
    pathname: string;
  };
  title?: string;
  description?: string;
  image?: string | null;
};

/**
 * MetaData will generate all relevant meta data information incl.
 * JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
 *
 */
const MetaData = ({
  data,
  title,
  description,
  image,
  location,
}: Props): JSX.Element => {
  const canonical = resolve(config.siteUrl, location.pathname);
  const settings = useGhostSettings();

  if (dataIsPost(data)) {
    return <ArticleMeta data={data} canonical={canonical} />;
  } else if (dataIsTag(data)) {
    return <WebsiteMeta data={data} canonical={canonical} type="Series" />;
  } else if (dataIsAuthor(data)) {
    return <AuthorMeta data={data} canonical={canonical} />;
  } else if (dataIsPage(data)) {
    return <WebsiteMeta data={data} canonical={canonical} type="WebSite" />;
  } else {
    title = title || config.siteTitleMeta || settings.title;
    description =
      description || config.siteDescriptionMeta || settings.description;
    image = image || settings.cover_image || null;

    image = image ? resolve(config.siteUrl, image) : null;

    return (
      <WebsiteMeta
        data={{}}
        canonical={canonical}
        title={title}
        description={description}
        image={image}
        type="WebSite"
      />
    );
  }
};

export default MetaData;
