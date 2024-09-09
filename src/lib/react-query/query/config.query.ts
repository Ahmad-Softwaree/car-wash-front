import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateConfig, getConfigs } from "../actions/config.action";
import { NestError } from "@/types/global";
import { QUERY_KEYs } from "../key";
import { generateNestErrors } from "@/lib/functions";
import { GetConfigsQ, UpdateConfigQ } from "@/types/config";

export const useGetConfigs = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CONFIGS],
    queryFn: (): Promise<GetConfigsQ> => getConfigs(toast),
    retry: 0,
  });
};

export const useUpdateConfig = <T>(key: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: T): Promise<UpdateConfigQ> => updateConfig<T>(key, body),
    onSuccess: (data: UpdateConfigQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CONFIGS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
