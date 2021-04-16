import React from 'react';
import { PageLayout } from '../components/common';
import { useGhostAuthor } from '../components/common/hooks/ghostAuthor';
import { graphql, Link } from 'gatsby';
import { PostOrPage } from '@tryghost/content-api';
import PostCard from '../components/PostCard';

type Props = {
  data: {
    posts: {
      nodes: PostOrPage[];
    };
  };
};

const indexPage = ({ data }: Props): JSX.Element => {
  const { name, profile_image } = useGhostAuthor();
  const posts = data.posts.nodes;

  return (
    <>
      <PageLayout>
        <div
          className="
          flex
          flex-col
          flex-initial
          sm:flex-row
          sm:flex-auto
          mx-10
          items-center
        "
        >
          {profile_image && (
            <img
              className="
              mb-5
              mr-0
              sm:mb-0
              sm:mr-10
            "
              src={profile_image}
              alt={name}
            />
          )}

          <div>
            <h1
              className="
              text-3xl
              sm:text-4xl
              md:text-6xl
            "
            >
              Hello, I&apos;m Lody
            </h1>

            <p
              className="
              text-lg
              sm:text-2xl
              md:text-4xl
            "
            >
              Born and raised in The Netherlands, currently work for&nbsp;
              <a
                href="https://www.taf.nl"
                target="_blank"
                rel="noopener noreferrer"
              >
                TAF B.V.
              </a>
              , and I occasionally&nbsp;
              <a
                href="https://www.themarch.nl"
                target="_blank"
                rel="noopener noreferrer"
              >
                make
              </a>
              &nbsp;
              <a
                href="https://www.borgersfamilie.nl"
                target="_blank"
                rel="noopener noreferrer"
              >
                music
              </a>
              &nbsp;too.
            </p>
          </div>
        </div>

        <div
          className="
          mt-10
          mx-10
          sm:mx-20
        "
        >
          <h2>I&apos;ve written a few things...</h2>
          <p>
            <Link to="/wrote">
              And here&apos;s some more if you wanna read...
            </Link>
          </p>

          <div
            className="
            mt-10
            grid
            grid-cols-1
            lg:grid-cols-2
          "
          >
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default indexPage;

export const query = graphql`
  query {
    posts: allGhostPost(limit: 4) {
      nodes {
        ...GhostPostFields
      }
    }
  }
`;
