import {
  SKIP_NEXT_MAP_UPDATE,
} from '../constants';
import {IBasicAction} from './index';

export interface ISkipNextMapUpdateAction extends IBasicAction {
  skip: boolean;
}

const skipNextMapUpdate = (state: boolean = false, action: ISkipNextMapUpdateAction) => {
  switch (action.type) {
    case SKIP_NEXT_MAP_UPDATE:
      return action.skip;

    default:
      return state;
  }
};

export default skipNextMapUpdate;