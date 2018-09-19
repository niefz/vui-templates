/**
 * Created by NieFZ on 2018/9/18.
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
{{#UI}}
{{#if_eq UIConfig 'element-ui'}}
import ElementLocale from 'element-ui/lib/locale';
{{/if_eq}}
{{/UI}}

import messages from 'src/local';

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

{{#UI}}
{{#if_eq UIConfig 'element-ui'}}
ElementLocale.i18n((key, value) => i18n.t(key, value));
{{/if_eq}}
{{/UI}}

export const loadLanguageAsync = (lang) => {
  if (i18n.locale === lang) return Promise.resolve(lang);
  if (loadedLanguages.includes(lang)) return Promise.resolve(setI18nLanguage(lang));
  return import(`src/local/lang/${lang}`).then((msgs) => {
    i18n.setLocaleMessage(lang, msgs.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  }).catch(() => {
  });
};
