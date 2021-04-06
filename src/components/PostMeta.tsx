import React from 'react';
import { Author, Nullable, PostOrPage } from '@tryghost/content-api';
import { Link } from 'gatsby';

type Props = {
  author?: Nullable<Author>;
  post: PostOrPage;
};

const PostMeta = ({ author, post }: Props): JSX.Element => (
  <div
    className="
      border-t
      border-b
      border-primary-dark
      py-1
      px-2
      grid
      grid-flow-col
      auto-cols-auto
      items-center
    "
  >
    <div>
      {author && author.profile_image ? (
        <img
          className="
            w-8
            h-8
          "
          src={author.profile_image}
          alt={author.name}
        />
      ) : null}
    </div>

    <div
      className="
        flex
        flex-col
      "
    >
      <p
        className="
          text-secondary
        "
      >
        Written on:
      </p>

      <p>{post.created_at_pretty}</p>
    </div>

    <div
      className="
        flex
        flex-col
      "
    >
      <p
        className="
          text-secondary-dark
        "
      >
        Reading time:{' '}
        <span className="text-black-light">{post.reading_time}</span>
      </p>

      <ul
        className="
          flex
          flex-row
        "
      >
        {
          post.tags
            ? /* eslint-disable indent */
              post.tags.map((tag) => (
                <li key={tag.id}>
                  {tag.url ? (
                    <Link to={tag.url}>{tag.name}</Link>
                  ) : (
                    <p>{tag.name}</p>
                  )}
                </li>
              ))
            : null
          /* eslint-enable indent */
        }
      </ul>
    </div>
  </div>
);

export default PostMeta;
