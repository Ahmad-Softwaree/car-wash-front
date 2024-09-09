import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import {
  AddPartF,
  AddPartQ,
  DeletePartQ,
  GetPartsQ,
  UpdatePartF,
  UpdatePartQ,
} from "@/types/part";

export const getParts = async (toast: ToastType): Promise<GetPartsQ> => {
  try {
    const { data, status } = await authApi.get<GetPartsQ>(URLs.GET_PARTS);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addPart = async (form: AddPartF): Promise<AddPartQ> => {
  try {
    const { data, status } = await authApi.post<AddPartQ>(URLs.ADD_PART, form);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updatePart = async (
  form: UpdatePartF,
  id: Id
): Promise<UpdatePartQ> => {
  try {
    const { data, status } = await authApi.put<UpdatePartQ>(
      `${URLs.UPDATE_PART}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deletePart = async (id: Id): Promise<DeletePartQ> => {
  try {
    const { data, status } = await authApi.delete<DeletePartQ>(
      `${URLs.GET_PARTS}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
