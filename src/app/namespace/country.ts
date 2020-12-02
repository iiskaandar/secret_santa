export interface CountryResponse {
  countries: OneDayType[];
}

export interface OneDayType {
  Country: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}
