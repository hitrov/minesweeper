import {
  SET_LEVEL,
} from '../constants';
import {IBasicAction} from './index';

export enum Level {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
}

interface ILevelAction extends IBasicAction {
  level: Level;
}

const level = (state: Level = Level.One, action: ILevelAction) => {
  switch (action.type) {
    case SET_LEVEL:
      return action.level;

    default:
      return state;
  }
};

export default level;