import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  Id,
  Limit,
  Page,
  PaginationReturnType,
  ToastType,
} from "@/types/global";
import {
  AddSpendF,
  AddSpendQ,
  GetSpendsQ,
  UpdateSpendF,
  UpdateSpendQ,
} from "@/types/spend";

export const getSpends = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetSpendsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetSpendsQ>
    >(`${URLs.GET_SPENDS}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const addSpend = async (form: AddSpendF): Promise<AddSpendQ> => {
  try {
    const { data, status } = await authApi.post<AddSpendQ>(
      URLs.ADD_SPEND,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateSpend = async (
  form: UpdateSpendF,
  id: Id
): Promise<UpdateSpendQ> => {
  try {
    const { data, status } = await authApi.put<UpdateSpendQ>(
      `${URLs.UPDATE_SPEND}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
