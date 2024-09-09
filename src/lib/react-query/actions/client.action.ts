import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddClientF,
  AddClientQ,
  AddClientWithFirebaseImage,
  DeleteClientQ,
  GetClientsQ,
  UpdateClientQ,
  UpdateClientWithFirebaseImage,
} from "@/types/client";
import {
  Id,
  Limit,
  Page,
  PaginationReturnType,
  ToastType,
} from "@/types/global";

export const getClients = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetClientsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetClientsQ>
    >(`${URLs.GET_CLIENTS}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addClient = async (
  form: AddClientWithFirebaseImage
): Promise<AddClientQ> => {
  try {
    const { data, status } = await authApi.post<AddClientQ>(
      `${URLs.ADD_CLIENT}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateClient = async (
  form: UpdateClientWithFirebaseImage,
  id: Id
): Promise<UpdateClientQ> => {
  try {
    const { data, status } = await authApi.put<UpdateClientQ>(
      `${URLs.UPDATE_CLIENT}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteClient = async (id: Id): Promise<DeleteClientQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteClientQ>(
      `${URLs.DELETE_CLIENT}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
