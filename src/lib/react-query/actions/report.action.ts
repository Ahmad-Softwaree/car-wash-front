import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Expense, GetExpensesQ } from "@/types/expense";
import {
  Filter,
  From,
  Limit,
  Page,
  PaginationReturnType,
  Search,
  To,
  ToastType,
} from "@/types/global";
import {
  GetItemQuantityHistoriesReportQ,
  GetItemsQ,
  GetItemsReportQ,
  Item,
  ItemQuantityHistory,
} from "@/types/items";
import {
  BillProfitReportData,
  BillProfitReportInfo,
  CaseReport,
  CaseReportData,
  CaseReportInfo,
  ExpenseReportData,
  ExpenseReportInfo,
  GetCasesQ,
  GlobalCaseInfo,
  ItemProfitReportData,
  ItemProfitReportInfo,
  ItemReportData,
  ItemReportInfo,
  KogaAllReportData,
  KogaAllReportInfo,
  KogaLessReportData,
  KogaLessReportInfo,
  KogaMovementReportData,
  KogaMovementReportInfo,
  KogaNullReportData,
  KogaNullReportInfo,
  ReservationReportData,
  ReservationReportInfo,
  SellReportData,
  SellReportInfo,
} from "@/types/report";
import { GetReservationsQ, Reservation } from "@/types/reservation";
import { GetSellsQ, Sell, SellItem } from "@/types/sell";

//SELL REPORT

export const getSellReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To,
  userFilter: Filter
): Promise<PaginationReturnType<GetSellsQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetSellsQ>>(
      `${URLs.GET_SELL_REPORTS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getSellReportInformation = async (
  toast: ToastType,
  from: From,
  to: To,
  userFilter: Filter
): Promise<SellReportInfo> => {
  try {
    const { data, status } = await authApi.get<SellReportInfo>(
      `${URLs.GET_SELL_REPORTS_INFORMATION}?from=${from != "" ? from : ""}&to=${
        to != "" ? to : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getSellReportSearch = async (
  toast: ToastType,

  search: Search
): Promise<GetSellsQ> => {
  try {
    const { data, status } = await authApi.get<GetSellsQ>(
      `${URLs.GET_SELL_REPORTS_SEARCH}?search=${search != "" ? search : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getSellReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<SellReportInfo> => {
  try {
    const { data, status } = await authApi.get<SellReportInfo>(
      `${URLs.GET_SELL_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const sellReportPrint = async (
  search: Search,
  from: From,
  to: To,
  userFilter: Filter
): Promise<{ sell: SellReportData[]; info: SellReportInfo }> => {
  try {
    const { data } = await authApi.post<{
      sell: SellReportData[];
      info: SellReportInfo;
    }>(
      `${URLs.SELL_PRINT_DATA}?search=${search != "" ? search : ""}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//ITEM_REPORT

export const getItemReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<PaginationReturnType<GetItemsReportQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetItemsReportQ>
    >(
      `${URLs.GET_ITEM_REPORTS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getItemReportInformation = async (
  toast: ToastType,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<ItemReportInfo> => {
  try {
    const { data, status } = await authApi.get<ItemReportInfo>(
      `${URLs.GET_ITEM_REPORTS_INFORMATION}?from=${from != "" ? from : ""}&to=${
        to != "" ? to : ""
      }&filter=${filter != "" ? filter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getItemReportSearch = async (
  toast: ToastType,
  search: Search
): Promise<GetItemsQ> => {
  try {
    const { data, status } = await authApi.get<GetItemsQ>(
      `${URLs.GET_ITEM_REPORTS_SEARCH}?search=${search != "" ? search : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getItemReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<ItemReportInfo> => {
  try {
    const { data, status } = await authApi.get<ItemReportInfo>(
      `${URLs.GET_ITEM_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const itemPrint = async (
  search: Search,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<{ item: ItemReportData[]; info: ItemReportInfo }> => {
  try {
    const { data } = await authApi.post<{
      item: ItemReportData[];
      info: ItemReportInfo;
    }>(
      `${URLs.ITEM_PRINT_DATA}?search=${search != "" ? search : ""}&from=${
        from != "" ? from : ""
      }&filter=${filter != "" ? filter : ""}&to=${
        to != "" ? to : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//KOGA_ALL REPORT

export const getKogaAllReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  userFilter: Filter
): Promise<PaginationReturnType<GetItemsReportQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetItemsReportQ>
    >(
      `${URLs.GET_KOGA_ALL_REPORTS}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getKogaAllReportInformation = async (
  toast: ToastType,
  filter: Filter,
  userFilter: Filter
): Promise<KogaAllReportInfo> => {
  try {
    const { data, status } = await authApi.get<KogaAllReportInfo>(
      `${URLs.GET_KOGA_ALL_REPORTS_INFORMATION}?filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getKogaAllReportSearch = async (
  toast: ToastType,
  search: Search
): Promise<GetItemsQ> => {
  try {
    const { data, status } = await authApi.get<GetItemsQ>(
      `${URLs.GET_KOGA_ALL_REPORTS_SEARCH}?search=${search != "" ? search : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getKogaAllReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<KogaAllReportInfo> => {
  try {
    const { data, status } = await authApi.get<KogaAllReportInfo>(
      `${URLs.GET_KOGA_ALL_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const kogaAllPrint = async (
  search: Search,
  filter: Filter,
  userFilter: Filter
): Promise<{
  item: KogaAllReportData[];
  info: KogaAllReportInfo;
}> => {
  try {
    const { data } = await authApi.post<{
      item: KogaAllReportData[];
      info: KogaAllReportInfo;
    }>(
      `${URLs.KOGA_ALL_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&filter=${filter != "" ? filter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//KOGA NULL REPORT

export const getKogaNullReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  userFilter: Filter
): Promise<PaginationReturnType<GetItemsReportQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetItemsReportQ>
    >(
      `${URLs.GET_KOGA_NULL_REPORTS}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getKogaNullReportInformation = async (
  toast: ToastType,
  filter: Filter,
  userFilter: Filter
): Promise<KogaNullReportInfo> => {
  try {
    const { data, status } = await authApi.get<KogaNullReportInfo>(
      `${URLs.GET_KOGA_NULL_REPORTS_INFORMATION}?filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getKogaNullReportSearch = async (
  toast: ToastType,

  search: Search
): Promise<GetItemsQ> => {
  try {
    const { data, status } = await authApi.get<GetItemsQ>(
      `${URLs.GET_KOGA_NULL_REPORTS_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getKogaNullReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<KogaNullReportInfo> => {
  try {
    const { data, status } = await authApi.get<KogaNullReportInfo>(
      `${URLs.GET_KOGA_NULL_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const kogaNullPrint = async (
  search: Search,
  filter: Filter,
  userFilter: Filter
): Promise<{
  item: KogaNullReportData[];
  info: KogaNullReportInfo;
}> => {
  try {
    const { data } = await authApi.post<{
      item: KogaNullReportData[];
      info: KogaNullReportInfo;
    }>(
      `${URLs.KOGA_NULL_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&filter=${filter != "" ? filter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//KOGA LESS REPORT

export const getKogaLessReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  userFilter: Filter
): Promise<PaginationReturnType<GetItemsReportQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetItemsReportQ>
    >(
      `${URLs.GET_KOGA_LESS_REPORTS}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getKogaLessReportInformation = async (
  toast: ToastType,
  filter: Filter,
  userFilter: Filter
): Promise<KogaLessReportInfo> => {
  try {
    const { data, status } = await authApi.get<KogaLessReportInfo>(
      `${URLs.GET_KOGA_LESS_REPORTS_INFORMATION}?filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getKogaLessReportSearch = async (
  toast: ToastType,

  search: Search
): Promise<GetItemsQ> => {
  try {
    const { data, status } = await authApi.get<GetItemsQ>(
      `${URLs.GET_KOGA_LESS_REPORTS_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getKogaLessReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<KogaLessReportInfo> => {
  try {
    const { data, status } = await authApi.get<KogaLessReportInfo>(
      `${URLs.GET_KOGA_LESS_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const kogaLessPrint = async (
  search: Search,
  filter: Filter,
  userFilter: Filter
): Promise<{
  item: KogaLessReportData[];
  info: KogaLessReportInfo;
}> => {
  try {
    const { data } = await authApi.post<{
      item: KogaLessReportData[];
      info: KogaLessReportInfo;
    }>(
      `${URLs.KOGA_LESS_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&filter=${filter != "" ? filter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//KOGA MOVEMENT REPORT

export const getKogaMovementReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<PaginationReturnType<GetItemQuantityHistoriesReportQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetItemQuantityHistoriesReportQ>
    >(
      `${URLs.GET_KOGA_MOVEMENT_REPORTS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getKogaMovementReportInformation = async (
  toast: ToastType,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<KogaMovementReportInfo> => {
  try {
    const { data, status } = await authApi.get<KogaMovementReportInfo>(
      `${URLs.GET_KOGA_MOVEMENT_REPORTS_INFORMATION}?from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getKogaMovementReportSearch = async (
  toast: ToastType,

  search: Search
): Promise<GetItemQuantityHistoriesReportQ> => {
  try {
    const { data, status } = await authApi.get<GetItemQuantityHistoriesReportQ>(
      `${URLs.GET_KOGA_MOVEMENT_REPORTS_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getKogaMovementReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<KogaMovementReportInfo> => {
  try {
    const { data, status } = await authApi.get<KogaMovementReportInfo>(
      `${URLs.GET_KOGA_MOVEMENT_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const kogaMovementPrint = async (
  search: Search,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<{
  item: KogaMovementReportData[];
  info: KogaMovementReportInfo;
}> => {
  try {
    const { data } = await authApi.post<{
      item: KogaMovementReportData[];
      info: KogaMovementReportInfo;
    }>(
      `${URLs.KOGA_MOVEMENT_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}&filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//BILL_PROFIT REPORT

export const getBillProfitReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To,
  userFilter: Filter
): Promise<PaginationReturnType<GetSellsQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetSellsQ>>(
      `${URLs.GET_BILL_PROFIT_REPORTS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getBillProfitReportInformation = async (
  toast: ToastType,
  from: From,
  to: To,
  userFilter: Filter
): Promise<BillProfitReportInfo> => {
  try {
    const { data, status } = await authApi.get<BillProfitReportInfo>(
      `${URLs.GET_BILL_PROFIT_REPORTS_INFORMATION}?from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getBillProfitReportSearch = async (
  toast: ToastType,

  search: Search
): Promise<GetSellsQ> => {
  try {
    const { data, status } = await authApi.get<GetSellsQ>(
      `${URLs.GET_BILL_PROFIT_REPORTS_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getBillProfitReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<BillProfitReportInfo> => {
  try {
    const { data, status } = await authApi.get<BillProfitReportInfo>(
      `${URLs.GET_BILL_PROFIT_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const billProfitPrint = async (
  search: Search,
  from: From,
  to: To,
  userFilter: Filter
): Promise<{
  sell: BillProfitReportData[];
  info: BillProfitReportInfo;
}> => {
  try {
    const { data } = await authApi.post<{
      sell: BillProfitReportData[];
      info: BillProfitReportInfo;
    }>(
      `${URLs.BILL_PROFIT_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//ITEM_PROFIT

export const getItemProfitReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<PaginationReturnType<GetItemsReportQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetItemsReportQ>
    >(
      `${URLs.GET_ITEM_PROFIT_REPORTS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getItemProfitReportInformation = async (
  toast: ToastType,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<ItemProfitReportInfo> => {
  try {
    const { data, status } = await authApi.get<ItemProfitReportInfo>(
      `${URLs.GET_ITEM_PROFIT_REPORTS_INFORMATION}?from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getItemProfitReportSearch = async (
  toast: ToastType,
  search: Search
): Promise<GetItemsQ> => {
  try {
    const { data, status } = await authApi.get<GetItemsQ>(
      `${URLs.GET_ITEM_PROFIT_REPORTS_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getItemProfitReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<ItemProfitReportInfo> => {
  try {
    const { data, status } = await authApi.get<ItemProfitReportInfo>(
      `${URLs.GET_ITEM_PROFIT_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const itemProfitPrint = async (
  search: Search,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<{
  item: ItemProfitReportData[];
  info: ItemProfitReportInfo;
}> => {
  try {
    const { data } = await authApi.post<{
      item: ItemProfitReportData[];
      info: ItemProfitReportInfo;
    }>(
      `${URLs.ITEM_PROFIT_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}&filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//EXPENSE_REPORT

export const getExpenseReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<PaginationReturnType<GetExpensesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetExpensesQ>
    >(
      `${URLs.GET_EXPENSE_REPORTS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getExpenseReportInformation = async (
  toast: ToastType,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<ExpenseReportInfo> => {
  try {
    const { data, status } = await authApi.get<ExpenseReportInfo>(
      `${URLs.GET_EXPENSE_REPORTS_INFORMATION}?from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getExpenseReportSearch = async (
  toast: ToastType,
  search: Search
): Promise<GetExpensesQ> => {
  try {
    const { data, status } = await authApi.get<GetExpensesQ>(
      `${URLs.GET_EXPENSE_REPORTS_SEARCH}?search=${search != "" ? search : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getExpenseReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<ExpenseReportInfo> => {
  try {
    const { data, status } = await authApi.get<ExpenseReportInfo>(
      `${URLs.GET_EXPENSE_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const expenseReportPrint = async (
  search: Search,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<{
  info: ExpenseReportInfo;
  expense: ExpenseReportData[];
}> => {
  try {
    const { data } = await authApi.post<{
      info: ExpenseReportInfo;
      expense: ExpenseReportData[];
    }>(
      `${URLs.EXPENSE_PRINT_DATA}?search=${search != "" ? search : ""}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&filter=${
        filter != "" ? filter : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//CASE_REPORT

export const getCaseReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To,
  userFilter: Filter
): Promise<PaginationReturnType<GetCasesQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetCasesQ>>(
      `${URLs.GET_CASE_REPORTS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getCaseReportInformation = async (
  toast: ToastType,
  from: From,
  to: To,
  userFilter: Filter
): Promise<CaseReportInfo> => {
  try {
    const { data, status } = await authApi.get<CaseReportInfo>(
      `${URLs.GET_CASE_REPORTS_INFORMATION}?from=${from != "" ? from : ""}&to=${
        to != "" ? to : ""
      }&userFilter=${userFilter != "" ? userFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getCaseReportSearch = async (
  toast: ToastType,

  search: Search
): Promise<GetCasesQ> => {
  try {
    const { data, status } = await authApi.get<GetCasesQ>(
      `${URLs.GET_CASE_REPORTS_SEARCH}?search=${search != "" ? search : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getCaseReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<CaseReportInfo> => {
  try {
    const { data, status } = await authApi.get<CaseReportInfo>(
      `${URLs.GET_CASE_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const caseReportPrint = async (
  search: Search,
  from: From,
  to: To,
  userFilter: Filter
): Promise<{
  data: CaseReportData[];
  info: CaseReportInfo;
}> => {
  try {
    const { data } = await authApi.post<{
      data: CaseReportData[];
      info: CaseReportInfo;
    }>(
      `${URLs.CASE_PRINT_DATA}?search=${search != "" ? search : ""}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//CASE GLOBAL DATA

export const getCaseGlobalData = async (
  toast: ToastType,
  from: From,
  to: To
): Promise<GlobalCaseInfo> => {
  try {
    const { data, status } = await authApi.get<GlobalCaseInfo>(
      `${URLs.GET_CASE_GLOBAL_DATA}?from=${from != "" ? from : ""}&to=${
        to != "" ? to : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

//RESERVATION_REPORT

export const getReservationReport = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To,
  colorFilter: Filter,
  carModelFilter: Filter,
  carTypeFilter: Filter,
  serviceFilter: Filter,
  userFilter: Filter
): Promise<PaginationReturnType<GetReservationsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetReservationsQ>
    >(
      `${URLs.GET_RESERVATION_REPORTS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&colorFilter=${
        colorFilter != "" ? colorFilter : ""
      }&carModelFilter=${
        carModelFilter != "" ? carModelFilter : ""
      }&carTypeFilter=${
        carTypeFilter != "" ? carTypeFilter : ""
      }&serviceFilter=${serviceFilter != "" ? serviceFilter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getReservationReportInformation = async (
  toast: ToastType,
  from: From,
  to: To,
  colorFilter: Filter,
  carModelFilter: Filter,
  carTypeFilter: Filter,
  serviceFilter: Filter,
  userFilter: Filter
): Promise<ReservationReportInfo> => {
  try {
    const { data, status } = await authApi.get<ReservationReportInfo>(
      `${URLs.GET_RESERVATION_REPORTS_INFORMATION}?from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&colorFilter=${
        colorFilter != "" ? colorFilter : ""
      }&carModelFilter=${
        carModelFilter != "" ? carModelFilter : ""
      }&carTypeFilter=${
        carTypeFilter != "" ? carTypeFilter : ""
      }&serviceFilter=${serviceFilter != "" ? serviceFilter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getReservationReportSearch = async (
  toast: ToastType,

  search: Search
): Promise<GetReservationsQ> => {
  try {
    const { data, status } = await authApi.get<GetReservationsQ>(
      `${URLs.GET_RESERVATION_REPORTS_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getReservationReportInformationSearch = async (
  toast: ToastType,
  search: Search
): Promise<ReservationReportInfo> => {
  try {
    const { data, status } = await authApi.get<ReservationReportInfo>(
      `${URLs.GET_RESERVATION_REPORTS_INFORMATION_SEARCH}?search=${
        search != "" ? search : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const reservationReportPrint = async (
  search: Search,
  from: From,
  to: To,
  colorFilter: Filter,
  carModelFilter: Filter,
  carTypeFilter: Filter,
  serviceFilter: Filter,
  userFilter: Filter
): Promise<{
  reservations: ReservationReportData[];
  info: ReservationReportInfo;
}> => {
  try {
    const { data } = await authApi.post<{
      reservations: ReservationReportData[];
      info: ReservationReportInfo;
    }>(
      `${URLs.RESERVATION_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&colorFilter=${colorFilter != "" ? colorFilter : ""}&carModelFilter=${
        carModelFilter != "" ? carModelFilter : ""
      }&carTypeFilter=${
        carTypeFilter != "" ? carTypeFilter : ""
      }&serviceFilter=${serviceFilter != "" ? serviceFilter : ""}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
