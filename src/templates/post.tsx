import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Prism from 'prismjs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import reframe from 'reframe.js';

import { PostLayout } from '../components/common';
import { MetaData } from '../components/common/meta';
import { PostOrPage } from '@tryghost/content-api';
import PostMeta from '../components/PostMeta';

import '../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';

/**
 * Todo: Check if images in a post are processed via Gatsby.
 * Also refactor to new image plugin: https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image
 */

type Props = {
  data: {
    ghostPost: PostOrPage;
  };
  location: {
    pathname: string;
  };
};

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }: Props): JSX.Element => {
  const post = data.ghostPost;

  useEffect(() => {
    reframe('iframe');

    const images = document.querySelectorAll<HTMLImageElement>(
      '.kg-gallery-image img'
    );
    if (images.length) {
      images.forEach(function (image) {
        const container = image.closest('.kg-gallery-image') as HTMLDivElement;
        if (container) {
          const width = image.width;
          const height = image.height;
          const ratio = width / height;
          container.style.flex = ratio + ' 1 0%';
        }
      });
    }

    document.querySelectorAll('pre[class*=language-]').forEach(function (node) {
      node.classList.add('line-numbers');
    });
    setTimeout(Prism.highlightAll);
  });

  return (
    <>
      <MetaData data={post} location={location} />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <PostLayout>
        <article>
          {post.feature_image ? (
            <figure
              className="
                w-full
                sm:h-48
                md:h-96
              "
            >
              <img
                className="
                  h-full
                  w-full
                  object-cover
                "
                src={post.feature_image}
                alt={post.title}
              />
            </figure>
          ) : null}

          <section
            className="
              w-full
              mt-8
              mx-auto
              px-8
              md:w-3/4
            "
          >
            <h1
              className="
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              {post.title}
            </h1>

            <PostMeta author={post.primary_author} post={post} />

            <section
              className="
                load-external-scripts
                max-w-none
                prose
                prose-sm
                md:prose-lg
                lg:prose-xl
                xl:prose-2xl
              "
              dangerouslySetInnerHTML={{ __html: post.html || '' }}
            />
          </section>
        </article>
      </PostLayout>
    </>
  );
};

export default Post;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;
