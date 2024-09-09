import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import {
  AddServiceF,
  AddServiceQ,
  DeleteServiceQ,
  GetServicesQ,
  UpdateServiceF,
  UpdateServiceQ,
} from "@/types/service";

export const getServices = async (toast: ToastType): Promise<GetServicesQ> => {
  try {
    const { data, status } = await authApi.get<GetServicesQ>(URLs.GET_SERVICES);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addService = async (form: AddServiceF): Promise<AddServiceQ> => {
  try {
    const { data, status } = await authApi.post<AddServiceQ>(
      URLs.ADD_SERVICE,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updateService = async (
  form: UpdateServiceF,
  id: Id
): Promise<UpdateServiceQ> => {
  try {
    const { data, status } = await authApi.put<UpdateServiceQ>(
      `${URLs.UPDATE_SERVICE}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteService = async (id: Id): Promise<DeleteServiceQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteServiceQ>(
      `${URLs.DELETE_SERVICE}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
