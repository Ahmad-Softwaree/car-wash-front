import { useToast } from "@/components/ui/use-toast";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { GetSellsQ } from "@/types/sell";
import {
  billProfitPrint,
  casePrint,
  expenseReportPrint,
  getBillProfitReport,
  getBillProfitReportInformation,
  getBillProfitReportInformationSearch,
  getBillProfitReportSearch,
  getCaseGlobalData,
  getCaseReport,
  getCaseReportInformation,
  getCaseReportInformationSearch,
  getCaseReportSearch,
  getExpenseReport,
  getExpenseReportInformation,
  getExpenseReportInformationSearch,
  getExpenseReportSearch,
  getItemProfitReport,
  getItemProfitReportInformation,
  getItemProfitReportInformationSearch,
  getItemProfitReportSearch,
  getItemReport,
  getItemReportInformation,
  getItemReportInformationSearch,
  getItemReportSearch,
  getKogaAllReport,
  getKogaAllReportInformation,
  getKogaAllReportInformationSearch,
  getKogaAllReportSearch,
  getKogaMovementReport,
  getKogaMovementReportInformation,
  getKogaMovementReportInformationSearch,
  getKogaMovementReportSearch,
  getKogaNullReport,
  getKogaNullReportInformation,
  getKogaNullReportInformationSearch,
  getKogaNullReportSearch,
  getReservationReport,
  getReservationReportInformation,
  getReservationReportInformationSearch,
  getReservationReportSearch,
  getSellReport,
  getSellReportInformation,
  getSellReportInformationSearch,
  getSellReportSearch,
  itemPrint,
  itemProfitPrint,
  kogaAllPrint,
  kogaMovementPrint,
  kogaNullPrint,
  reservationPrint,
  sellPrint,
} from "../actions/report.action";
import {
  Filter,
  From,
  Page,
  PaginationReturnType,
  Search,
  To,
} from "@/types/global";
import { ENUMs } from "@/lib/enum";
import {
  GetItemQuantityHistoriesReportQ,
  GetItemsQ,
  GetItemsReportQ,
} from "@/types/items";
import { GetExpensesQ } from "@/types/expense";
import {
  BillProfitReportInfo,
  CaseReportInfo,
  ExpenseReportInfo,
  GetCasesQ,
  GlobalCaseInfo,
  ItemProfitReportInfo,
  ItemReportInfo,
  KogaAllReportInfo,
  KogaMovementReportInfo,
  KogaNullReportInfo,
  ReservationReportInfo,
  SellReportInfo,
} from "@/types/report";
import { GetReservationsQ } from "@/types/reservation";

//SELL REPORT
export const useGetSellReport = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.SELL_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetSellsQ>> =>
      getSellReport(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetSellReportInformation = (from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL_REPORT_INFORMATION],
    queryFn: (): Promise<SellReportInfo> =>
      getSellReportInformation(toast, from, to),
    retry: 0,
  });
};

export const useGetSellReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL_REPORT_SEARCH],
    queryFn: (): Promise<GetSellsQ> => getSellReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetSellReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.SELL_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<SellReportInfo> =>
      getSellReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useSellPrint = (search: Search, from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL_PRINT_DATA],
    queryFn: (): Promise<Blob | null> => sellPrint(toast, search, from, to),
    retry: 0,
  });
};

//ITEM REPORT

export const useGetItemReport = (filter: Filter, from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getItemReport(toast, pageParam, ENUMs.LIMIT as number, filter, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetItemReportInformation = (
  filter: Filter,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT_INFORMATION],
    queryFn: (): Promise<ItemReportInfo> =>
      getItemReportInformation(toast, filter, from, to),
    retry: 0,
  });
};

export const useGetItemReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT_SEARCH],
    queryFn: (): Promise<GetItemsQ> => getItemReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetItemReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<ItemReportInfo> =>
      getItemReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useItemPrint = (
  filter: Filter,
  search: Search,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_PRINT_DATA],
    queryFn: (): Promise<Blob | null> =>
      itemPrint(toast, search, filter, from, to),
    retry: 0,
  });
};

//KOGA_ALL REPORT

export const useGetKogaAllReport = (filter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getKogaAllReport(toast, pageParam, ENUMs.LIMIT as number, filter),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetKogaAllReportInformation = (filter: Filter) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT_INFORMATION],
    queryFn: (): Promise<KogaAllReportInfo> =>
      getKogaAllReportInformation(toast, filter),
    retry: 0,
  });
};

export const useGetKogaAllReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT_SEARCH],
    queryFn: (): Promise<GetItemsQ> => getKogaAllReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetKogaAllReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<KogaAllReportInfo> =>
      getKogaAllReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useKogaAllPrint = (search: Search, filter: Filter) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_PRINT_DATA],
    queryFn: (): Promise<Blob | null> => kogaAllPrint(toast, search, filter),
    retry: 0,
  });
};

//KOGA NULL REPORT

export const useGetKogaNullReport = (filter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.KOGA_NULL_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getKogaNullReport(toast, pageParam, ENUMs.LIMIT as number, filter),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetKogaNullReportInformation = (filter: Filter) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_NULL_REPORT_INFORMATION],
    queryFn: (): Promise<KogaNullReportInfo> =>
      getKogaNullReportInformation(toast, filter),
    retry: 0,
  });
};

export const useGetKogaNullReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_NULL_REPORT_SEARCH],
    queryFn: (): Promise<GetItemsQ> => getKogaNullReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetKogaNullReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_NULL_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<KogaNullReportInfo> =>
      getKogaNullReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useKogaNullPrint = (search: Search, filter: Filter) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_NULL_PRINT_DATA],
    queryFn: (): Promise<Blob | null> => kogaNullPrint(toast, search, filter),
    retry: 0,
  });
};

//KOGA MOVEMENT REPORT

export const useGetKogaMovementReport = (
  filter: Filter,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.KOGA_MOVEMENT_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemQuantityHistoriesReportQ>> =>
      getKogaMovementReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        from,
        to
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetKogaMovementReportInformation = (
  filter: Filter,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_MOVEMENT_REPORT_INFORMATION],
    queryFn: (): Promise<KogaMovementReportInfo> =>
      getKogaMovementReportInformation(toast, filter, from, to),
    retry: 0,
  });
};

export const useGetKogaMovementReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_MOVEMENT_REPORT_SEARCH],
    queryFn: (): Promise<GetItemQuantityHistoriesReportQ> =>
      getKogaMovementReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetKogaMovementReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_MOVEMENT_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<KogaMovementReportInfo> =>
      getKogaMovementReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useKogaMovementPrint = (
  filter: Filter,
  search: Search,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_MOVEMENT_PRINT_DATA],
    queryFn: (): Promise<Blob | null> =>
      kogaMovementPrint(toast, filter, search, from, to),
    retry: 0,
  });
};

//BILL PROFIT REPORT

export const useGetBillProfitReport = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.BILL_PROFIT_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetSellsQ>> =>
      getBillProfitReport(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetBillProfitReportInformation = (from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.BILL_PROFIT_REPORT_INFORMATION],
    queryFn: (): Promise<BillProfitReportInfo> =>
      getBillProfitReportInformation(toast, from, to),
    retry: 0,
  });
};

export const useGetBillProfitReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.BILL_PROFIT_REPORT_SEARCH],
    queryFn: (): Promise<GetSellsQ> => getBillProfitReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetBillProfitReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.BILL_PROFIT_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<BillProfitReportInfo> =>
      getBillProfitReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useBillProfitPrint = (search: Search, from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.BILL_PROFIT_PRINT_DATA],
    queryFn: (): Promise<Blob | null> =>
      billProfitPrint(toast, search, from, to),
    retry: 0,
  });
};

//ITEM_PROFIT_REPORT

export const useGetItemProfitReport = (filter: Filter, from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.ITEM_PROFIT_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getItemProfitReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        from,
        to
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetItemProfitReportInformation = (
  filter: Filter,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_PROFIT_REPORT_INFORMATION],
    queryFn: (): Promise<ItemProfitReportInfo> =>
      getItemProfitReportInformation(toast, filter, from, to),
    retry: 0,
  });
};

export const useGetItemProfitReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_PROFIT_REPORT_SEARCH],
    queryFn: (): Promise<GetItemsQ> => getItemProfitReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetItemProfitReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_PROFIT_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<ItemProfitReportInfo> =>
      getItemProfitReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useItemProfitPrint = (
  filter: Filter,
  search: Search,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_PRINT_DATA],
    queryFn: (): Promise<Blob | null> =>
      itemProfitPrint(toast, search, filter, from, to),
    retry: 0,
  });
};

//EXPENSE_REPORT

export const useGetExpenseReport = (filter: Filter, from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.EXPENSE_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetExpensesQ>> =>
      getExpenseReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        from,
        to
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetExpenseReportInformation = (
  filter: Filter,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.EXPENSE_REPORT_INFORMATION],
    queryFn: (): Promise<ExpenseReportInfo> =>
      getExpenseReportInformation(toast, filter, from, to),
    retry: 0,
  });
};

export const useGetExpenseReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.EXPENSE_REPORT_SEARCH],
    queryFn: (): Promise<GetExpensesQ> => getExpenseReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetExpenseReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.EXPENSE_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<ExpenseReportInfo> =>
      getExpenseReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useExpensePrint = (
  filter: Filter,
  search: Search,
  from: From,
  to: To
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.EXPENSE_PRINT_DATA],
    queryFn: (): Promise<Blob | null> =>
      expenseReportPrint(toast, search, filter, from, to),
    retry: 0,
  });
};

//CASE_REPORT
export const useGetCaseReport = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.CASE_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCasesQ>> =>
      getCaseReport(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetCaseReportInformation = (from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CASE_REPORT_INFORMATION],
    queryFn: (): Promise<CaseReportInfo> =>
      getCaseReportInformation(toast, from, to),
    retry: 0,
  });
};

export const useGetCaseReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CASE_REPORT_SEARCH],
    queryFn: (): Promise<GetCasesQ> => getCaseReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetCaseReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.CASE_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<CaseReportInfo> =>
      getCaseReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useCasePrint = (search: Search, from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CASE_PRINT_DATA],
    queryFn: (): Promise<Blob | null> => casePrint(toast, search, from, to),
    retry: 0,
  });
};

//CASE GLOBAL DATA

export const useGetCaseGlobalData = (from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CASE_GLOBAL_DATA],
    queryFn: (): Promise<GlobalCaseInfo> => getCaseGlobalData(toast, from, to),
    retry: 0,
  });
};

//RESERVATION_REPORT
export const useGetReservationReport = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.RESERVATION_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetReservationsQ>> =>
      getReservationReport(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetReservationReportInformation = (from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.RESERVATION_REPORT_INFORMATION],
    queryFn: (): Promise<ReservationReportInfo> =>
      getReservationReportInformation(toast, from, to),
    retry: 0,
  });
};

export const useGetReservationReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.RESERVATION_REPORT_SEARCH],
    queryFn: (): Promise<GetReservationsQ> =>
      getReservationReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetReservationReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.RESERVATION_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<ReservationReportInfo> =>
      getReservationReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useReservationPrint = (search: Search, from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.RESERVATION_PRINT_DATA],
    queryFn: (): Promise<Blob | null> =>
      reservationPrint(toast, search, from, to),
    retry: 0,
  });
};
