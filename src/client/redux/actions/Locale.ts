import Action from '../actions/Action';

export const CHANGE_LOCALE: string = 'CHANGE_LOCALE';
export interface IChangeLocale {
  locale: string;
}

export type IChangeLocaleAction = Action<IChangeLocale>;

export function changeLocale(value: string): IChangeLocaleAction {
  return {
    type: CHANGE_LOCALE,
    value: {
      locale: value,
    },
  };
}
