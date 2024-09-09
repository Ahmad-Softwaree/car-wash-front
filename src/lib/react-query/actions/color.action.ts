import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import {
  AddColorF,
  AddColorQ,
  DeleteColorQ,
  GetColorsQ,
  UpdateColorF,
  UpdateColorQ,
} from "@/types/color";

export const getColors = async (toast: ToastType): Promise<GetColorsQ> => {
  try {
    const { data, status } = await authApi.get<GetColorsQ>(URLs.GET_COLORS);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addColor = async (form: AddColorF): Promise<AddColorQ> => {
  try {
    const { data, status } = await authApi.post<AddColorQ>(
      URLs.ADD_COLOR,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updateColor = async (
  form: UpdateColorF,
  id: Id
): Promise<UpdateColorQ> => {
  try {
    const { data, status } = await authApi.put<UpdateColorQ>(
      `${URLs.UPDATE_COLOR}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteColor = async (id: Id): Promise<DeleteColorQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteColorQ>(
      `${URLs.DELETE_COLOR}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
