import { Dispatch } from "react";
import { Id, ImageTypeInForm, MaybeImageTypeInDatabase, Token } from "./global";
import { Part } from "./part";

export type User = {
  id: Id;
  name: string;
  username: string;
  password: string;
  phone: string;
  role_id: number;
  role_name: string;
  parts: Part[];
};

export type LoginInputs = {
  username: string;
  password: string;
};
export type ChangeProfileInputs = {
  name: string;
};

export type AuthStateType = {
  user: User | null;
  token: Token | null;
};
export type AuthContextType = {
  state: AuthStateType;
  dispatch: Dispatch<any>;
};

export type AuthPayload = {
  user: User;
  token: Token;
};

export type AuthActionType = {
  type: string;
  payload?: AuthPayload;
};

export type UserCardProps = User & { index?: number };
export type AddUserInputs = {
  username: string;
  password: string;
  role_id: Id;
  phone?: string;
  name?: string;
};

export type AddUserF = AddUserInputs & {
  part_ids: Id[];
};

export type UpdateUserF = AddUserInputs & {
  part_ids: Id[];
};
export type UpdateUserWithFirebaseImage = AddUserInputs & {
  part_ids: Id[];
};

export type LoginF = LoginInputs;
export type ChangeProfileF = ChangeProfileInputs;

export type GetUsersQ = User[];
export type AddUserQ = User;
export type DeleteUserQ = Id[];

export type UpdateUserQ = User;

export type AuthQ = User;

export type GetAuthQ = AuthQ;
export type LoginQ = {
  user: AuthQ;
  token: Token;
};
export type ChangeProfileQ = User;
export type ChangePasswordQ = User;
