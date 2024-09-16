import { authApi, pdfFileAuthApi } from "@/lib/config/api.config";
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
  GetSellsQ,
  UpdateItemInSellF,
  UpdateSellF,
  UpdateSellItemQ,
  UpdateSellQ,
} from "@/types/sell";
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

export const getSells = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetSellsQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetSellsQ>>(
      `${URLs.GET_SELLS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedSell = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetSellsQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetSellsQ>>(
      `${URLs.GET_DELETED_SELLS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchSells = async (
  toast: ToastType,
  search: Search
): Promise<GetSellsQ> => {
  try {
    const { data, status } = await authApi.get<GetSellsQ>(
      `${URLs.SEARCH_SELLS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedSells = async (
  toast: ToastType,
  search: Search
): Promise<GetSellsQ> => {
  try {
    const { data, status } = await authApi.get<GetSellsQ>(
      `${URLs.SEARCH_DELETED_SELLS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getSell = async (
  toast: ToastType,
  sell_id: Id
): Promise<GetSellQ> => {
  try {
    const { data, status } = await authApi.get<GetSellQ>(
      `${URLs.GET_SELL}/${sell_id}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getSellPrint = async (
  toast: ToastType,
  sell_id: Id
): Promise<Blob | null> => {
  try {
    const { data } = await pdfFileAuthApi.get(
      `${URLs.GET_SELL_PRINT}/${sell_id}`
    );
    const pdfData = new Uint8Array(data);
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    return pdfBlob;
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
    console.log(data);
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
export const increaseItemInSell = async (
  sell_id: Id,
  item_id: Id
): Promise<UpdateSellItemQ> => {
  try {
    const { data, status } = await authApi.put<UpdateSellItemQ>(
      `${URLs.INCREASE_ITEM_IN_SELL}/${sell_id}/${item_id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const decreaseItemInSell = async (
  sell_id: Id,
  item_id: Id
): Promise<UpdateSellItemQ> => {
  try {
    const { data, status } = await authApi.put<UpdateSellItemQ>(
      `${URLs.DECREASE_ITEM_IN_SELL}/${sell_id}/${item_id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteItemInSell = async (
  sell_id: Id,
  item_ids: Id[]
): Promise<DeleteSellItemQ> => {
  const idArray = Array.isArray(item_ids) ? item_ids : [item_ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.DELETE_ITEM_IN_SELL}/${sell_id}/${id}`
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
