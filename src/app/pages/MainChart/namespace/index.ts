import { OneDayType } from '@namespace/country';

export enum MainChartTypes {
  GET_DATA_BY_COUNTRY = 'GET_DATA_BY_COUNTRY',
}

export type ContextType = {
  data?: OneDayType[];
  getData?: () => Promise<void>;
};

export type State = {
  data?: OneDayType[];
};
