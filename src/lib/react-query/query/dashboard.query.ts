import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { getDashboardData } from "../actions/dashboard.action";
import { Dashboard } from "@/types/dashboard";

export const useGetDashboardData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.DASHBOARD],
    queryFn: (): Promise<Dashboard> => getDashboardData(toast),
    retry: 0,
  });
};
