import { CHANGE_LOCALE, IChangeLocaleAction } from "actions/Locale";
import { LOCALE } from "config/ConfigKeys";

interface IMessageProps {
  [messageId: string]: string;
}

export interface ILocaleProps {
  locale: string;
  messages?: IMessageProps;
}

const initValue: ILocaleProps = {
  locale: ((locale) => { return (locale) ? locale : "ko"; })(localStorage.getItem(LOCALE)),
};

export default function localeReducer(state = initValue, action: IChangeLocaleAction) {
  switch (action.type) {
    case CHANGE_LOCALE:
      localStorage.setItem(LOCALE, action.value.locale);

      return Object.assign({}, {
        locale: action.value.locale,
      });

    default:
      return state;
  }
}
