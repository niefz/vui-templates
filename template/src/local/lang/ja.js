/**
 * Created by NieFZ on 2018/8/27.
 */
{{#UI}}
{{#if_eq UIConfig 'element-ui'}}
import jaLocale from 'element-ui/lib/locale/lang/ja';
{{/if_eq}}
{{/UI}}

export default {
  {{#UI}}
  {{#if_eq UIConfig 'element-ui'}}
  ...jaLocale,
  {{/if_eq}}
  {{/UI}}
};
