import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Navbar } from '../components/navbar/Navbar';
import { INumberingProps } from '../redux/reducers/Numbering';
import { randomNumberUpdate } from '../redux/actions/Numbering';
import { logger } from '../services/util/Logger';

interface IStateProps {
  numbering: INumberingProps;
}

interface IComponentProps {
  handleClickUpdateRandomNumber: (event: any) => void;
}

interface IDispatchProps {
  randomNumberUpdate(value: number);
}

type IReduxTest = IStateProps & IDispatchProps & IComponentProps;

function mapStateToProps(state: any): IStateProps {
  return {
    numbering: state.numbering,
  };
}

function mapDispatchToProps(dispatch): IDispatchProps {
  return {
    randomNumberUpdate: (value) => {
      return dispatch(randomNumberUpdate(value));
    },
  };
}

class ReduxTest extends React.Component<IReduxTest, any> {
  constructor(props: IReduxTest) {
    super(props);

    this.handleClickUpdateRandomNumber = this.handleClickUpdateRandomNumber.bind(this);
  }

  handleClickUpdateRandomNumber(event: any): void {
    event.preventDefault();

    logger()('handleClickUpdateRandomNumber clicked');

    this.props.randomNumberUpdate(Math.floor(Math.random() * 1000));
  }

  render(): JSX.Element {
    logger()('ReduxTest render');

    return (
      <div className="navbar-with-content-container">
        <div className="content-container">
          <h1>Redux</h1>
          <div className="element-spacer" />

          <h2>
            <FormattedMessage id="redux.store" />
          </h2>
          <ul>
            <li>
              <p>
                <FormattedMessage id="redux.store.random-number" />
                : {this.props.numbering.randomNumber}
              </p>
            </li>
          </ul>

          <div className="element-spacer" />

          <h2>Action</h2>
          <div className="redux-action-container">
            <button
              type="button"
              className="pt-button"
              onClick={this.handleClickUpdateRandomNumber}
            >
              <FormattedMessage id="redux.button.update-random-number" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const connected = connect<IStateProps, IDispatchProps, any>(
  mapStateToProps, mapDispatchToProps)(ReduxTest);
export { connected as ReduxTest };
