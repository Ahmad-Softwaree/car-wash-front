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
  From,
  Id,
  Limit,
  Page,
  PaginationReturnType,
  Search,
  To,
  ToastType,
} from "@/types/global";

export const getCustomers = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetCustomersQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetCustomersQ>
    >(
      `${URLs.GET_CUSTOMERS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedCustomer = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetCustomersQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetCustomersQ>
    >(
      `${URLs.GET_DELETED_CUSTOMERS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchCustomers = async (
  toast: ToastType,
  search: Search
): Promise<GetCustomersQ> => {
  try {
    const { data, status } = await authApi.get<GetCustomersQ>(
      `${URLs.SEARCH_CUSTOMERS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedCustomers = async (
  toast: ToastType,
  search: Search
): Promise<GetCustomersQ> => {
  try {
    const { data, status } = await authApi.get<GetCustomersQ>(
      `${URLs.SEARCH_DELETED_CUSTOMERS}?search=${search}`
    );
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
      `${URLs.ADD_CUSTOMER}`,
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
      `${URLs.UPDATE_CUSTOMER}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteCustomer = async (ids: Id[]): Promise<DeleteCustomerQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_CUSTOMER}/${id}`
      );
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
export const restoreCustomer = async (ids: Id[]): Promise<DeleteCustomerQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_CUSTOMER}/${id}`
      );
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
