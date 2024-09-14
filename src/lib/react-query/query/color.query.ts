import { useToast } from "@/components/ui/use-toast";
import {
  AddColorF,
  AddColorQ,
  DeleteColorQ,
  GetColorsQ,
  UpdateColorF,
  UpdateColorQ,
} from "@/types/color";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addColor,
  deleteColor,
  getDeletedColor,
  getColors,
  restoreColor,
  searchDeletedColors,
  searchColors,
  updateColor,
} from "../actions/color.action";
import { QUERY_KEYs } from "../key";
import {
  Id,
  NestError,
  Page,
  PaginationReturnType,
  Search,
} from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";

export const useGetColors = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.COLORS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetColorsQ>> =>
      getColors(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetDeletedColors = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_COLORS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetColorsQ>> =>
      getDeletedColor(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useSearchColors = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_COLORS],
    queryFn: (): Promise<GetColorsQ> => searchColors(toast, search),
    enabled: !!search,
    retry: 0,
  });
};
export const useSearchDeletedColors = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_COLORS],
    queryFn: (): Promise<GetColorsQ> => searchDeletedColors(toast, search),
    enabled: !!search,
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
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
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
    mutationFn: async (form: UpdateColorF): Promise<UpdateColorQ> =>
      updateColor(form, id),
    onSuccess: (data: UpdateColorQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
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
export const useDeleteColor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteColorQ> => deleteColor(ids),
    onSuccess: (data: DeleteColorQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_COLORS],
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
export const useRestoreColor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteColorQ> => restoreColor(ids),
    onSuccess: (data: DeleteColorQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_COLORS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_COLORS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
