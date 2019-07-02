import {
  FIND_BOMBS_REQUEST,
  FIND_BOMBS_SUCCESS,
  FIND_BOMBS_FAILURE,
} from '../constants';
import {IBasicAction} from './index';

const isSearchingBombs = (state: boolean = false, action: IBasicAction) => {
  switch (action.type) {
    case FIND_BOMBS_REQUEST:
      return true;

    case FIND_BOMBS_SUCCESS:
    case FIND_BOMBS_FAILURE:
      return false;

    default:
      return state;
  }
};

export default isSearchingBombs;