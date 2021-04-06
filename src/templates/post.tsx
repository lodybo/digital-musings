import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import { PostLayout } from '../components/common';
import { MetaData } from '../components/common/meta';
import { PostOrPage } from '@tryghost/content-api';

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

  return (
    <>
      <MetaData data={post} location={location} />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <PostLayout>
        <article className="content">
          {post.feature_image ? (
            <figure
              className="
                w-full
                sm:h-48
                md:h-96
                lg:h-1/4
                mb-8
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
              prose
              prose-sm
              w-full
              mx-auto
              px-8
              md:w-3/4
              sm:prose
              md:prose-lg
              lg:prose-xl
              xl:prose-2xl
            "
          >
            <h1>{post.title}</h1>

            <section
              className="load-external-scripts"
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
