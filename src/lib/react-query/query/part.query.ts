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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: AddPartF): Promise<AddPartQ> => addPart(form),
    onSuccess: (data: AddPartQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.PARTS],
      });
    },
  });
};

export const useUpdatePart = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: UpdatePartF): Promise<UpdatePartQ> =>
      updatePart(form, id),
    onSuccess: (data: UpdatePartQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.PARTS],
      });
    },
  });
};

export const useDeletePart = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<DeletePartQ> => deletePart(id),
    onSuccess: (data: DeletePartQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.PARTS],
      });
    },
  });
};
