/**
 * Created by NieFZ on 2018/9/18.
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ElementLocale from 'element-ui/lib/locale';

import messages from './lang/zh';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
});

const loadedLanguages = ['zh'];

const setI18nLanguage = (lang) => {
  i18n.locale = lang;
  return lang;
};

ElementLocale.i18n((key, value) => i18n.t(key, value));

export const loadLanguageAsync = (lang) => {
  if (i18n.locale === lang) return Promise.resolve(lang);
  if (loadedLanguages.includes(lang)) return Promise.resolve(setI18nLanguage(lang));
  return import(/* webpackChunkName: "lang-[request]" */ `@/locale/lang/${lang}`).then((msg) => {
    i18n.setLocaleMessage(lang, msg.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  }).catch(() => {
  });
};
