export interface ContextType {
  user?: any;
  signin?: (name: string, password: string) => void;
  signup?: (name: string, password: string) => void;
  setNotToDrawAction?: (id: number) => void;
  errorMessage?: string;
  users?: any[];
}

export interface StateType {
  user?: any;
  error?: string;
}

export enum MainTypes {
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP',
  SET_NOT_TO_DRAW = 'SET_NOT_TO_DRAW',
}

export type userType = {
  drawnperson?: number;
  id: number;
  isadmin?: boolean;
  name: string;
  nottodraw?: number;
};
