import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddItemToSellF,
  AddSellItemQ,
  AddSellQ,
  DeleteSellItemQ,
  DeleteSellQ,
  GetSellItemsQ,
  GetSellQ,
  UpdateItemInSellF,
  UpdateSellF,
  UpdateSellItemQ,
  UpdateSellQ,
} from "@/types/sell";
import { Id, ToastType } from "@/types/global";

export const getSell = async (toast: ToastType): Promise<GetSellQ> => {
  try {
    const { data, status } = await authApi.get<GetSellQ>(`${URLs.GET_SELL}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getSellItems = async (
  toast: ToastType,
  sell_id: Id
): Promise<GetSellItemsQ> => {
  try {
    const { data, status } = await authApi.get<GetSellItemsQ>(
      `${URLs.GET_SELL_ITEMS}/${sell_id}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addSell = async (): Promise<AddSellQ> => {
  try {
    const { data, status } = await authApi.post<AddSellQ>(`${URLs.ADD_SELL}`);

    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateSell = async (
  form: UpdateSellF,
  id: Id
): Promise<UpdateSellQ> => {
  try {
    const { data, status } = await authApi.put<UpdateSellQ>(
      `${URLs.UPDATE_SELL}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const addItemToSell = async (
  form: AddItemToSellF,
  sell_id: Id
): Promise<AddSellItemQ> => {
  try {
    const { data, status } = await authApi.put<AddSellItemQ>(
      `${URLs.ADD_ITEM_TO_SELL}/${sell_id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateItemInSell = async (
  form: UpdateItemInSellF,
  sell_id: Id,
  item_id: Id
): Promise<UpdateSellItemQ> => {
  try {
    const { data, status } = await authApi.put<UpdateSellItemQ>(
      `${URLs.UPDATE_ITEM_IN_SELL}/${sell_id}/${item_id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteItemInSell = async (
  sell_id: Id,
  item_id: Id
): Promise<DeleteSellItemQ> => {
  try {
    const { data, status } = await authApi.put<DeleteSellItemQ>(
      `${URLs.DELETE_ITEM_IN_SELL}/${sell_id}/${item_id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteSell = async (ids: Id[]): Promise<DeleteSellQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_SELL}/${id}`
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
export const restoreSell = async (ids: Id[]): Promise<DeleteSellQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(`${URLs.RESTORE_SELL}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
