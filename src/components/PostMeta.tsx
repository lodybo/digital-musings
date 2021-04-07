import React from 'react';
import { Author, Nullable, PostOrPage } from '@tryghost/content-api';
import { Link } from 'gatsby';
import { readingTime } from '@tryghost/helpers';
import classNames from 'classnames';
import isEqual from 'date-fns/isEqual';

type Props = {
  author?: Nullable<Author>;
  post: PostOrPage;
};

const PostMeta = ({ author, post }: Props): JSX.Element => {
  const postIsNotUpdated = (
    createdDate: string | undefined,
    updatedDate: Nullable<string> | undefined
  ): boolean => {
    if (
      createdDate === undefined ||
      updatedDate === undefined ||
      updatedDate === null
    ) {
      return true;
    }

    return isEqual(new Date(createdDate), new Date(updatedDate));
  };

  return (
    <div
      className="
        border-t
        border-b
        border-primary-dark
        my-4
        py-1
        px-2
        grid
        flex
        flex-col
        items-center
        sm:py-4
      "
    >
      <div
        className="
          flex
          flex-row
          justify-between
          items-center
          mb-4
        "
      >
        {author && author.profile_image ? (
          <img
            className="
              hidden
              sm:block
              w-8
              h-8
              rounded-full
            "
            src={author.profile_image}
            alt={author.name}
          />
        ) : null}

        <p
          className="
            text-secondary
          "
        >
          Written on: <br />
          <span
            className="
              text-black-light
            "
          >
            {post.published_at_pretty}
          </span>
        </p>

        <p
          className={classNames('text-secondary', {
            hidden: postIsNotUpdated(post.created_at, post.updated_at),
          })}
        >
          Last updated on: <br />
          <span
            className="
              text-black-light
            "
          >
            {post.updated_at_pretty}
          </span>
        </p>
      </div>

      <div
        className="
          flex
          flex-row
          justify-between
        "
      >
        <p
          className="
            text-secondary-dark
          "
        >
          Reading time: <br />
          <span
            className="
              text-black-light
            "
          >
            {readingTime(post, {
              minute: '1 minute',
              minutes: '% minutes',
            })}
          </span>
        </p>

        <ul
          className="
            flex
            flex-col
            sm:flex-row
            mt-4
            sm:mt-0
          "
        >
          {
            post.tags
              ? /* eslint-disable indent */
                post.tags.map((tag) => (
                  <li key={tag.id}>
                    <Link
                      className="
                        text-sm
                        bg-tertiary-light
                        text-primary-light
                        rounded-full
                        inline-block
                        px-4
                        mb-2
                        mx-0
                        sm:mb-0
                        sm:mx-2
                        cursor-pointer
                        hover:bg-tertiary-dark
                      "
                      to={`/${tag.slug}`}
                    >
                      {tag.name}
                    </Link>
                  </li>
                ))
              : null
            /* eslint-enable indent */
          }
        </ul>
      </div>
    </div>
  );
};

export default PostMeta;
