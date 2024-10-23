import { useToast } from "@/components/ui/use-toast";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { GetSellsQ } from "@/types/sell";
import {
  billProfitPrint,
  caseReportPrint,
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
  getKogaLessReport,
  getKogaLessReportInformation,
  getKogaLessReportInformationSearch,
  getKogaLessReportSearch,
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
  kogaLessPrint,
  kogaMovementPrint,
  kogaNullPrint,
  reservationReportPrint,
  sellReportPrint,
} from "../actions/report.action";
import {
  Filter,
  From,
  NestError,
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
  Item,
  ItemQuantityHistory,
} from "@/types/items";
import { Expense, GetExpensesQ } from "@/types/expense";
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
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { generateNestErrors } from "@/lib/functions";

//SELL REPORT
export const useGetSellReport = (from: From, to: To, userFilter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.SELL_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetSellsQ>> =>
      getSellReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        from,
        to,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetSellReportInformation = (
  from: From,
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL_REPORT_INFORMATION],
    queryFn: (): Promise<SellReportInfo> =>
      getSellReportInformation(toast, from, to, userFilter),
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
export const useSellReportPrint = (
  search: Search,
  from: From,
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      sell: SellReportData[];
      info: SellReportInfo;
    }> => sellReportPrint(search, from, to, userFilter),
    onSuccess: (data: { sell: SellReportData[]; info: SellReportInfo }) => {
      return dispatch({
        type: CONTEXT_TYPEs.SELL_REPORT_PRINT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

//ITEM REPORT

export const useGetItemReport = (
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getItemReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        from,
        to,
        userFilter
      ),
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
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT_INFORMATION],
    queryFn: (): Promise<ItemReportInfo> =>
      getItemReportInformation(toast, filter, from, to, userFilter),
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
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      item: ItemReportData[];
      info: ItemReportInfo;
    }> => itemPrint(search, filter, from, to, userFilter),
    onSuccess: (data: { item: ItemReportData[]; info: ItemReportInfo }) => {
      return dispatch({
        type: CONTEXT_TYPEs.ITEM_REPORT_PRINT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

//KOGA_ALL REPORT

export const useGetKogaAllReport = (filter: Filter, userFilter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getKogaAllReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetKogaAllReportInformation = (
  filter: Filter,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT_INFORMATION],
    queryFn: (): Promise<KogaAllReportInfo> =>
      getKogaAllReportInformation(toast, filter, userFilter),
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
export const useKogaAllPrint = (
  filter: Filter,
  search: Search,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      item: KogaAllReportData[];
      info: KogaAllReportInfo;
    }> => kogaAllPrint(search, filter, userFilter),
    onSuccess: (data: {
      item: KogaAllReportData[];
      info: KogaAllReportInfo;
    }) => {
      return dispatch({
        type: CONTEXT_TYPEs.KOGA_ALL_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

//KOGA NULL REPORT

export const useGetKogaNullReport = (filter: Filter, userFilter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.KOGA_NULL_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getKogaNullReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetKogaNullReportInformation = (
  filter: Filter,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_NULL_REPORT_INFORMATION],
    queryFn: (): Promise<KogaNullReportInfo> =>
      getKogaNullReportInformation(toast, filter, userFilter),
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
export const useKogaNullPrint = (
  filter: Filter,
  search: Search,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      item: KogaNullReportData[];
      info: KogaNullReportInfo;
    }> => kogaNullPrint(search, filter, userFilter),
    onSuccess: (data: {
      item: KogaNullReportData[];
      info: KogaNullReportInfo;
    }) => {
      return dispatch({
        type: CONTEXT_TYPEs.KOGA_NULL_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
//KOGA LESS REPORT

export const useGetKogaLessReport = (filter: Filter, userFilter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.KOGA_LESS_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getKogaLessReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetKogaLessReportInformation = (
  filter: Filter,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_LESS_REPORT_INFORMATION],
    queryFn: (): Promise<KogaLessReportInfo> =>
      getKogaLessReportInformation(toast, filter, userFilter),
    retry: 0,
  });
};

export const useGetKogaLessReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_LESS_REPORT_SEARCH],
    queryFn: (): Promise<GetItemsQ> => getKogaLessReportSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useGetKogaLessReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_LESS_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<KogaLessReportInfo> =>
      getKogaLessReportInformationSearch(toast, search),
    retry: 0,
    enabled: typeof search === "string" && search.trim() !== "",
  });
};
export const useKogaLessPrint = (
  filter: Filter,
  search: Search,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      item: KogaLessReportData[];
      info: KogaLessReportInfo;
    }> => kogaLessPrint(search, filter, userFilter),
    onSuccess: (data: {
      item: KogaLessReportData[];
      info: KogaLessReportInfo;
    }) => {
      return dispatch({
        type: CONTEXT_TYPEs.KOGA_LESS_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

//KOGA MOVEMENT REPORT

export const useGetKogaMovementReport = (
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
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
        to,
        userFilter
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
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_MOVEMENT_REPORT_INFORMATION],
    queryFn: (): Promise<KogaMovementReportInfo> =>
      getKogaMovementReportInformation(toast, filter, from, to, userFilter),
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
  from: From,
  to: To,
  search: Search,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      item: KogaMovementReportData[];
      info: KogaMovementReportInfo;
    }> => kogaMovementPrint(search, filter, from, to, userFilter),
    onSuccess: (data: {
      item: KogaMovementReportData[];
      info: KogaMovementReportInfo;
    }) => {
      return dispatch({
        type: CONTEXT_TYPEs.KOGA_MOVEMENT_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

//BILL PROFIT REPORT

export const useGetBillProfitReport = (
  from: From,
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.BILL_PROFIT_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetSellsQ>> =>
      getBillProfitReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        from,
        to,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetBillProfitReportInformation = (
  from: From,
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.BILL_PROFIT_REPORT_INFORMATION],
    queryFn: (): Promise<BillProfitReportInfo> =>
      getBillProfitReportInformation(toast, from, to, userFilter),
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
export const useBillProfitPrint = (
  from: From,
  to: To,
  search: Search,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      sell: BillProfitReportData[];
      info: BillProfitReportInfo;
    }> => billProfitPrint(search, from, to, userFilter),
    onSuccess: (data: {
      sell: BillProfitReportData[];
      info: BillProfitReportInfo;
    }) => {
      return dispatch({
        type: CONTEXT_TYPEs.BILL_PROFIT_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
//ITEM_PROFIT_REPORT

export const useGetItemProfitReport = (
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
) => {
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
        to,
        userFilter
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
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_PROFIT_REPORT_INFORMATION],
    queryFn: (): Promise<ItemProfitReportInfo> =>
      getItemProfitReportInformation(toast, filter, from, to, userFilter),
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
  from: From,
  to: To,
  search: Search,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      item: ItemProfitReportData[];
      info: ItemProfitReportInfo;
    }> => itemProfitPrint(search, filter, from, to, userFilter),
    onSuccess: (data: {
      item: ItemProfitReportData[];
      info: ItemProfitReportInfo;
    }) => {
      return dispatch({
        type: CONTEXT_TYPEs.ITEM_PROFIT_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

//EXPENSE_REPORT

export const useGetExpenseReport = (
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
) => {
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
        to,
        userFilter
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
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.EXPENSE_REPORT_INFORMATION],
    queryFn: (): Promise<ExpenseReportInfo> =>
      getExpenseReportInformation(toast, filter, from, to, userFilter),
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
  from: From,
  to: To,
  search: Search,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      info: ExpenseReportInfo;
      expense: ExpenseReportData[];
    }> => expenseReportPrint(search, filter, from, to, userFilter),
    onSuccess: (data: {
      info: ExpenseReportInfo;
      expense: ExpenseReportData[];
    }) => {
      return dispatch({
        type: CONTEXT_TYPEs.EXPENSE_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
//CASE_REPORT
export const useGetCaseReport = (from: From, to: To, userFilter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.CASE_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCasesQ>> =>
      getCaseReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        from,
        to,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetCaseReportInformation = (
  from: From,
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CASE_REPORT_INFORMATION],
    queryFn: (): Promise<CaseReportInfo> =>
      getCaseReportInformation(toast, from, to, userFilter),
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
export const useCasePrint = (
  from: From,
  to: To,
  search: Search,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      data: CaseReportData[];
      info: CaseReportInfo;
    }> => caseReportPrint(search, from, to, userFilter),
    onSuccess: (data: { data: CaseReportData[]; info: CaseReportInfo }) => {
      return dispatch({
        type: CONTEXT_TYPEs.CASE_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
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
export const useGetReservationReport = (
  from: From,
  to: To,
  colorFilter: Filter,
  carModelFilter: Filter,
  carTypeFilter: Filter,
  serviceFilter: Filter,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.RESERVATION_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetReservationsQ>> =>
      getReservationReport(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        from,
        to,
        colorFilter,
        carModelFilter,
        carTypeFilter,
        serviceFilter,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetReservationReportInformation = (
  from: From,
  to: To,
  colorFilter: Filter,
  carModelFilter: Filter,
  carTypeFilter: Filter,
  serviceFilter: Filter,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.RESERVATION_REPORT_INFORMATION],
    queryFn: (): Promise<ReservationReportInfo> =>
      getReservationReportInformation(
        toast,
        from,
        to,
        colorFilter,
        carModelFilter,
        carTypeFilter,
        serviceFilter,
        userFilter
      ),
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
export const useReservationPrint = (
  search: Search,
  from: From,
  to: To,
  colorFilter: Filter,
  carModelFilter: Filter,
  carTypeFilter: Filter,
  serviceFilter: Filter,
  userFilter: Filter
) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: (): Promise<{
      reservations: ReservationReportData[];
      info: ReservationReportInfo;
    }> =>
      reservationReportPrint(
        search,
        from,
        to,
        colorFilter,
        carModelFilter,
        carTypeFilter,
        serviceFilter,
        userFilter
      ),
    onSuccess: (data: {
      reservations: ReservationReportData[];
      info: ReservationReportInfo;
    }) => {
      return dispatch({
        type: CONTEXT_TYPEs.RESERVATION_REPORT_DATA,
        payload: data,
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
