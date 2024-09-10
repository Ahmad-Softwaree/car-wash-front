import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPart,
  deletePart,
  getParts,
  updatePart,
} from "../actions/part.action";
import {
  AddPartF,
  AddPartQ,
  DeletePartQ,
  GetPartsQ,
  UpdatePartF,
  UpdatePartQ,
} from "@/types/part";
import { QUERY_KEYs } from "../key";
import { Id, NestError } from "@/types/global";
import { generateNestErrors } from "@/lib/functions";

export const useGetParts = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.PARTS],
    queryFn: (): Promise<GetPartsQ> => getParts(toast),
    retry: 0,
  });
};

export const useAddPart = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (form: AddPartF): Promise<AddPartQ> => addPart(form),
    onSuccess: (data: AddPartQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.PARTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useUpdatePart = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (form: UpdatePartF): Promise<UpdatePartQ> =>
      updatePart(form, id),
    onSuccess: (data: UpdatePartQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.PARTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useDeletePart = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<DeletePartQ> => deletePart(id),
    onSuccess: (data: DeletePartQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.PARTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
