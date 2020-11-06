import * as Localization from 'expo-localization';

let i18n = require('i18n-js') ;

i18n.translations = {
  en: require('./en.json'),
  es: require('./es.json'),
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;