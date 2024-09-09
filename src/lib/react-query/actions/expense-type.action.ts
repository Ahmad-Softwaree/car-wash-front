import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import {
  AddExpenseTypeF,
  AddExpenseTypeQ,
  DeleteExpenseTypeQ,
  GetExpenseTypesQ,
  UpdateExpenseTypeF,
  UpdateExpenseTypeQ,
} from "@/types/expense-type";

export const getExpenseTypes = async (
  toast: ToastType
): Promise<GetExpenseTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetExpenseTypesQ>(
      URLs.GET_EXPENSE_TYPES
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
      URLs.ADD_EXPENSE_TYPE,
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
  id: Id
): Promise<DeleteExpenseTypeQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteExpenseTypeQ>(
      `${URLs.DELETE_EXPENSE_TYPE}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
