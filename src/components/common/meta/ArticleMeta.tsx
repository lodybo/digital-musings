import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import url from 'url';

import getAuthorProperties from './getAuthorProperties';
import ImageMeta from './ImageMeta';
import config from '../../../utils/siteConfig';
import { PostOrPage, Tag } from '@tryghost/content-api';
import { useGhostSettings } from '../hooks/ghostSettings';
import { tags as tagsHelper } from '@tryghost/helpers';

type Props = {
  data: PostOrPage;
  canonical: string;
};

const ArticleMetaGhost = ({ data, canonical }: Props): JSX.Element => {
  const ghostPost = data;
  const settings = useGhostSettings();

  const author = getAuthorProperties(ghostPost.primary_author);
  const publicTags = _.map(
    tagsHelper(ghostPost, { visibility: 'public', fn: (tag: Tag) => tag }),
    'name'
  );
  const primaryTag = publicTags[0] || '';
  const shareImage = ghostPost.feature_image
    ? ghostPost.feature_image
    : _.get(settings, 'cover_image', null);
  const publisherLogo =
    settings.logo || config.siteIcon
      ? url.resolve(config.siteUrl, settings.logo || config.siteIcon)
      : null;

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Article',
    author: {
      '@type': 'Person',
      name: author.name,
      image: author.image ? author.image : undefined,
      sameAs: author.sameAsArray ? author.sameAsArray : undefined,
    },
    keywords: publicTags.length ? publicTags.join(', ') : undefined,
    headline: ghostPost.meta_title || ghostPost.title,
    url: canonical,
    datePublished: ghostPost.published_at,
    dateModified: ghostPost.updated_at,
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
    description: ghostPost.meta_description || ghostPost.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.siteUrl,
    },
  };

  return (
    <>
      <Helmet>
        <title>{ghostPost.meta_title || ghostPost.title}</title>
        <meta
          name="description"
          content={ghostPost.meta_description || ghostPost.excerpt}
        />
        <link rel="canonical" href={canonical} />

        <meta property="og:site_name" content={settings.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={
            ghostPost.og_title || ghostPost.meta_title || ghostPost.title
          }
        />
        <meta
          property="og:description"
          content={
            ghostPost.og_description ||
            ghostPost.excerpt ||
            ghostPost.meta_description ||
            undefined
          }
        />
        <meta property="og:url" content={canonical} />
        <meta
          property="article:published_time"
          content={ghostPost.published_at || undefined}
        />
        <meta
          property="article:modified_time"
          content={ghostPost.updated_at || undefined}
        />
        {publicTags.map((keyword, i) => (
          <meta property="article:tag" content={keyword} key={i} />
        ))}
        {author.facebookUrl && (
          <meta property="article:author" content={author.facebookUrl} />
        )}

        <meta
          name="twitter:title"
          content={
            ghostPost.twitter_title || ghostPost.meta_title || ghostPost.title
          }
        />
        <meta
          name="twitter:description"
          content={
            ghostPost.twitter_description ||
            ghostPost.excerpt ||
            ghostPost.meta_description ||
            undefined
          }
        />
        <meta name="twitter:url" content={canonical} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={author.name} />
        {primaryTag && <meta name="twitter:label2" content="Filed under" />}
        {primaryTag && <meta name="twitter:data2" content={primaryTag} />}

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
      <ImageMeta image={shareImage} />
    </>
  );
};

export default ArticleMetaGhost;
