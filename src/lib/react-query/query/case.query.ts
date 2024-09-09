import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { useToast } from "@/components/ui/use-toast";
import {
  getCaseChart,
  getCaseMoney,
  getCaseHistory,
  getReportMoneyData,
  getReportMostOrder,
  getReportMostProduct,
} from "../actions/case.action";
import {
  GetCaseChartQ,
  GetCaseHistoryQ,
  GetCaseMoneyQ,
  GetReportMoneyDataQ,
  GetReportMostOrderQ,
  GetReportMostProductQ,
} from "@/types/case";
import { Page, PaginationReturnType } from "@/types/global";
import { ENUMs } from "@/lib/enum";

//Just Get the Case Money
export const useGetCaseMoney = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CASE_MONEY],
    queryFn: (): Promise<GetCaseMoneyQ> => getCaseMoney(toast),
    retry: 0,
  });
};

//Getting the Case History Pagination

export function useGetCaseHistory() {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.CASE_HISTORY],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCaseHistoryQ>> =>
      getCaseHistory(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    placeholderData: keepPreviousData,
  });
}

//Getting the Case Chart Data

export function useGetCaseChart() {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.CASE_CHART],
    queryFn: (): Promise<GetCaseChartQ> => getCaseChart(toast),
    retry: 0,
  });
}

export const useGetReportMoneyData = (
  from: Date | string,
  to: Date | string
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.REPORT_MONEY_DATA],
    queryFn: (): Promise<GetReportMoneyDataQ> =>
      getReportMoneyData(toast, from, to),
  });
};
export const useGetReportMostProduct = (
  from: Date | string,
  to: Date | string
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.REPORT_MOST_PRODUCT],
    queryFn: (): Promise<GetReportMostProductQ> =>
      getReportMostProduct(toast, from, to),
  });
};
export const useGetReportMostOrder = (
  from: Date | string,
  to: Date | string
) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.REPORT_MOST_ORDER],
    queryFn: (): Promise<GetReportMostOrderQ> =>
      getReportMostOrder(toast, from, to),
  });
};
