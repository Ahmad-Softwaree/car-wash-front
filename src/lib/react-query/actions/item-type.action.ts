import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddItemTypeF,
  AddItemTypeQ,
  DeleteItemTypeQ,
  GetItemTypesQ,
  UpdateItemTypeF,
  UpdateItemTypeQ,
} from "@/types/item-type";
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

export const getItemTypes = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetItemTypesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetItemTypesQ>
    >(
      `${URLs.GET_ITEM_TYPES}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getItemTypeSelection = async (
  toast: ToastType
): Promise<GetItemTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetItemTypesQ>(
      `${URLs.GET_ITEM_TYPES_SELECTED}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedItemType = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetItemTypesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetItemTypesQ>
    >(
      `${URLs.GET_DELETED_ITEM_TYPES}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchItemTypes = async (
  toast: ToastType,
  search: Search
): Promise<GetItemTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetItemTypesQ>(
      `${URLs.SEARCH_ITEM_TYPES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedItemTypes = async (
  toast: ToastType,
  search: Search
): Promise<GetItemTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetItemTypesQ>(
      `${URLs.SEARCH_DELETED_ITEM_TYPES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addItemType = async (
  form: AddItemTypeF
): Promise<AddItemTypeQ> => {
  try {
    const { data, status } = await authApi.post<AddItemTypeQ>(
      `${URLs.ADD_ITEM_TYPE}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateItemType = async (
  form: UpdateItemTypeF,
  id: Id
): Promise<UpdateItemTypeQ> => {
  try {
    const { data, status } = await authApi.put<UpdateItemTypeQ>(
      `${URLs.UPDATE_ITEM_TYPE}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteItemType = async (ids: Id[]): Promise<DeleteItemTypeQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_ITEM_TYPE}/${id}`
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
export const restoreItemType = async (ids: Id[]): Promise<DeleteItemTypeQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_ITEM_TYPE}/${id}`
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
