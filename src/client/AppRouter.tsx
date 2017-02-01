import * as React from "react";
import { Store } from "redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import App from "./containers/App";
import Home from "./containers/Home";
import ReduxTest from "./containers/ReduxTest";
import NavbarWith from "./containers/NavbarWith";

interface IAppRouter {
  store: Store<Object>,
}

class AppRouter extends React.Component<IAppRouter, undefined> {
  render(): JSX.Element {
    return (
      <Router history={syncHistoryWithStore(browserHistory, this.props.store)}>
        <Route path="/" component={App}>
          <Route component={NavbarWith}>
            <IndexRoute component={Home} />
            <Route path="redux" component={ReduxTest} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
