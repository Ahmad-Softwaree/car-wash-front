import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Dashboard } from "@/types/dashboard";
import { ToastType } from "@/types/global";

export const getDashboardData = async (
  toast: ToastType
): Promise<Dashboard> => {
  try {
    const { data, status } = await authApi.get<Dashboard>(
      URLs.GET_DASHBOARD_DATA
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
