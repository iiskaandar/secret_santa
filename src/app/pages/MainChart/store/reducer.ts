import { MainChartTypes, State } from '../namespace';

export default (
  state: State,
  action: { payload: any; type: MainChartTypes },
) => {
  const { payload, type } = action;

  switch (type) {
    case MainChartTypes.GET_DATA_BY_COUNTRY:
      return {
        ...state,
        data: payload.data,
      };
    default:
      return state;
  }
};
