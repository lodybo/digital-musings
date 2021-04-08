import React from 'react';
import { Link } from 'gatsby';
import { PageLayout } from '../components/common';

const NotFoundPage = (): JSX.Element => (
  <PageLayout title="Missing...">
    <div className="container">
      <article className="content" style={{ textAlign: 'center' }}>
        <h1 className="content-title">Error 404</h1>
        <section className="content-body">
          Page not found, <Link to="/">return home</Link> to start over
        </section>
      </article>
    </div>
  </PageLayout>
);

export default NotFoundPage;
