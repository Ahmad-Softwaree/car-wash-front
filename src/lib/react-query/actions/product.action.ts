import { authApi } from "@/lib/config/api.config";
import { URLs } from "@/lib/url";
import {
  AddProductWithFirebaseImage,
  AddProductQ,
  DeleteProductQ,
  GetProductByIdQ,
  GetProductsInAddQ,
  GetProductsQ,
  UpdateProductQ,
  UpdateProductWithFirebaseImage,
  GetProductsLessQ,
  CountProductF,
  CountProductQ,
} from "@/types/products";
import {
  Id,
  Limit,
  Page,
  PaginationReturnType,
  ToastType,
} from "@/types/global";
import { generateNestErrors } from "@/lib/functions";

export const getProductsInAdd = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetProductsInAddQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetProductsInAddQ>
    >(`${URLs.GET_PRODUCT_IN_ADD}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getLessProducts = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetProductsLessQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetProductsLessQ>
    >(`${URLs.GET_LESS_PRODUCTS}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getProducts = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetProductsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetProductsQ>
    >(`${URLs.GET_PRODUCTS}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getProductById = async (
  toast: ToastType,
  id: Id | null
): Promise<GetProductByIdQ> => {
  try {
    const { data, status } = await authApi.get<GetProductByIdQ>(
      `${URLs.GET_PRODUCT}/${id}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const addProduct = async (
  form: AddProductWithFirebaseImage
): Promise<AddProductQ> => {
  try {
    const { data, status } = await authApi.post<AddProductQ>(
      URLs.ADD_PRODUCT,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateProduct = async (
  form: UpdateProductWithFirebaseImage,
  id: Id
): Promise<CountProductQ> => {
  try {
    const { data, status } = await authApi.put<CountProductQ>(
      `${URLs.UPDATE_PRODUCT}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const countProduct = async (
  form: CountProductF,
  id: Id
): Promise<UpdateProductQ> => {
  try {
    const { data, status } = await authApi.put<AddProductQ>(
      `${URLs.COUNT_PRODUCT}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteProduct = async (id: Id): Promise<DeleteProductQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteProductQ>(
      `${URLs.DELETE_PRODUCT}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
