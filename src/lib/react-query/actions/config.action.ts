import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { Id, ToastType } from "@/types/global";
import {
  CompanyImageFrom,
  CompanyImageFromF,
  CompanyInfo,
  CompanyInfoForm,
  GetConfigsQ,
  UpdateConfigQ,
} from "@/types/config";

export const getConfigs = async (toast: ToastType): Promise<GetConfigsQ> => {
  try {
    const { data, status } = await authApi.get<GetConfigsQ>(URLs.GET_CONFIGS);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const updateConfig = async <T>(
  key: string,
  body: T
): Promise<UpdateConfigQ> => {
  try {
    const { data, status } = await authApi.put<UpdateConfigQ>(
      `${URLs.UPDATE_CONFIG}/${key}`,
      { value: body }
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getCompanyInfo = async (
  toast: ToastType
): Promise<CompanyInfo> => {
  try {
    const { data, status } = await authApi.get<CompanyInfo>(
      URLs.GET_COMPANY_INFO
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const updateCompanyInfo = async (
  body: CompanyInfoForm
): Promise<CompanyInfo> => {
  try {
    const { data, status } = await authApi.put<CompanyInfo>(
      `${URLs.UPDATE_COMPANY_INFO}`,
      body
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const insertCompanyImage = async (
  body: CompanyImageFromF
): Promise<CompanyInfo> => {
  try {
    const { data, status } = await authApi.put<CompanyInfo>(
      `${URLs.INSERT_COMPANY_IMAGE}`,
      body
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteCompanyImage = async (): Promise<CompanyInfo> => {
  try {
    const { data, status } = await authApi.put<CompanyInfo>(
      `${URLs.DELETE_COMPANY_IMAGE}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
