/**
 * Created by niefz on 2018/8/27.
 */
import '@babel/polyfill';

import Vue from 'vue';

{{#router}}
import router from './routers';
{{/router}}
{{#vuex}}
import store from './stores';
{{/vuex}}
{{#i18n}}
import { i18n, loadLanguageAsync } from './i18n';
{{/i18n}}
{{#UI}}
{{#if_eq UILibrary 'iview'}}
import './less/reset.less';
import './less/common.less';
import './less/iview.less';
{{/if_eq}}
{{else}}
import './sass/reset.scss';
import './sass/common.scss';
{{#if_eq UILibrary 'element-ui'}}
import './sass/element.scss';
{{/if_eq}}
{{else}}
{{/UI}}

import App from './index.vue';

{{#i18n}}
const lang = 'zh';
loadLanguageAsync(lang);

{{/i18n}}
const app = new Vue({
  el: '.wrapper',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#i18n}}
  i18n,
  {{/i18n}}
  render: h => h(App),
});

export default { app };
