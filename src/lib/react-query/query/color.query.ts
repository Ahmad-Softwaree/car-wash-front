import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addColor,
  deleteColor,
  getColors,
  updateColor,
} from "../actions/color.action";
import {
  AddColorF,
  AddColorQ,
  DeleteColorQ,
  GetColorsQ,
  UpdateColorF,
  UpdateColorQ,
} from "@/types/color";
import { QUERY_KEYs } from "../key";
import { Id, NestError } from "@/types/global";
import { generateNestErrors } from "@/lib/functions";

export const useGetColors = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.COLORS],
    queryFn: (): Promise<GetColorsQ> => getColors(toast),
    retry: 0,
  });
};

export const useAddColor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: AddColorF): Promise<AddColorQ> => addColor(form),
    onSuccess: (data: AddColorQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.COLORS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useUpdateColor = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: UpdateColorF): Promise<UpdateColorQ> =>
      updateColor(form, id),
    onSuccess: (data: UpdateColorQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.COLORS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useDeleteColor = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<DeleteColorQ> => deleteColor(id),
    onSuccess: (data: DeleteColorQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.COLORS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
