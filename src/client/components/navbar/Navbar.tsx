import * as React from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Popover, Menu, MenuItem, Position } from '@blueprintjs/core';
import { changeLocale } from '../../redux/actions/Locale';

interface IDispatchProps {
  changeLocale(locale: string);
}

type INavbarProps = IDispatchProps;

function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    changeLocale: (locale: string) => {
      dispatch(changeLocale(locale));
    },
  };
}

class Navbar extends React.Component<INavbarProps, any> {
  handleChangeLocale(locale: string): () => void {
    return () => {
      this.props.changeLocale(locale);
    };
  }

  createi18nMenu(): JSX.Element {
    return (
      <Menu>
        <MenuItem text="ko" onClick={this.handleChangeLocale('ko')} />
        <MenuItem text="en" onClick={this.handleChangeLocale('en')} />
      </Menu>
    );
  }

  render(): JSX.Element {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">
            <FormattedMessage id="app.capital.title" />
          </div>
          <span className="pt-navbar-divider" />
          <Link to="/" className="pt-button pt-minimal pt-icon-home">
            <FormattedMessage id="navbar.home" />
          </Link>
          <Link to="/redux" className="pt-button pt-minimal pt-icon-document">
            <FormattedMessage id="navbar.redux" />
          </Link>
        </div>

        <div className="pt-navbar-group pt-align-right">
          <span className="pt-navbar-divider" />
          <Popover content={this.createi18nMenu()} position={Position.BOTTOM}>
            <button className="pt-button pt-minimal pt-icon-cog" />
          </Popover>
        </div>
      </nav>
    );
  }
}

const connected = connect<any, IDispatchProps, any>(null, mapDispatchToProps)(Navbar);
export { connected as Navbar };
