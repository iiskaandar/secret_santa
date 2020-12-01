import { MainTypes, StateType } from '@namespace/index';

export default (
  state: StateType,
  action: { payload: any; type: MainTypes },
) => {
  const { payload, type } = action;

  switch (type) {
    case MainTypes.SIGNIN:
    case MainTypes.SIGNUP:
    case MainTypes.SET_NOT_TO_DRAW:
      return {
        ...state,
        user: payload.data,
        error: payload.error,
      };
    default:
      return state;
  }
};
