import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import {
  AddCarModelF,
  AddCarModelQ,
  DeleteCarModelQ,
  GetCarModelsQ,
  UpdateCarModelF,
  UpdateCarModelQ,
} from "@/types/car-model";

export const getCarModels = async (
  toast: ToastType
): Promise<GetCarModelsQ> => {
  try {
    const { data, status } = await authApi.get<GetCarModelsQ>(
      URLs.GET_CAR_MODELS
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addCarModel = async (
  form: AddCarModelF
): Promise<AddCarModelQ> => {
  try {
    const { data, status } = await authApi.post<AddCarModelQ>(
      URLs.ADD_CAR_MODEL,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updateCarModel = async (
  form: UpdateCarModelF,
  id: Id
): Promise<UpdateCarModelQ> => {
  try {
    const { data, status } = await authApi.put<UpdateCarModelQ>(
      `${URLs.UPDATE_CAR_MODEL}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteCarModel = async (id: Id): Promise<DeleteCarModelQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteCarModelQ>(
      `${URLs.DELETE_CAR_MODEL}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
