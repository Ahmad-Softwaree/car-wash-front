import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCarType,
  deleteCarType,
  getCarTypes,
  updateCarType,
} from "../actions/car-type.action";
import {
  AddCarTypeF,
  AddCarTypeQ,
  DeleteCarTypeQ,
  GetCarTypesQ,
  UpdateCarTypeF,
  UpdateCarTypeQ,
} from "@/types/car-type";
import { QUERY_KEYs } from "../key";
import { Id, NestError } from "@/types/global";
import { generateNestErrors } from "@/lib/functions";

export const useGetCarTypes = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CAR_TYPES],
    queryFn: (): Promise<GetCarTypesQ> => getCarTypes(toast),
    retry: 0,
  });
};

export const useAddCarType = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (form: AddCarTypeF): Promise<AddCarTypeQ> => addCarType(form),
    onSuccess: (data: AddCarTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useUpdateCarType = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (form: UpdateCarTypeF): Promise<UpdateCarTypeQ> =>
      updateCarType(form, id),
    onSuccess: (data: UpdateCarTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useDeleteCarType = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<DeleteCarTypeQ> => deleteCarType(id),
    onSuccess: (data: DeleteCarTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
