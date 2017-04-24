import en from './en';
import ko from './ko';

const locales = {};

locales[en.locale] = en.messages;
locales[ko.locale] = ko.messages;

export default locales;
