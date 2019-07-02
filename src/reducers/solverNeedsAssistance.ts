import {
  SOLVER_NEEDS_ASSISTANCE,
} from '../constants';
import {IBasicAction} from './index';

export interface iSolverNeedsAssistanceAction extends IBasicAction {
  needs: boolean;
}

const solverNeedsAssistance = (state: boolean = false, action: iSolverNeedsAssistanceAction) => {
  switch (action.type) {
    case SOLVER_NEEDS_ASSISTANCE:
      return action.needs;

    default:
      return state;
  }
};

export default solverNeedsAssistance;