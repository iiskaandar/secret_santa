import React, { FunctionComponent, useReducer } from 'react';
import { signIn, signUp, setNotToDraw } from '@services/index';
import Context from './context';
import Reducer from './reducer';
import { MainTypes } from '../namespace';

interface Props {}

const MainState: FunctionComponent<Props> = props => {
  const initialState = {};
  const [state, dispatch] = useReducer(Reducer, initialState);

  const signin = async (name: string, password: string) => {
    try {
      const response = await signIn(name, password);
      if (response.data.error) {
        response.data.error = 'Błędna nazwa uytkownika lub hasło.';
      }
      dispatch({ type: MainTypes.SIGNIN, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (name: string, password: string) => {
    try {
      const response = await signUp(name, password);
      if (response.data.error) {
        response.data.error = 'Błędna nazwa uytkownika lub hasło.';
      }
      dispatch({ type: MainTypes.SIGNUP, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const setNotToDrawAction = async (id: number) => {
    try {
      if (!(id === state.user.nottodraw)) {
        const response = await setNotToDraw(id, state.user.id);
        if (response.data.error) {
          response.data.error = 'Nie mona.';
        }
        dispatch({ type: MainTypes.SET_NOT_TO_DRAW, payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Context.Provider
      value={{
        user: state.user,
        signin,
        signup,
        setNotToDrawAction,
        errorMessage: state.error,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default MainState;
