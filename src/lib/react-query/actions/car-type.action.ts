import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import {
  AddCarTypeF,
  AddCarTypeQ,
  DeleteCarTypeQ,
  GetCarTypesQ,
  UpdateCarTypeF,
  UpdateCarTypeQ,
} from "@/types/car-type";

export const getCarTypes = async (toast: ToastType): Promise<GetCarTypesQ> => {
  try {
    const { data, status } = await authApi.get<GetCarTypesQ>(
      URLs.GET_CAR_TYPES
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addCarType = async (form: AddCarTypeF): Promise<AddCarTypeQ> => {
  try {
    const { data, status } = await authApi.post<AddCarTypeQ>(
      URLs.ADD_CAR_TYPE,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updateCarType = async (
  form: UpdateCarTypeF,
  id: Id
): Promise<UpdateCarTypeQ> => {
  try {
    const { data, status } = await authApi.put<UpdateCarTypeQ>(
      `${URLs.UPDATE_CAR_TYPE}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteCarType = async (id: Id): Promise<DeleteCarTypeQ> => {
  try {
    const { data, status } = await authApi.delete<DeleteCarTypeQ>(
      `${URLs.DELETE_CAR_TYPE}/${id}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
