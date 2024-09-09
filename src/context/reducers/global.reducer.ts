import { GlobalActionType, GlobalStateType } from "@/types/global";
import { CONTEXT_TYPEs } from "../types";

export const globalState: GlobalStateType = {
  oldData: null,
};

export const globalReducer = (
  state: GlobalStateType = globalState,
  action: GlobalActionType
) => {
  const { type, payload } = action;
  switch (type) {
    case CONTEXT_TYPEs.SET_OLD_DATA:
      return {
        ...state,
        oldData: payload,
      };
    default:
      return state;
  }
};
