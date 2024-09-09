import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import { GetRolePartQ } from "@/types/role-part";

export const getRoleParts = async (
  toast: ToastType,
  id: Id
): Promise<GetRolePartQ> => {
  try {
    const { data, status } = await authApi.get<GetRolePartQ>(
      `${URLs.GET_ROLE_PARTS}/${id}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
