import React from 'react';
import { Link } from 'gatsby';
import { GhostSettingsNavigationField } from './hooks/ghostSettings';

type Props = {
  data: GhostSettingsNavigationField[];
};

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */
const Navigation = ({ data }: Props) => {
  const navigationClasses = `
    border
    border-2
    border-solid
    px-2
    py-1
    rounded-sm
  `;

  return (
    <nav
      className="
        flex
        flex-wrap
        flex-row
      "
    >
      {data.map((navItem, i) => {
        if (navItem.url.match(/^\s?http(s?)/gi)) {
          return (
            <a
              className={navigationClasses}
              href={navItem.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              {navItem.label}
            </a>
          );
        } else {
          return (
            <Link className={navigationClasses} to={navItem.url} key={i}>
              {navItem.label}
            </Link>
          );
        }
      })}
    </nav>
  );
};

export default Navigation;
