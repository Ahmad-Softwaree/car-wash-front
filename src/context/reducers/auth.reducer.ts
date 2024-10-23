import { AuthActionType, AuthStateType } from "@/types/auth";
import { CONTEXT_TYPEs } from "../types";

export const authState: AuthStateType = {
  user: null,
  token: null,
};

export const authReducer = (
  state: AuthStateType = authState,
  action: AuthActionType
): AuthStateType => {
  const { type, payload } = action;
  switch (type) {
    case CONTEXT_TYPEs.SET_USER:
      return {
        ...state,
        user: payload ? payload.user : null,
        token: payload?.token ? payload?.token : state.token,
      };
    case CONTEXT_TYPEs.REMOVE_USER:
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
