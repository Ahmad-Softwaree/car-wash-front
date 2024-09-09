import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCarModel,
  deleteCarModel,
  getCarModels,
  updateCarModel,
} from "../actions/car-model.action";
import {
  AddCarModelF,
  AddCarModelQ,
  DeleteCarModelQ,
  GetCarModelsQ,
  UpdateCarModelF,
  UpdateCarModelQ,
} from "@/types/car-model";
import { QUERY_KEYs } from "../key";
import { Id, NestError } from "@/types/global";
import { generateNestErrors } from "@/lib/functions";

export const useGetCarModels = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CAR_MODELS],
    queryFn: (): Promise<GetCarModelsQ> => getCarModels(toast),
    retry: 0,
  });
};

export const useAddCarModel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: AddCarModelF): Promise<AddCarModelQ> =>
      addCarModel(form),
    onSuccess: (data: AddCarModelQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_MODELS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useUpdateCarModel = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: UpdateCarModelF): Promise<UpdateCarModelQ> =>
      updateCarModel(form, id),
    onSuccess: (data: UpdateCarModelQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_MODELS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useDeleteCarModel = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<DeleteCarModelQ> => deleteCarModel(id),
    onSuccess: (data: DeleteCarModelQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_MODELS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
