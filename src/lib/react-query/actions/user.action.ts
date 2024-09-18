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
} from "@/types/auth";
import {
  Filter,
  From,
  Id,
  Limit,
  Page,
  PaginationReturnType,
  Search,
  To,
  ToastType,
} from "@/types/global";

export const getUsers = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To
): Promise<PaginationReturnType<GetUsersQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetUsersQ>>(
      `${URLs.GET_USERS}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedUser = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To
): Promise<PaginationReturnType<GetUsersQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetUsersQ>>(
      `${URLs.GET_DELETED_USERS}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchUsers = async (
  toast: ToastType,
  search: Search
): Promise<GetUsersQ> => {
  try {
    const { data, status } = await authApi.get<GetUsersQ>(
      `${URLs.SEARCH_USERS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedUsers = async (
  toast: ToastType,
  search: Search
): Promise<GetUsersQ> => {
  try {
    const { data, status } = await authApi.get<GetUsersQ>(
      `${URLs.SEARCH_DELETED_USERS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addUser = async (form: AddUserF): Promise<AddUserQ> => {
  try {
    const { data, status } = await authApi.post<AddUserQ>(
      `${URLs.ADD_USER}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updateUser = async (
  form: UpdateUserF,
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
export const deleteUser = async (ids: Id[]): Promise<DeleteUserQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_USER}/${id}`
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
export const restoreUser = async (ids: Id[]): Promise<DeleteUserQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(`${URLs.RESTORE_USER}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
