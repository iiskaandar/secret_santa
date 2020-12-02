import React, { FunctionComponent, useReducer } from 'react';
import { getDataByCountry } from '@services/index';
import Context from './context';
import Reducer from './reducer';
import { MainChartTypes } from '../namespace';

interface Props {}

const MainChartState: FunctionComponent<Props> = props => {
  const initialState = {};
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getData = async () => {
    try {
      const response = await getDataByCountry('Poland');

      dispatch({ type: MainChartTypes.GET_DATA_BY_COUNTRY, payload: response });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Context.Provider value={{ data: state.data, getData }}>
      {props.children}
    </Context.Provider>
  );
};

export default MainChartState;
