import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import {
  AddRoleF,
  AddRoleQ,
  DeleteRoleQ,
  GetRolesQ,
  UpdateRoleF,
  UpdateRoleQ,
} from "@/types/role";

export const getRoles = async (toast: ToastType): Promise<GetRolesQ> => {
  try {
    const { data, status } = await authApi.get<GetRolesQ>(URLs.GET_ROLES);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addRole = async (form: AddRoleF): Promise<AddRoleQ> => {
  try {
    const { data, status } = await authApi.post<AddRoleQ>(URLs.ADD_ROLE, form);
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

export const deleteRole = async (id: Id): Promise<DeleteRoleQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteRoleQ>(
      `${URLs.DELETE_ROLE}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
