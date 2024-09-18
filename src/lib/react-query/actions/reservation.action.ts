import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
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
import {
  AddReservationF,
  AddReservationQ,
  DeleteReservationQ,
  GetReservationsQ,
  PanelReservation,
  UpdateReservationF,
  UpdateReservationQ,
} from "@/types/reservation";

export const getPanelReservation = async (
  toast: ToastType,
  date: Date
): Promise<PanelReservation[]> => {
  try {
    const { data, status } = await authApi.get<PanelReservation[]>(
      `${URLs.GET_PANEL_RESERVATIONS}?date=${date}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getReservations = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  date: Date
): Promise<PaginationReturnType<GetReservationsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetReservationsQ>
    >(`${URLs.GET_RESERVATIONS}?page=${page}&limit=${limit}&date=${date}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedReservation = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetReservationsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetReservationsQ>
    >(
      `${URLs.GET_DELETED_RESERVATIONS}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchReservations = async (
  toast: ToastType,
  search: Search,
  date: Date
): Promise<GetReservationsQ> => {
  try {
    const { data, status } = await authApi.get<GetReservationsQ>(
      `${URLs.SEARCH_RESERVATIONS}?search=${search}&date=${date}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedReservations = async (
  toast: ToastType,
  search: Search
): Promise<GetReservationsQ> => {
  try {
    const { data, status } = await authApi.get<GetReservationsQ>(
      `${URLs.SEARCH_DELETED_RESERVATIONS}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addReservation = async (
  form: AddReservationF
): Promise<AddReservationQ> => {
  try {
    const { data, status } = await authApi.post<AddReservationQ>(
      `${URLs.ADD_RESERVATION}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updateReservation = async (
  form: UpdateReservationF,
  id: Id
): Promise<UpdateReservationQ> => {
  try {
    const { data, status } = await authApi.put<UpdateReservationQ>(
      `${URLs.UPDATE_RESERVATION}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteReservation = async (
  ids: Id[]
): Promise<DeleteReservationQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_RESERVATION}/${id}`
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
export const restoreReservation = async (
  ids: Id[]
): Promise<DeleteReservationQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_RESERVATION}/${id}`
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
