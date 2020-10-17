import genericTranslations from './genericTranslations.json';

export const translate = (translations) => (locale) => (path) => {
  translations = mergeGenericTranslations(translations);
  try {
    return getNestedValue(translations, `${locale}.${path}`);
  } catch(err) {
    return `I18n: Translation missing for ${locale}.${path}`
  }
}

const getNestedValue = (obj, path) => {
  return path
    .split('.')
    .reduce((result, key) => result[key], obj);
}

const mergeGenericTranslations = (viewTranslations) => {
  Object.entries(genericTranslations).forEach(genericTrans => Object.assign(viewTranslations[genericTrans[0]], genericTrans[1]));
  return viewTranslations;
}

// Usage:
// Import i18n translate function from this file into desired component
// import { translate } from '*/lib/i18n/i18n';
// import { string } from 'prop-types';

// Then import translations from translations file. This translation file can be located anywhere. In this app it's located in the same folder as the compont you're using.
// The file can be called anything, but the style here is "translations.json"

// Execute the method translate with your json file and assign it to a variable called whatever you wish. The style here is "t".
// let t = translate(translations);

// Inside your component, you must have access (through props) to the appState values. This should contain a locale property.
// Execute your new t function with the locale as your param.
// This should be done in 2 places, in component constructor, and in componentDidMount, so any changes in appState locale can be updated.
// this.t = t(this.props.props.locale);

// Finally, your t function should be ready for a path string, which points to which value you wish to access in translations.json file.
// This is added to a jsx element.
// <h1>{ this.t('recipes.page_title') }</h1>