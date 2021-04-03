interface ItemWithVisibility {
  visibility: string;
}

declare module '@tryghost/helpers' {
  import { PostOrPage, Tag } from '@tryghost/content-api';

  export interface utils {
    /**
     * Image count Utility
     * @param {string} html
     * @returns {integer} image count
     * @description Takes an HTML string and returns the number of images
     **/
    countImages: (html: string) => string;

    /**
     * Word count Utility
     * @param {string} text
     * @returns {integer} word count
     * @description Takes a string and returns the number of words after sanitizing any html
     * This code is taken from https://github.com/sparksuite/simplemde-markdown-editor/blob/6abda7ab68cc20f4aca870eb243747951b90ab04/src/js/simplemde.js#L1054-L1067
     * with extra diacritics character matching.
     **/
    countWords: (Text: string) => number;

    visibility: {
      /**
       * Returns an Array of visibility values.
       * e.g. public,all => ['public, 'all']
       * @param visibility
       * @returns {*}
       */
      parse: (visibility: string) => string[];

      /**
       * Filter resources by visibility.
       *
       * All resources that have a visibility property, can use this static helper function.
       *
       *
       * @param {Array|Object} items - the items to filter
       * @param {Array|String} visibility - the visibility setting to filter on (default: 'public')
       * @param {Function} [fn] - function to apply to each item before returning
       * @returns {Array|Object} filtered items
       */
      filter: (
        items: ItemWithVisibility | ItemWithVisibility[],
        visibility: string | string[],
        fn: (item: ItemWithVisibility) => item
      ) => ItemWithVisibility | ItemWithVisibility[];
    };

    /**
     * Reading minutes method
     *
     * @param {string} html - HTML that we want to calculate reading time for
     * @param {string} additionalImages - additional images that need to be taken into account outside HTML
     * @returns {number} estimated reading in minutes
     */
    readingMinutes: (html: string, additionalImages: string) => number;
  }

  /**
   * Reading Time Helper
   *
   * @param {{html: String, feature_image: [String|null]}} post - post with HTML that we want to calculate reading time for
   * @param {object} options - output options
   * @param {string} [options.minute="1 min read"] - format for reading times <= 1 minute
   * @param {string} [options.minutes="% min read"] - format for reading times > 1 minute
   * @returns {string} estimated reading in minutes
   */
  export function readingTime(
    post: PostOrPage,
    options?: {
      minute?: string;
      minutes?: string;
    }
  ): string;

  /**
   * Tags Helper
   *
   * @param {{tags: [*]}} data - the data we are filtering
   * @param {object} options - filter options
   * @param {int} [options.limit] - limits the number of tags to be returned
   * @param {int} [options.from=1] - index of the tag to start iterating from
   * @param {int} [options.to] - index of the last tag to iterate over
   * @param {string} [options.separator=","] - string used between each tag
   * @param {string} [options.prefix] - string to output before each tag
   * @param {string} [options.suffix] - string to output after each tag
   * @param {string} [options.visibility="public"] - change to "all" to include internal tags
   * @param {object} [options.fallback] - a fallback tag to output if there are none
   * @param {function} [options.fn] - function to call on each tag, default returns tag.name
   * @returns {String|*} processed tags, comma separated names by default
   */
  export interface tags {
    (
      data: Tag[],
      options: {
        limit: string;
        from: number;
        to: number;
        separator: string;
        prefix: string;
        suffix: string;
        visibility: 'public' | 'all' | 'internal';
        fallback: Record<string, unknown>;
        fn: (tag: Tag) => JSX.Element;
      }
    ): string;
  }
}
