import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddExpenseF,
  AddExpenseQ,
  DeleteExpenseQ,
  GetExpensesQ,
  UpdateExpenseF,
  UpdateExpenseQ,
} from "@/types/expense";
import {
  Filter,
  From,
  Id,
  Limit,
  Page,
  PaginationReturnType,
  To,
  ToastType,
} from "@/types/global";

export const getExpenses = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To
): Promise<PaginationReturnType<GetExpensesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetExpensesQ>
    >(
      `${URLs.GET_EXPENSES}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedExpense = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To
): Promise<PaginationReturnType<GetExpensesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetExpensesQ>
    >(
      `${URLs.GET_DELETED_EXPENSES}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addExpense = async (form: AddExpenseF): Promise<AddExpenseQ> => {
  try {
    const { data, status } = await authApi.post<AddExpenseQ>(
      `${URLs.ADD_EXPENSE}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateExpense = async (
  form: UpdateExpenseF,
  id: Id
): Promise<UpdateExpenseQ> => {
  try {
    const { data, status } = await authApi.put<UpdateExpenseQ>(
      `${URLs.UPDATE_EXPENSE}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteExpense = async (ids: Id[]): Promise<DeleteExpenseQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_EXPENSE}/${id}`
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
export const restoreExpense = async (ids: Id[]): Promise<DeleteExpenseQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_EXPENSE}/${id}`
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
