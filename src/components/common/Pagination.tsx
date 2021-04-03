import React from 'react';
import { Link } from 'gatsby';

type Props = {
  pageContext: {
    humanPageNumber: number;
    limit: number;
    nextPagePath: string;
    numberOfPages: number;
    pageNumber: number;
    previousPagePath: string;
    skip: number;
    slug: string;
  };
};

const Pagination = ({ pageContext }: Props) => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages,
  } = pageContext;

  return (
    <nav className="pagination" role="navigation">
      <div>
        {previousPagePath && (
          <Link to={previousPagePath} rel="prev">
            Previous
          </Link>
        )}
      </div>
      {numberOfPages > 1 && (
        <div className="pagination-location">
          Page {humanPageNumber} of {numberOfPages}
        </div>
      )}
      <div>
        {nextPagePath && (
          <Link to={nextPagePath} rel="next">
            Next
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
