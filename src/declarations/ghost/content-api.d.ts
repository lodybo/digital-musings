import { Nullable } from '@tryghost/content-api';

declare module '@tryghost/content-api' {
  interface CodeInjection {
    codeinjection_styles?: Nullable<string>;
  }

  interface PostOrPage {
    created_at_pretty: string;
    published_at_pretty: string;
    updated_at_pretty: string;
  }
}
