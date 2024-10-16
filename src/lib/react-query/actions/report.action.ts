import { authApi, pdfFileAuthApi } from "@/lib/config/api.config";
import { downloadFile, generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { GetExpensesQ } from "@/types/expense";
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
} from "@/types/items";
import {
  BillProfitReportInfo,
  CaseReportInfo,
  ExpenseReportInfo,
  GetCasesQ,
  GlobalCaseInfo,
  ItemProfitReportInfo,
  ItemReportInfo,
  KogaAllReportInfo,
  KogaLessReportInfo,
  KogaMovementReportInfo,
  KogaNullReportInfo,
  ReservationReportInfo,
  SellReportInfo,
} from "@/types/report";
import { GetReservationsQ } from "@/types/reservation";
import { GetSellsQ } from "@/types/sell";

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

export const sellPrint = async (
  toast: ToastType,
  search: Search,
  from: From,
  to: To,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.SELL_PRINT_DATA}?search=${search != "" ? search : ""}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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
  toast: ToastType,
  search: Search,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.ITEM_PRINT_DATA}?search=${search != "" ? search : ""}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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
  toast: ToastType,
  search: Search,
  filter: Filter,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.KOGA_ALL_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&filter=${filter != "" ? filter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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
  toast: ToastType,
  search: Search,
  filter: Filter,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.KOGA_NULL_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&filter=${filter != "" ? filter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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
  toast: ToastType,
  search: Search,
  filter: Filter,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.KOGA_LESS_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&filter=${filter != "" ? filter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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
  toast: ToastType,
  filter: Filter,
  search: Search,
  from: From,
  to: To,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.KOGA_MOVEMENT_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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
  toast: ToastType,
  search: Search,
  from: From,
  to: To,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.BILL_PROFIT_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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
  toast: ToastType,
  search: Search,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.ITEM_PROFIT_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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
  toast: ToastType,
  search: Search,
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.EXPENSE_PRINT_DATA}?search=${search != "" ? search : ""}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }&filter=${filter != "" ? filter : ""}`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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

export const casePrint = async (
  toast: ToastType,
  search: Search,
  from: From,
  to: To,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.CASE_PRINT_DATA}?search=${search != "" ? search : ""}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
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

export const reservationPrint = async (
  toast: ToastType,
  search: Search,
  from: From,
  to: To,
  colorFilter: Filter,
  carModelFilter: Filter,
  carTypeFilter: Filter,
  serviceFilter: Filter,
  userFilter: Filter
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get<any>(
      `${URLs.RESERVATION_PRINT_DATA}?search=${
        search != "" ? search : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}&colorFilter=${
        colorFilter != "" ? colorFilter : ""
      }&carModelFilter=${
        carModelFilter != "" ? carModelFilter : ""
      }&carTypeFilter=${
        carTypeFilter != "" ? carTypeFilter : ""
      }&serviceFilter=${serviceFilter != "" ? serviceFilter : ""}&userFilter=${
        userFilter != "" ? userFilter : ""
      }`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
