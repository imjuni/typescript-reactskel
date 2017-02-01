import Action from "actions/Action";

export const RANDOM_NUMBER_UPDATE: string = "RANDOM_NUMBER_UPDATE";
export interface IRandomNumberUpdate {
  randomNumber: number;
}

export type IRandomNumberUpdateAction = Action<IRandomNumberUpdate>;

export function randomNumberUpdate(value: number): IRandomNumberUpdateAction {
  return {
    type: RANDOM_NUMBER_UPDATE,
    value: {
      randomNumber: value,
    },
  };
}
