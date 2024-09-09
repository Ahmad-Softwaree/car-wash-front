import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { GetEmployeesComboboxQ } from "@/types/employee";
import { getEmployeesCombobox } from "../actions/employee.action";

export const useGetEmployeesCombobox = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.EMPLOYEES_COMBOBOX],
    queryFn: (): Promise<GetEmployeesComboboxQ> => getEmployeesCombobox(toast),
    retry: 0,
  });
};
