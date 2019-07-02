import {
  SET_GAME_STATE,
} from '../constants';
import {IBasicAction} from './index';

export enum GameState {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Lost = 'Lost',
  Won = 'Won',
}

export interface IGameStateAction extends IBasicAction {
  gameState: GameState;
}

const gameState = (state: GameState = GameState.NotStarted, action: IGameStateAction) => {
  switch (action.type) {
    case SET_GAME_STATE:
      return action.gameState;

    default:
      return state;
  }
};

export default gameState;