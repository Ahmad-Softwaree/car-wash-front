import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addService,
  deleteService,
  getServices,
  updateService,
} from "../actions/service.action";
import {
  AddServiceF,
  AddServiceQ,
  DeleteServiceQ,
  GetServicesQ,
  UpdateServiceF,
  UpdateServiceQ,
} from "@/types/service";
import { QUERY_KEYs } from "../key";
import { Id, NestError } from "@/types/global";
import { generateNestErrors } from "@/lib/functions";

export const useGetServices = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SERVICES],
    queryFn: (): Promise<GetServicesQ> => getServices(toast),
    retry: 0,
  });
};

export const useAddService = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: AddServiceF): Promise<AddServiceQ> => addService(form),
    onSuccess: (data: AddServiceQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SERVICES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useUpdateService = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: UpdateServiceF): Promise<UpdateServiceQ> =>
      updateService(form, id),
    onSuccess: (data: UpdateServiceQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SERVICES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useDeleteService = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<DeleteServiceQ> => deleteService(id),
    onSuccess: (data: DeleteServiceQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SERVICES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
