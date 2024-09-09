import { Dispatch } from "react";
import { Id, ImageTypeInForm, MaybeImageTypeInDatabase, Token } from "./global";
import { Part } from "./part";

export type User = {
  id: Id;
  full_name: string;
  username: string;
  password: string;
  phone: string;
  street: string;
  role_id: number;
  role_name: string;

  parts: Part[];
};

export type LoginInputs = {
  username: string;
  password: string;
};
export type ChangeNameInputs = {
  full_name: string;
};

export type ChangePasswordInputs = {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
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

export type UserCardProps = User;
export type AddUserInputs = {
  username: string;
  password: string;
  role_id: Id;
  street?: string;
  phone?: string;
  full_name?: string;
};

export type AddUserF = AddUserInputs & {
  employee_id: Id;
  part_ids: Id[];
};

export type UpdateUserF = AddUserInputs & {
  part_ids: Id[];
};
export type UpdateUserWithFirebaseImage = AddUserInputs & {
  part_ids: Id[];
};

export type LoginF = LoginInputs;
export type ChangeNameF = ChangeNameInputs;

export type ChangePasswordF = ChangePasswordInputs;
export type GetUsersQ = User[];
export type AddUserQ = User;
export type DeleteUserQ = User;

export type UpdateUserQ = User;

export type AuthQ = User;

export type GetAuthQ = AuthQ;
export type LoginQ = {
  user: AuthQ;
  token: Token;
};
export type ChangeNameQ = User;
export type ChangePasswordQ = User;
