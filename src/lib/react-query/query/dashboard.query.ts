import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { getDashboardData } from "../actions/dashboard.action";

export const useGetDashboardData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.DASHBOARD],
    queryFn: (): Promise<any> => getDashboardData(toast),
    retry: 0,
  });
};
