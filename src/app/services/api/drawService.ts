import { ApiEndpoints } from '@constants/constants';
import ApiService from '../config';

export async function signIn(name: string, password: string): Promise<any> {
  return ApiService.post(`${ApiEndpoints.SIGNIN}`, { name, password });
}

export async function signUp(name: string, password: string): Promise<any> {
  return ApiService.post(`${ApiEndpoints.SIGNUP}`, { name, password });
}

export async function getUsers(): Promise<any> {
  return ApiService.get(`${ApiEndpoints.USERS}`);
}

export async function setNotToDraw(id: number, userId: number): Promise<any> {
  return ApiService.put(`${ApiEndpoints.NOT_TO_DRAW}`, { id, userId });
}

export async function startDraw(): Promise<any> {
  return ApiService.get(`${ApiEndpoints.DRAW}`);
}
