import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { ToastType } from "@/types/global";

export const getDashboardData = async (toast: ToastType): Promise<any> => {
  try {
    const { data, status } = await authApi.get(URLs.GET_DASHBOARD_DATA);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
