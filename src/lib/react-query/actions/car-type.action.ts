import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddCarTypeF,
  AddCarTypeQ,
  DeleteCarTypeQ,
  GetCarTypesQ,
  UpdateCarTypeF,
  UpdateCarTypeQ,
} from "@/types/car-type";
import {
  Id,
  Limit,
  Page,
  PaginationReturnType,
  Search,
  ToastType,
} from "@/types/global";

export const getCarTypes = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetCarTypesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetCarTypesQ>
    >(`${URLs.GET_CAR_TYPES}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedCarType = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetCarTypesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetCarTypesQ>
    >(`${URLs.GET_DELETED_CAR_TYPES}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchCarTypes = async (
  toast: ToastType,
  search: Search
): Promise<GetCarTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetCarTypesQ>(
      `${URLs.SEARCH_CAR_TYPES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedCarTypes = async (
  toast: ToastType,
  search: Search
): Promise<GetCarTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetCarTypesQ>(
      `${URLs.SEARCH_DELETED_CAR_TYPES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addCarType = async (form: AddCarTypeF): Promise<AddCarTypeQ> => {
  try {
    const { data, status } = await authApi.post<AddCarTypeQ>(
      `${URLs.ADD_CAR_TYPE}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateCarType = async (
  form: UpdateCarTypeF,
  id: Id
): Promise<UpdateCarTypeQ> => {
  try {
    const { data, status } = await authApi.put<UpdateCarTypeQ>(
      `${URLs.UPDATE_CAR_TYPE}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteCarType = async (ids: Id[]): Promise<DeleteCarTypeQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_CAR_TYPE}/${id}`
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
export const restoreCarType = async (ids: Id[]): Promise<DeleteCarTypeQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_CAR_TYPE}/${id}`
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
