import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddExpenseTypeF,
  AddExpenseTypeQ,
  DeleteExpenseTypeQ,
  GetExpenseTypesQ,
  UpdateExpenseTypeF,
  UpdateExpenseTypeQ,
} from "@/types/expense-type";
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

export const getExpenseTypes = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetExpenseTypesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetExpenseTypesQ>
    >(
      `${URLs.GET_EXPENSE_TYPES}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getExpenseTypesSelection = async (
  toast: ToastType
): Promise<GetExpenseTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetExpenseTypesQ>(
      `${URLs.GET_EXPENSE_TYPES_SELECTION}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getDeletedExpenseType = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetExpenseTypesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetExpenseTypesQ>
    >(
      `${URLs.GET_DELETED_EXPENSE_TYPES}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchExpenseTypes = async (
  toast: ToastType,
  search: Search
): Promise<GetExpenseTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetExpenseTypesQ>(
      `${URLs.SEARCH_EXPENSE_TYPES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedExpenseTypes = async (
  toast: ToastType,
  search: Search
): Promise<GetExpenseTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetExpenseTypesQ>(
      `${URLs.SEARCH_DELETED_EXPENSE_TYPES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addExpenseType = async (
  form: AddExpenseTypeF
): Promise<AddExpenseTypeQ> => {
  try {
    const { data, status } = await authApi.post<AddExpenseTypeQ>(
      `${URLs.ADD_EXPENSE_TYPE}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateExpenseType = async (
  form: UpdateExpenseTypeF,
  id: Id
): Promise<UpdateExpenseTypeQ> => {
  try {
    const { data, status } = await authApi.put<UpdateExpenseTypeQ>(
      `${URLs.UPDATE_EXPENSE_TYPE}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteExpenseType = async (
  ids: Id[]
): Promise<DeleteExpenseTypeQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_EXPENSE_TYPE}/${id}`
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
export const restoreExpenseType = async (
  ids: Id[]
): Promise<DeleteExpenseTypeQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_EXPENSE_TYPE}/${id}`
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
