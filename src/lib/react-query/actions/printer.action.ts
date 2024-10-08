import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddPrinterF,
  AddPrinterQ,
  DeletePrinterQ,
  GetPrintersQ,
  UpdatePrinterF,
  UpdatePrinterQ,
} from "@/types/printer";
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

export const getPrinters = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetPrintersQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetPrintersQ>
    >(
      `${URLs.GET_PRINTERS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getPrintersSelection = async (
  toast: ToastType
): Promise<GetPrintersQ> => {
  try {
    const { data, status } = await authApi.get<GetPrintersQ>(
      `${URLs.GET_PRINTERS_SELECTION}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedPrinter = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetPrintersQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetPrintersQ>
    >(
      `${URLs.GET_DELETED_PRINTERS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchPrinters = async (
  toast: ToastType,
  search: Search
): Promise<GetPrintersQ> => {
  try {
    const { data, status } = await authApi.get<GetPrintersQ>(
      `${URLs.SEARCH_PRINTERS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedPrinters = async (
  toast: ToastType,
  search: Search
): Promise<GetPrintersQ> => {
  try {
    const { data, status } = await authApi.get<GetPrintersQ>(
      `${URLs.SEARCH_DELETED_PRINTERS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addPrinter = async (form: AddPrinterF): Promise<AddPrinterQ> => {
  try {
    const { data, status } = await authApi.post<AddPrinterQ>(
      `${URLs.ADD_PRINTER}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updatePrinter = async (
  form: UpdatePrinterF,
  id: Id
): Promise<UpdatePrinterQ> => {
  try {
    const { data, status } = await authApi.put<UpdatePrinterQ>(
      `${URLs.UPDATE_PRINTER}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updatePrinterState = async (id: Id): Promise<UpdatePrinterQ> => {
  try {
    const { data, status } = await authApi.put<UpdatePrinterQ>(
      `${URLs.UPDATE_PRINTER_STATE}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deletePrinter = async (ids: Id[]): Promise<DeletePrinterQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_PRINTER}/${id}`
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
export const restorePrinter = async (ids: Id[]): Promise<DeletePrinterQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_PRINTER}/${id}`
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
