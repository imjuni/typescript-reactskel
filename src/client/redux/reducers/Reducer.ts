import { combineReducers } from 'redux';
import { numberingReducer } from './Numbering';
import { localeReducer } from './Locale';

export const reducer = combineReducers({
  numbering: numberingReducer,
  locale: localeReducer,
});
