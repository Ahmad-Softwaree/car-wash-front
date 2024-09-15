import { authApi } from "@/lib/config/api.config";
import { URLs } from "@/lib/url";
import {
  AddItemWithFirebaseImage,
  AddItemQ,
  DeleteItemQ,
  GetItemByIdQ,
  GetItemsQ,
  UpdateItemQ,
  UpdateItemWithFirebaseImage,
  CountItemF,
  CountItemQ,
} from "@/types/items";
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
import { generateNestErrors } from "@/lib/functions";
import { Search } from "react-router-dom";

export const getItems = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To
): Promise<PaginationReturnType<GetItemsQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetItemsQ>>(
      `${URLs.GET_ITEMS}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getDeletedItems = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,

  from: From,
  to: To
): Promise<PaginationReturnType<GetItemsQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetItemsQ>>(
      `${URLs.GET_DELETED_ITEMS}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchItems = async (
  toast: ToastType,
  search: Search
): Promise<GetItemsQ> => {
  try {
    const { data, status } = await authApi.get<GetItemsQ>(
      `${URLs.SEARCH_ITEMS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedItems = async (
  toast: ToastType,
  search: Search
): Promise<GetItemsQ> => {
  try {
    const { data, status } = await authApi.get<GetItemsQ>(
      `${URLs.SEARCH_DELETED_ITEMS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getItemById = async (
  toast: ToastType,
  id: Id | null
): Promise<GetItemByIdQ> => {
  try {
    const { data, status } = await authApi.get<GetItemByIdQ>(
      `${URLs.GET_ITEM}/${id}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const addItem = async (
  form: AddItemWithFirebaseImage
): Promise<AddItemQ> => {
  try {
    const { data, status } = await authApi.post<AddItemQ>(URLs.ADD_ITEM, form);
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateItem = async (
  form: UpdateItemWithFirebaseImage,
  id: Id
): Promise<CountItemQ> => {
  try {
    const { data, status } = await authApi.put<CountItemQ>(
      `${URLs.UPDATE_ITEM}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const countItem = async (
  form: CountItemF,
  id: Id
): Promise<UpdateItemQ> => {
  try {
    const { data, status } = await authApi.put<AddItemQ>(
      `${URLs.COUNT_ITEM}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteItem = async (ids: Id[]): Promise<DeleteItemQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_ITEM}/${id}`
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

export const restoreItem = async (ids: Id[]): Promise<DeleteItemQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(`${URLs.RESTORE_ITEM}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
