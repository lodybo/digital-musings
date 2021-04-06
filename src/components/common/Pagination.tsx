import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

export type PaginationContext = {
  humanPageNumber: number;
  limit: number;
  nextPagePath: string;
  numberOfPages: number;
  pageNumber: number;
  previousPagePath: string;
  skip: number;
  slug: string;
};

type Props = {
  pageContext: PaginationContext;
};

const Pagination = ({ pageContext }: Props): JSX.Element | null => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages,
  } = pageContext;

  const buttonClasses = (flag: boolean) =>
    classNames(
      'bg-primary-light',
      'px-4',
      'py-2',
      'border',
      'border-primary-dark',
      'rounded',
      'transition',
      'hover:bg-primary',
      {
        'pointer-events-none': flag,
        'text-primary-dark': flag,
      }
    );

  if (numberOfPages === 1) {
    return null;
  }

  return (
    <nav
      className="
        flex
        justify-between
        mt-10
      "
      role="navigation"
    >
      <Link
        className={buttonClasses(humanPageNumber === 1)}
        to={previousPagePath}
        rel="prev"
      >
        Previous
      </Link>

      <div
        className="
          self-center
        "
      >
        Page {humanPageNumber} of {numberOfPages}
      </div>

      <Link
        className={buttonClasses(humanPageNumber === numberOfPages)}
        to={nextPagePath}
        rel="next"
      >
        Next
      </Link>
    </nav>
  );
};

export default Pagination;
