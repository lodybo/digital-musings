import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import ImageMeta from './ImageMeta';
import { resolve } from '../../../utils/url-resolve';
import config from '../../../utils/siteConfig';
import { PostOrPage, Tag } from '@tryghost/content-api';
import { useGhostSettings } from '../hooks/ghostSettings';

type Props = {
  data: PostOrPage | Tag | Record<string, string>;
  canonical: string;
  title?: string;
  description?: string;
  image?: string | null;
  type: 'WebSite' | 'Series';
};

const WebsiteMeta = ({
  data,
  canonical,
  title,
  description,
  image,
  type,
}: Props): JSX.Element => {
  const settings = useGhostSettings();

  const publisherLogo = resolve(
    config.siteUrl,
    settings.logo || config.siteIcon
  );
  let shareImage =
    image || data.feature_image || _.get(settings, 'cover_image', null);

  shareImage = shareImage ? resolve(config.siteUrl, shareImage) : null;

  description =
    description ||
    data.meta_description ||
    (data as Tag).description ||
    config.siteDescriptionMeta ||
    settings.description;
  title = `${
    title || data.meta_title || (data as Tag).name || (data as PostOrPage).title
  } - ${settings.title}`;

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': type,
    url: canonical,
    image: shareImage
      ? /* eslint-disable indent */
        {
          '@type': 'ImageObject',
          url: shareImage,
          width: config.shareImageWidth,
          height: config.shareImageHeight,
        }
      : undefined,
    /* eslint-enable indent */
    publisher: {
      '@type': 'Organization',
      name: settings.title,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
        width: 60,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.siteUrl,
    },
    description,
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={settings.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {settings.twitter && (
          <meta
            name="twitter:site"
            content={`https://twitter.com/${settings.twitter.replace(
              /^@/,
              ''
            )}/`}
          />
        )}
        {settings.twitter && (
          <meta name="twitter:creator" content={settings.twitter} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
      <ImageMeta image={shareImage || ''} />
    </>
  );
};

export default WebsiteMeta;
