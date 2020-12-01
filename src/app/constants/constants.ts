export enum ErrorCodes {
  UNAUTHORIZED = 401,
  ACCESS_DENIED = 403,
  NOT_FOUND = 404,
}

export enum ApiEndpoints {
  COUNTRY = 'country',
  SIGNIN = 'auth/signin',
  SIGNUP = 'auth/signup',
  USERS = 'users',
  NOT_TO_DRAW = 'user/nottodraw',
  DRAW = 'draw',
}
