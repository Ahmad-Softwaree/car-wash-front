import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../actions/role.action";
import {
  AddRoleF,
  AddRoleQ,
  DeleteRoleQ,
  GetRolesQ,
  UpdateRoleF,
  UpdateRoleQ,
} from "@/types/role";
import { QUERY_KEYs } from "../key";
import { Id, NestError } from "@/types/global";
import { generateNestErrors } from "@/lib/functions";

export const useGetRoles = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ROLES],
    queryFn: (): Promise<GetRolesQ> => getRoles(toast),
    retry: 0,
  });
};

export const useAddRole = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: AddRoleF): Promise<AddRoleQ> => addRole(form),
    onSuccess: (data: AddRoleQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ROLES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useUpdateRole = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: UpdateRoleF): Promise<UpdateRoleQ> =>
      updateRole(form, id),
    onSuccess: (data: UpdateRoleQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ROLES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useDeleteRole = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<DeleteRoleQ> => deleteRole(id),
    onSuccess: (data: DeleteRoleQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ROLES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
