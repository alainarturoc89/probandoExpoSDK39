import * as Localization from 'expo-localization';

let i18n = require('i18n-js') ;

i18n.translations = {
  en: require('./en.json'),
  es: require('./es.json'),
};

i18n.locale = Localization.locale;

export default i18n;