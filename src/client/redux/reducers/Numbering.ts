import {
  RANDOM_NUMBER_UPDATE,
  IRandomNumberUpdateAction,
} from '../actions/Numbering';

const initValue: INumberingProps = {
  randomNumber: 0,
};

export interface INumberingProps {
  randomNumber: number;
}

export function numberingReducer(
  state = initValue,
  action: IRandomNumberUpdateAction) {
  switch (action.type) {
    case RANDOM_NUMBER_UPDATE:
      return Object.assign({}, {
        randomNumber: action.value.randomNumber,
      });

    default:
      return state;
  }
}
