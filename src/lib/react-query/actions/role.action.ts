import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddRoleF,
  AddRoleQ,
  DeleteRoleQ,
  GetRolesQ,
  UpdateRoleF,
  UpdateRoleQ,
} from "@/types/role";
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

export const getRoles = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetRolesQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetRolesQ>>(
      `${URLs.GET_ROLES}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const getRolesSelection = async (
  toast: ToastType
): Promise<GetRolesQ> => {
  try {
    const { data, status } = await authApi.get<GetRolesQ>(
      `${URLs.GET_ROLES_SELECTION}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedRole = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetRolesQ>> => {
  try {
    const { data, status } = await authApi.get<PaginationReturnType<GetRolesQ>>(
      `${URLs.GET_DELETED_ROLES}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchRoles = async (
  toast: ToastType,
  search: Search
): Promise<GetRolesQ> => {
  try {
    const { data, status } = await authApi.get<GetRolesQ>(
      `${URLs.SEARCH_ROLES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedRoles = async (
  toast: ToastType,
  search: Search
): Promise<GetRolesQ> => {
  try {
    const { data, status } = await authApi.get<GetRolesQ>(
      `${URLs.SEARCH_DELETED_ROLES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addRole = async (form: AddRoleF): Promise<AddRoleQ> => {
  try {
    const { data, status } = await authApi.post<AddRoleQ>(
      `${URLs.ADD_ROLE}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateRole = async (
  form: UpdateRoleF,
  id: Id
): Promise<UpdateRoleQ> => {
  try {
    const { data, status } = await authApi.put<UpdateRoleQ>(
      `${URLs.UPDATE_ROLE}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteRole = async (ids: Id[]): Promise<DeleteRoleQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_ROLE}/${id}`
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
export const restoreRole = async (ids: Id[]): Promise<DeleteRoleQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(`${URLs.RESTORE_ROLE}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
