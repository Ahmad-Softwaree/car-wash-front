import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { GetEmployeesComboboxQ } from "@/types/employee";
import { ToastType } from "@/types/global";

export const getEmployeesCombobox = async (
  toast: ToastType
): Promise<GetEmployeesComboboxQ> => {
  try {
    const { data, status } = await authApi.get<GetEmployeesComboboxQ>(
      URLs.GET_EMPLOYEES_COMBOBOX
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
