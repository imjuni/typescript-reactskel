import * as React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { ILocaleProps } from "reducers/Locale";
import logger from "util/Logger";
import "@blueprintjs/core/src/blueprint.scss";
import "font/NotoSansKR-Hestia/stylesheets/NotoSansKR-Hestia.css";
import "sass/tsreactskel.scss";
import locales from "../i18n/locales";

export interface IAppProps {
  children: JSX.Element;
}

let prevLocale = null;

function mapStateToProps(state: any): ILocaleProps {
  const locale: string = state.locale.locale;

  if (prevLocale && prevLocale !== locale) {
    setTimeout(() => {
      // This is walkaround solution. Because This version IntlProvider don't have
      // render method. Therefore can't trigger children render method.
      // At this time, reload page.
      window.location.reload();
    }, 100);
  }

  prevLocale = locale;

  return {
    locale: locale,
    messages: locales[locale],
  };
}

class App extends React.Component<IAppProps & ILocaleProps, any> {
  render(): JSX.Element {
    logger()("App Render -> ", this.props.locale, this.props.messages);

    return (
        <IntlProvider locale={this.props.locale} messages={this.props.messages}>
          {this.props.children}
        </IntlProvider>
    );
  }
}


export default withRouter(connect<ILocaleProps, any, any>(mapStateToProps)(App));
