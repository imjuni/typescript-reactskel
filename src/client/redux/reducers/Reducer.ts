import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { numberingReducer } from './Numbering';
import { localeReducer } from './Locale';

export const reducer = combineReducers({
  routing: routerReducer,
  numbering: numberingReducer,
  locale: localeReducer,
});
