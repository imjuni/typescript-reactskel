import * as React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import '@blueprintjs/core/src/blueprint.scss';
import { ILocaleProps } from '../redux/reducers/Locale';
import { logger } from '../services/util/Logger';
import 'font/NotoSansKR-Hestia/stylesheets/NotoSansKR-Hestia.css';
import 'sass/tsreactskel.scss';
import locales from '../i18n/locales';
import { Navbar } from '../components/navbar/Navbar';
import { Home } from './Home';
import { ReduxTest } from './ReduxTest';

export interface IAppProps {
  store: Object;
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
    locale,
    messages: locales[locale],
  };
}

class App extends React.Component<IAppProps & ILocaleProps, any> {
  render(): JSX.Element {
    logger()('App Render -> ', this.props.locale, this.props.messages);

    return (
      <IntlProvider locale={this.props.locale} messages={this.props.messages}>
        <Router>
          <div className="main-container">
            <Navbar />

            <Route exact path="/" component={Home} />
            <Route path="/redux" component={ReduxTest} />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}
export default connect<ILocaleProps, any, any>(mapStateToProps)(App);
