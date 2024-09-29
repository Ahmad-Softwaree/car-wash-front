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
  getSellReport,
  getSellReportInformation,
  getSellReportInformationSearch,
  getSellReportSearch,
  itemPrint,
  kogaAllPrint,
  sellPrint,
} from "../actions/report.action";
import { From, Page, PaginationReturnType, Search, To } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { GetItemsQ, GetItemsReportQ } from "@/types/items";

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
    enabled: !!search,
  });
};
export const useGetSellReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.SELL_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<any> => getSellReportInformationSearch(toast, search),
    retry: 0,
    enabled: !!search,
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

export const useGetItemReport = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getItemReport(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetItemReportInformation = (from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT_INFORMATION],
    queryFn: (): Promise<any> => getItemReportInformation(toast, from, to),
    retry: 0,
  });
};

export const useGetItemReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT_SEARCH],
    queryFn: (): Promise<GetItemsQ> => getItemReportSearch(toast, search),
    retry: 0,
    enabled: !!search,
  });
};
export const useGetItemReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<any> => getItemReportInformationSearch(toast, search),
    retry: 0,
    enabled: !!search,
  });
};
export const useItemPrint = (search: Search, from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_PRINT_DATA],
    queryFn: (): Promise<Blob | null> => itemPrint(toast, search, from, to),
    retry: 0,
  });
};

//KOGA_ALL REPORT

export const useGetKogaAllReport = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsReportQ>> =>
      getKogaAllReport(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetKogaAllReportInformation = (from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT_INFORMATION],
    queryFn: (): Promise<any> => getKogaAllReportInformation(toast, from, to),
    retry: 0,
  });
};

export const useGetKogaAllReportSearch = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT_SEARCH],
    queryFn: (): Promise<GetItemsQ> => getKogaAllReportSearch(toast, search),
    retry: 0,
    enabled: !!search,
  });
};
export const useGetKogaAllReportInformationSearch = (search: Search) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_REPORT_INFORMATION_SEARCH],
    queryFn: (): Promise<any> =>
      getKogaAllReportInformationSearch(toast, search),
    retry: 0,
    enabled: !!search,
  });
};
export const useKogaAllPrint = (search: Search, from: From, to: To) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.KOGA_ALL_PRINT_DATA],
    queryFn: (): Promise<Blob | null> => kogaAllPrint(toast, search, from, to),
    retry: 0,
  });
};
