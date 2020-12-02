import { ApiEndpoints } from '@constants/constants';
import { CountryResponse } from '@namespace/index';
import ApiService from '../config';

export async function getDataByCountry(
  country: string,
): Promise<CountryResponse> {
  return ApiService.get(
    `${ApiEndpoints.COUNTRY}/${country}?from=2020-10-01T00:00:00Z&to=2020-10-07T00:00:00Z`,
  );
}
