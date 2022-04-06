export interface UserInterface {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserAuthenticatedInterface {
  auth: boolean;
  token: string;
}
