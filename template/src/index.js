/**
 * Created by niefz on 2018/8/27.
 */
import '@babel/polyfill';

import Vue from 'vue';
{{#router}}
import VueRouter from 'vue-router';
{{/router}}

{{#UI}}
{{#if_eq UIConfig 'element-ui'}}
import { Loading } from 'element-ui';
{{/if_eq}}
{{/UI}}

{{#router}}
import Router from './routers';
{{/router}}
{{#vuex}}
import store from './stores';
{{/vuex}}

{{#i18n}}
import { i18n, loadLanguageAsync } from './i18n';
{{/i18n}}

import './styles/reset.scss';
import './styles/common.scss';

{{#UI}}
{{#if_eq UIConfig 'element-ui'}}
import './styles/element.scss';
{{/if_eq}}
{{/UI}}

import App from './index.vue';

{{#router}}
Vue.use(VueRouter);
{{/router}}

{{#UI}}
{{#if_eq UIConfig 'element-ui'}}
Vue.use(Loading.directive);
{{/if_eq}}
{{/UI}}


{{#router}}
const router = new VueRouter(Router);
{{/router}}

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
