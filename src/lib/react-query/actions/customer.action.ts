import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddCustomerF,
  AddCustomerQ,
  DeleteCustomerQ,
  GetCustomersQ,
  UpdateCustomerF,
  UpdateCustomerQ,
} from "@/types/customer";
import {
  Id,
  Limit,
  Page,
  PaginationReturnType,
  ToastType,
} from "@/types/global";

export const getCustomers = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetCustomersQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetCustomersQ>
    >(`${URLs.GET_CLIENTS}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addCustomer = async (
  form: AddCustomerF
): Promise<AddCustomerQ> => {
  try {
    const { data, status } = await authApi.post<AddCustomerQ>(
      `${URLs.ADD_CLIENT}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateCustomer = async (
  form: UpdateCustomerF,
  id: Id
): Promise<UpdateCustomerQ> => {
  try {
    const { data, status } = await authApi.put<UpdateCustomerQ>(
      `${URLs.UPDATE_CLIENT}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteCustomer = async (id: Id): Promise<DeleteCustomerQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteCustomerQ>(
      `${URLs.DELETE_CLIENT}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
