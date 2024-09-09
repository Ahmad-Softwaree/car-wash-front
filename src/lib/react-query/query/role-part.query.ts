import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { GetRolePartQ } from "@/types/role-part";
import { getRoleParts } from "../actions/role-part.actoin";
import { Id } from "@/types/global";

export const useGetRoleParts = (id: Id) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ROLE_PARTS],
    queryFn: (): Promise<GetRolePartQ> => getRoleParts(toast, id),
    retry: 0,
    enabled: !!id && id != -1,
  });
};
