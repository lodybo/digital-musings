import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Settings } from '@tryghost/content-api';
import classNames from 'classnames';

type Props = Pick<Settings, 'navigation'>;

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
const Navigation = ({ navigation }: Props): JSX.Element | null => {
  if (!navigation) return null;

  const navigationClasses = `
    reset-link-styles
    flex
    place-items-center
    py-5
    px-0
    sm:py-0
    sm:px-5
    text-tertiary-light
    transition
    hover:text-black
  `;

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <nav
      className={classNames(
        'flex',
        'flex-col',
        'sm:flex-row',
        'text-xl',
        'p-5',
        'sm:px-10',
        'md:px-20',
        'lg:px-30',
        'h-30',
        'transition',
        {
          shadow: menuIsOpen,
        }
      )}
    >
      <button
        className={classNames(
          'rounded',
          'px-5',
          'py-2.5',
          'border-2',
          'mb-5',
          'mr-0',
          'sm:mb-0',
          'sm:mr-10',
          'border-tertiary-dark',
          'text-tertiary-light',
          'cursor-pointer',
          'transition',
          'hover:bg-primary-dark',
          'hover:text-tertiary-dark',
          'focus:outline-none',
          'focus-visible:ring',
          'focus-visible:ring-offset-2',
          'focus-visible:ring-offset-secondary-light',
          'focus-visible:ring-secondary-dark',
          {
            'bg-primary-light': !menuIsOpen,
            'bg-primary': menuIsOpen,
          }
        )}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        Menu
      </button>

      <div
        className={classNames(
          'flex-wrap',
          'flex-col',
          'sm:flex-row',
          'divide-y',
          'divide-x-0',
          'sm:divide-x',
          'sm:divide-y-0',
          'divide-secondary-dark',
          'divide-opacity-75',
          {
            flex: menuIsOpen,
            hidden: !menuIsOpen,
          }
        )}
      >
        {navigation.map((navItem, i) => {
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
      </div>
    </nav>
  );
};

export default Navigation;
