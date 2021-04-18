import Vue from 'vue';
import i18next from "i18next";
import VueI18Next from "@panter/vue-i18next";
import {localetr} from './assets/locales/tr'
import {localeen} from './assets/locales/en'

Vue.use(VueI18Next);

const lng = 'tr';
i18next.init({
    resources:{
        tr:{"translation":localetr},
        en:{"translation":localeen}
    },
    lng: lng || 'tr',
    fallbackLng: ['tr','en'],
    whitelist: ['en','tr'],
    keySeparator: '__',
    nsSeparator: '::',
    ns: ['common','translation'],
    preload: ['en', 'tr'],
    returnEmptyString: false,
    parseMissingKeyHandler: (key) => `No translation found for "${key}"`
})

export const i18n = new VueI18Next(i18next);
