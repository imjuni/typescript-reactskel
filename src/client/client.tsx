import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ko from 'react-intl/locale-data/ko';
import { reducer } from './redux/reducers/Reducer';
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/dist/css/ionicons.min.css';
import 'font/NotoSansKR-Hestia/stylesheets/NotoSansKR-Hestia.css';
import App from './containers/App';

const store = createStore(reducer);

addLocaleData(en);
addLocaleData(ko);

export class Container extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <App store={store} />
      </Provider>
    );
  }
}

ReactDOM
  .render(<Container />, document.getElementById('tsreactskel-react-app'));
