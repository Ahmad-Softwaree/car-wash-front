import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { getFirebaseSize } from "../actions/firebase.action";
import { useToast } from "@/components/ui/use-toast";

export const useGetFirebaseSize = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.FIREBASE],
    queryFn: () => getFirebaseSize(toast),
    retry: 0,
  });
};
