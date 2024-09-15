import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddCarModelF,
  AddCarModelQ,
  DeleteCarModelQ,
  GetCarModelsQ,
  UpdateCarModelF,
  UpdateCarModelQ,
} from "@/types/car-model";
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

export const getCarModels = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetCarModelsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetCarModelsQ>
    >(
      `${URLs.GET_CAR_MODELS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedCarModel = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetCarModelsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetCarModelsQ>
    >(
      `${URLs.GET_DELETED_CAR_MODELS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchCarModels = async (
  toast: ToastType,
  search: Search
): Promise<GetCarModelsQ> => {
  try {
    const { data, status } = await authApi.get<GetCarModelsQ>(
      `${URLs.SEARCH_CAR_MODELS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedCarModels = async (
  toast: ToastType,
  search: Search
): Promise<GetCarModelsQ> => {
  try {
    const { data, status } = await authApi.get<GetCarModelsQ>(
      `${URLs.SEARCH_DELETED_CAR_MODELS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addCarModel = async (
  form: AddCarModelF
): Promise<AddCarModelQ> => {
  try {
    const { data, status } = await authApi.post<AddCarModelQ>(
      `${URLs.ADD_CAR_MODEL}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateCarModel = async (
  form: UpdateCarModelF,
  id: Id
): Promise<UpdateCarModelQ> => {
  try {
    const { data, status } = await authApi.put<UpdateCarModelQ>(
      `${URLs.UPDATE_CAR_MODEL}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteCarModel = async (ids: Id[]): Promise<DeleteCarModelQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_CAR_MODEL}/${id}`
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
export const restoreCarModel = async (ids: Id[]): Promise<DeleteCarModelQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_CAR_MODEL}/${id}`
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
