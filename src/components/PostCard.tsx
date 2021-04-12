import React from 'react';
import { Tags } from '@tryghost/helpers-gatsby';
import { readingTime as readingTimeHelper } from '@tryghost/helpers';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { PostOrPage } from '@tryghost/content-api';

type Props = {
  post: PostOrPage;
};

const PostCard = ({ post }: Props): JSX.Element => {
  const url = `/wrote/${post.slug}/`;
  const readingTime = readingTimeHelper(post);

  return (
    <Link
      to={url}
      className="
        reset-link-styles
        group
        flex
        flex-col
        sm:flex-row
        p-10
        cursor-pointer
        transition-all
        shadow-none
        sm:hover:shadow
        sm:hover:ml-0.5
        sm:hover:bg-primary-dark
      "
    >
      <div
        className={classNames(
          'h-52',
          'w-full',
          'sm:w-52',
          'bg-cover',
          'bg-center',
          'mb-4',
          'sm:mb-0',
          {
            'flex-initial': post.feature_image,
            'sm:flex-none': post.feature_image,
            hidden: !post.feature_image,
          }
        )}
        style={{
          backgroundImage: post.feature_image
            ? `url(${post.feature_image})`
            : '',
        }}
      />
      <div
        className="
          flex
          flex-col
          ml-0
          sm:ml-4
          justify-between
        "
      >
        <header>
          <h2>{post.title}</h2>
        </header>

        <section>
          <p>{post.excerpt}</p>
        </section>

        <footer
          className="
            flex
            justify-between
            text-sm
            text-secondary-dark
            sm:group-hover:text-black-light
          "
        >
          {post.tags && post.tags.length > 0 && (
            <div>
              <Tags post={post} visibility="public" autolink={false} />
            </div>
          )}
          <p>{readingTime}</p>
        </footer>
      </div>
    </Link>
  );
};

export default PostCard;
