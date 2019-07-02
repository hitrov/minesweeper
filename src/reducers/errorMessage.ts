import {
  FLAG_FAILURE,
  FIND_BOMBS_FAILURE,
  NEW_GAME_FAILURE,
  OPEN_CELL_FAILURE,
  MAP_FAILURE,
  MAP_MESSAGE_FAILURE,
  RESET_FLAGGED_FAILURE,
  TOGGLE_FLAG_FAILURE,
} from '../constants';
import {IBasicAction} from './index';

interface IErrorMessageAction extends IBasicAction {
  message: string;
}

const errorMessage = (state: string = '', action: IErrorMessageAction) => {
  switch (action.type) {
    case FLAG_FAILURE:
    case FIND_BOMBS_FAILURE:
    case NEW_GAME_FAILURE:
    case OPEN_CELL_FAILURE:
    case MAP_FAILURE:
    case MAP_MESSAGE_FAILURE:
    case RESET_FLAGGED_FAILURE:
    case TOGGLE_FLAG_FAILURE:
      console.error(action.message);

      return action.message;

    default:
      return state;
  }
};

export default errorMessage;