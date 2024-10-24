import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  updateConfig,
  getConfigs,
  getCompanyInfo,
  updateCompanyInfo,
  insertCompanyImage,
  deleteCompanyImage,
} from "../actions/config.action";
import { NestError } from "@/types/global";
import { QUERY_KEYs } from "../key";
import { generateNestErrors } from "@/lib/functions";
import {
  CompanyImageFrom,
  CompanyInfo,
  CompanyInfoForm,
  GetConfigsQ,
  UpdateConfigQ,
} from "@/types/config";
import { StorageReference } from "firebase/storage";
import { deleteImage, insertImage } from "../actions/firebase.action";
import { ENUMs } from "@/lib/enum";

export const useGetConfigs = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CONFIGS],
    queryFn: (): Promise<GetConfigsQ> => getConfigs(toast),
    retry: 0,
  });
};

export const useUpdateConfig = <T>() => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
      key,
    }: {
      body: T;
      key: string;
    }): Promise<UpdateConfigQ> => updateConfig<T>(key, body),
    onSuccess: (data: UpdateConfigQ) => {
      return toast({
        alertType: "success",
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CONFIGS],
      });
    },
  });
};
export const useGetCompanyInfo = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.COMPANY_INFO],
    queryFn: (): Promise<CompanyInfo> => getCompanyInfo(toast),
    retry: 0,
  });
};

export const useUpdateCompanyInfo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CompanyInfoForm): Promise<CompanyInfo> =>
      updateCompanyInfo(body),
    onSuccess: (data: CompanyInfo) => {
      return toast({
        alertType: "success",
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.COMPANY_INFO],
      });
    },
  });
};

export const useInsertCompanyImage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: CompanyImageFrom): Promise<CompanyInfo> => {
      let imageRef: StorageReference | null = null;

      try {
        let the_image_url = "";
        let the_image_name = "";

        if (form.image && form.image[0]) {
          const {
            image_url,
            image_name,
            imageRef: ref,
          } = await insertImage(
            form.image[0],
            ENUMs.DEFAULT_BUCKET as string,
            toast
          );
          the_image_url = image_url;
          the_image_name = image_name;
          imageRef = ref;
        }

        let { image, ...others } = form;
        let finalForm = {
          image_url: the_image_url,
          image_name: the_image_name,
          ...others,
        };
        const result = await insertCompanyImage(finalForm);

        return result;
      } catch (error: any) {
        if (imageRef) {
          await deleteImage(imageRef, toast);
        }
        throw error;
      }
    },
    onSuccess: (data: CompanyInfo) => {
      return toast({
        alertType: "success",
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.COMPANY_INFO],
      });
    },
  });
};

export const useDeleteCompanyImage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<CompanyInfo> => deleteCompanyImage(),
    onSuccess: (data: CompanyInfo) => {
      return toast({
        alertType: "success",
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.COMPANY_INFO],
      });
    },
  });
};
