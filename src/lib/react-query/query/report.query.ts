import { useToast } from "@/components/ui/use-toast";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { GetSellsQ } from "@/types/sell";
import {
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
  getSellReport,
  getSellReportInformation,
  getSellReportInformationSearch,
  getSellReportSearch,
  itemPrint,
  kogaAllPrint,
  kogaMovementPrint,
  kogaNullPrint,
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
  });
};
export const useGetSellReportInformation = (from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL_REPORT_INFORMATION],
    queryFn: (): Promise<any> => getSellReportInformation(toast, from, to),
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
    queryFn: (): Promise<any> => getSellReportInformationSearch(toast, search),
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
    queryFn: (): Promise<any> =>
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
    queryFn: (): Promise<any> => getItemReportInformationSearch(toast, search),
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
  });
};
export const useGetKogaAllReportInformation = (filter: Filter) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT_INFORMATION],
    queryFn: (): Promise<any> => getKogaAllReportInformation(toast, filter),
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
    queryFn: (): Promise<any> =>
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
  });
};
export const useGetKogaNullReportInformation = (filter: Filter) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_NULL_REPORT_INFORMATION],
    queryFn: (): Promise<any> => getKogaNullReportInformation(toast, filter),
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
    queryFn: (): Promise<any> =>
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
    queryFn: (): Promise<any> =>
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
    queryFn: (): Promise<any> =>
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
