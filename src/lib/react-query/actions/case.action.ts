import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  GetCaseChartQ,
  GetCaseHistoryQ,
  GetCaseMoneyQ,
  GetReportMoneyDataQ,
  GetReportMostOrderQ,
  GetReportMostItemQ,
  ReportMoney,
} from "@/types/case";
import {
  Limit,
  NestError,
  Page,
  PaginationReturnType,
  ToastType,
} from "@/types/global";

export const getCaseMoney = async (
  toast: ToastType
): Promise<GetCaseMoneyQ> => {
  try {
    const { data, status } = await authApi.get<GetCaseMoneyQ>(
      URLs.GET_CASE_MONEY
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getCaseHistory = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetCaseHistoryQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetCaseHistoryQ>
    >(`${URLs.GET_CASE_HISTORY}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getCaseChart = async (
  toast: ToastType
): Promise<GetCaseChartQ> => {
  try {
    const { data, status } = await authApi.get(URLs.GET_CASE_CHART);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getReportMoneyData = async (
  toast: ToastType,
  from: Date | string,
  to: Date | string
): Promise<GetReportMoneyDataQ> => {
  try {
    // const { data, status } = await authApi.get(`${URLs.GET_REPORT_MONEY_DATA}?from=${from}&to=${to}`);
    const data: ReportMoney = {
      id: 1,
      money: null,
      expense: null,
      dept: null,
      dept_psula: 12,
      naqd_psula: 12,
      wasl_psula: 12,
      new_customers: 12,
      dept_amount: 12,
      date: new Date().getTime(),
    };
    return data;
  } catch (error: any) {
    throw toast({
      title: error.message.data,
      description: "",
    });
  }
};

export const getReportMostItem = async (
  toast: ToastType,
  from: Date | string,
  to: Date | string
): Promise<GetReportMostItemQ> => {
  try {
    // const { data, status } = await authApi.get(`${URLs.GET_REPORT_MOST_ITEM}?from=${from}&to=${to}`);
    const data = items;
    return data;
  } catch (error: any) {
    throw toast({
      title: error.message.data,
      description: "",
    });
  }
};

export const getReportMostOrder = async (
  toast: ToastType,
  from: Date | string,
  to: Date | string
): Promise<GetReportMostOrderQ> => {
  try {
    // const { data, status } = await authApi.get(`${URLs.GET_REPORT_MOST_ORDER}?from=${from}&to=${to}`);
    const data = reportChart;
    return data;
  } catch (error: any) {
    throw toast({
      title: error.message.data,
      description: "",
    });
  }
};
