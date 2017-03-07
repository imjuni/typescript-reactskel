import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { addLocaleData } from "react-intl";
import * as en from "react-intl/locale-data/en";
import * as ko from "react-intl/locale-data/ko";
import reducer from "./redux/reducers/Reducer";
import "font-awesome/css/font-awesome.min.css";
import "ionicons/dist/css/ionicons.min.css";
import "font/NotoSansKR-Hestia/stylesheets/NotoSansKR-Hestia.css";
import AppRouter from "./AppRouter";

const store = createStore(reducer);

addLocaleData(en);
addLocaleData(ko);

class Container extends React.Component<null, null> {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <AppRouter store={store} />
      </Provider>
    );
  }
}

ReactDOM
  .render(<Container />, document.getElementById("tsreactskel-react-app"));
