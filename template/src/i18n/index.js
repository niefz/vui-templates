/**
 * Created by NieFZ on 2018/9/18.
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import messages from '../local';

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

export const loadLanguageAsync = (lang) => {
  if (i18n.locale === lang) return Promise.resolve(lang);
  if (loadedLanguages.includes(lang)) return Promise.resolve(setI18nLanguage(lang));
  return import(`../local/lang/${lang}`).then((msgs) => {
    i18n.setLocaleMessage(lang, msgs.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  }).catch(() => {
  });
};
