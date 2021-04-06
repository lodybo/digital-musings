import { Nullable } from '@tryghost/content-api';

declare module '@tryghost/content-api' {
  interface CodeInjection {
    codeinjection_styles?: Nullable<string>;
  }
}
