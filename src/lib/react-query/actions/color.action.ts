import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddColorF,
  AddColorQ,
  DeleteColorQ,
  GetColorsQ,
  UpdateColorF,
  UpdateColorQ,
} from "@/types/color";
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

export const getColors = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetColorsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetColorsQ>
    >(
      `${URLs.GET_COLORS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedColor = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetColorsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetColorsQ>
    >(
      `${URLs.GET_DELETED_COLORS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchColors = async (
  toast: ToastType,
  search: Search
): Promise<GetColorsQ> => {
  try {
    const { data, status } = await authApi.get<GetColorsQ>(
      `${URLs.SEARCH_COLORS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedColors = async (
  toast: ToastType,
  search: Search
): Promise<GetColorsQ> => {
  try {
    const { data, status } = await authApi.get<GetColorsQ>(
      `${URLs.SEARCH_DELETED_COLORS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addColor = async (form: AddColorF): Promise<AddColorQ> => {
  try {
    const { data, status } = await authApi.post<AddColorQ>(
      `${URLs.ADD_COLOR}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateColor = async (
  form: UpdateColorF,
  id: Id
): Promise<UpdateColorQ> => {
  try {
    const { data, status } = await authApi.put<UpdateColorQ>(
      `${URLs.UPDATE_COLOR}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteColor = async (ids: Id[]): Promise<DeleteColorQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_COLOR}/${id}`
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
export const restoreColor = async (ids: Id[]): Promise<DeleteColorQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(`${URLs.RESTORE_COLOR}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
