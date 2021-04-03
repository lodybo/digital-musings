declare module '@tryghost/helpers-gatsby' {
  import { PostOrPage, Tag } from '@tryghost/content-api';

  /**
   * Tags helper
   *
   * Filters and outputs tags for a post
   *
   * @param {{tags: [*]}} post - the data we are filtering
   * @param {int} limit - limits the number of tags to be returned
   * @param {int} from=1] - index of the tag to start iterating from
   * @param {int} to - index of the last tag to iterate over
   * @param {string} separator="," - string used between each tag
   * @param {string} prefix - string to output before each tag
   * @param {string} suffix - string to output after each tag
   * @param {string} visibility="public" - change to "all" to include internal tags
   * @param {boolean} autolink=true - whether to convert tags to links
   * @param {string} permalink="/:slug" - the pattern used for links
   * @param {object} fallback - a fallback tag to output if there are none
   * @param {function} fn - function to call on each tag, default outputs tag.name in a span
   * @param {string} classes - classNames applied to each tag
   * @param {string} separatorClasses - classNames applied to the separator span
   * @param {string} prefixClasses - classNames applied to the prefix span
   * @param {string} suffixClasses - classNames applied to the suffix span
   * @param {string} linkClasses - classNames applied to each link
   */

  export interface TagsProps {
    post: PostOrPage;
    limit?: string;
    from?: number;
    to?: number;
    separator?: string;
    prefix?: string;
    suffix?: string;
    visibility?: 'public' | 'all' | 'internal';
    autolink?: boolean;
    permalink?: string;
    fallback?: Record<string, unknown>;
    fn?: (tag: Tag) => JSX.Element;
    classes?: string;
    prefixClasses?: string;
    suffixClasses?: string;
    linkClasses?: string;
  }

  export class Tags extends React.PureComponent<TagsProps, any> {}
}
