import { GlobalActionType, GlobalStateType } from "@/types/global";
import { CONTEXT_TYPEs } from "../types";
import { ENUMs } from "@/lib/enum";

export const globalState: GlobalStateType = {
  oldData: null,
  checked: [],
  check_type: "one",
  theme: (localStorage.getItem("theme") as "dark" | "light") || "dark",
  sellPrintData: {
    sell: null,
    sellItems: [],
  },
  sellReportData: {
    sell: [],
    info: null,
  },
  itemReportData: {
    item: [],
    info: null,
  },
  kogaAllReportData: {
    item: [],
    info: null,
  },
  kogaNullReportData: {
    item: [],
    info: null,
  },
  kogaLessReportData: {
    item: [],
    info: null,
  },
  kogaMovementReportData: {
    item: [],
    info: null,
  },

  billProfitReportData: {
    sell: [],
    info: null,
  },
  itemProfitReportData: {
    item: [],
    info: null,
  },

  expenseReportData: {
    expense: [],
    info: null,
  },

  caseReportData: {
    data: [],
    info: null,
  },

  reservationReportData: {
    reservations: [],
    info: null,
  },
};

export const globalReducer = (
  state: GlobalStateType = globalState,
  action: GlobalActionType
): GlobalStateType => {
  const { type, payload } = action;
  switch (type) {
    case CONTEXT_TYPEs.SET_OLD_DATA:
      return {
        ...state,
        oldData: payload,
      };
    case CONTEXT_TYPEs.SELL_PRINT_DATA:
      return {
        ...state,
        sellPrintData: payload,
      };
    case CONTEXT_TYPEs.SELL_REPORT_PRINT_DATA:
      return {
        ...state,
        sellReportData: payload,
      };

    case CONTEXT_TYPEs.ITEM_REPORT_PRINT_DATA:
      return {
        ...state,
        itemReportData: payload,
      };

    case CONTEXT_TYPEs.KOGA_ALL_REPORT_DATA:
      return {
        ...state,
        kogaAllReportData: payload,
      };

    case CONTEXT_TYPEs.KOGA_NULL_REPORT_DATA:
      return {
        ...state,
        kogaNullReportData: payload,
      };

    case CONTEXT_TYPEs.KOGA_LESS_REPORT_DATA:
      return {
        ...state,
        kogaLessReportData: payload,
      };

    case CONTEXT_TYPEs.KOGA_MOVEMENT_REPORT_DATA:
      return {
        ...state,
        kogaMovementReportData: payload,
      };

    case CONTEXT_TYPEs.BILL_PROFIT_REPORT_DATA:
      return {
        ...state,
        billProfitReportData: payload,
      };

    case CONTEXT_TYPEs.ITEM_PROFIT_REPORT_DATA:
      return {
        ...state,
        itemProfitReportData: payload,
      };
    case CONTEXT_TYPEs.EXPENSE_REPORT_DATA:
      return {
        ...state,
        expenseReportData: payload,
      };
    case CONTEXT_TYPEs.CASE_REPORT_DATA:
      return {
        ...state,
        caseReportData: payload,
      };

    case CONTEXT_TYPEs.RESERVATION_REPORT_DATA:
      return {
        ...state,
        reservationReportData: payload,
      };
    case CONTEXT_TYPEs.CHECK:
      var result = state.checked;
      var typee = state.check_type;
      if (payload?.length == 0) {
        result = [];
        typee = "one";
      } else {
        if (state.checked.length < ENUMs.CHECK_LIMIT) {
          if (Array.isArray(payload)) {
            //you give whole
            result = payload;
            typee = "all";
          } else {
            result.push(payload);
          }
        }
      }
      return {
        ...state,
        checked: result,
        check_type: typee,
      };
    case CONTEXT_TYPEs.UNCHECK:
      return {
        ...state,
        checked: state.checked.filter(
          (val: any, _index: number) => val != payload
        ),
      };
    case CONTEXT_TYPEs.THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};
