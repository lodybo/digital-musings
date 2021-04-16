const config = require('../../tailwind.config');

module.exports = {
  siteUrl: `https://www.lodybo.com`, // Site domain. Do not include a trailing slash!

  postsPerPage: 12, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

  siteTitleMeta: `Lodybo`, // This allows an alternative site title for meta data for pages.
  siteDescriptionMeta: `Some digital musings about front-end development`, // This allows an alternative site description for meta data for pages.

  shareImageWidth: 1000, // Change to the width of your default share image
  shareImageHeight: 523, // Change to the height of your default share image

  shortTitle: `Lodybo`, // Used for App manifest e.g. Mobile Home Screen
  siteIcon: `favicon.ico`, // Logo in /static dir used for SEO, RSS, and App manifest
  backgroundColor: config.theme.colors.white.DEFAULT, // Used for Offline Manifest
  themeColor: config.theme.colors.primary.DEFAULT, // Used for Offline Manifest
};
