export interface UserInterface {
  firstName: string;
  lastName: string;
  password: string;
}
export interface UserReturnInterface {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
}
export interface UserAuthenticatedInterface {
  auth: boolean;
  token: string;
}
