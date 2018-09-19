/**
 * Created by NieFZ on 2018/8/27.
 */
{{#UI}}
{{#if_eq UIConfig 'element-ui'}}
import enLocale from 'element-ui/lib/locale/lang/en';
{{/if_eq}}
{{/UI}}

export default {
  {{#UI}}
  {{#if_eq UIConfig 'element-ui'}}
  ...enLocale,
  {{/if_eq}}
  {{/UI}}
};
