import { useToast } from "@/components/ui/use-toast";
import {
  AddItemTypeF,
  AddItemTypeQ,
  DeleteItemTypeQ,
  GetItemTypesQ,
  UpdateItemTypeF,
  UpdateItemTypeQ,
} from "@/types/item-type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addItemType,
  deleteItemType,
  getDeletedItemType,
  getItemTypes,
  getItemTypeSelection,
  restoreItemType,
  searchDeletedItemTypes,
  searchItemTypes,
  updateItemType,
} from "../actions/item-type.action";
import { QUERY_KEYs } from "../key";
import {
  From,
  Id,
  NestError,
  Page,
  PaginationReturnType,
  Search,
  To,
} from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";

export const useGetItemTypes = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.ITEM_TYPES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemTypesQ>> =>
      getItemTypes(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetItemTypesSelection = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_TYPES_SELECTION],
    queryFn: () => getItemTypeSelection(toast),
    retry: 0,
  });
};
export const useGetDeletedItemTypes = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_ITEM_TYPES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemTypesQ>> =>
      getDeletedItemType(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};

export const useSearchItemTypes = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_ITEM_TYPES],
    queryFn: (): Promise<GetItemTypesQ> => searchItemTypes(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useSearchDeletedItemTypes = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_ITEM_TYPES],
    queryFn: (): Promise<GetItemTypesQ> =>
      searchDeletedItemTypes(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useAddItemType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddItemTypeF): Promise<AddItemTypeQ> =>
      addItemType(form),
    onSuccess: (data: AddItemTypeQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_TYPES_SELECTION],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_TYPES],
      });
    },
  });
};
export const useUpdateItemType = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateItemTypeF): Promise<UpdateItemTypeQ> =>
      updateItemType(form, id),
    onSuccess: (data: UpdateItemTypeQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_TYPES],
      });
    },
  });
};
export const useDeleteItemType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteItemTypeQ> => deleteItemType(ids),
    onSuccess: (data: DeleteItemTypeQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_ITEM_TYPES],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_TYPES],
      });
    },
  });
};
export const useRestoreItemType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteItemTypeQ> => restoreItemType(ids),
    onSuccess: (data: DeleteItemTypeQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_ITEM_TYPES],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_ITEM_TYPES],
      });
    },
  });
};
