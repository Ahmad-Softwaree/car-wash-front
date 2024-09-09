import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddUserF,
  AddUserQ,
  DeleteUserQ,
  GetUsersQ,
  UpdateUserF,
  UpdateUserQ,
  UpdateUserWithFirebaseImage,
} from "@/types/auth";
import {
  Id,
  Limit,
  Page,
  PaginationReturnType,
  ToastType,
} from "@/types/global";

export const getUsers = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetUsersQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetUsersQ>>(
      `${URLs.GET_USERS}?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addUser = async (form: AddUserF): Promise<AddUserQ> => {
  try {
    const { data, status } = await authApi.post<AddUserQ>(
      `${URLs.ADD_USER}/${form.employee_id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateUser = async (
  form: UpdateUserWithFirebaseImage,
  id: Id
): Promise<UpdateUserQ> => {
  try {
    const { data, status } = await authApi.put<UpdateUserQ>(
      `${URLs.UPDATE_USER}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteUser = async (id: Id): Promise<DeleteUserQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteUserQ>(
      `${URLs.DELETE_USER}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
