/**
 * Created by NieFZ on 2018/8/27.
 */
{{#UI}}
{{#if_eq UILibrary 'element-ui'}}
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
{{/if_eq}}
{{/UI}}

export default {
  {{#UI}}
  {{#if_eq UILibrary 'element-ui'}}
  ...zhLocale,
  {{/if_eq}}
  {{/UI}}
};
