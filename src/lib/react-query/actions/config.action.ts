import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import { GetConfigsQ, UpdateConfigQ } from "@/types/config";

export const getConfigs = async (toast: ToastType): Promise<GetConfigsQ> => {
  try {
    const { data, status } = await authApi.get<GetConfigsQ>(URLs.GET_CONFIGS);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const updateConfig = async <T>(
  key: string,
  body: T
): Promise<UpdateConfigQ> => {
  try {
    const { data, status } = await authApi.put<UpdateConfigQ>(
      `${URLs.UPDATE_CONFIG}/${key}`,
      { value: body }
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
