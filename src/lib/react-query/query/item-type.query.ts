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

export const useGetItemTypes = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.ITEM_TYPES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemTypesQ>> =>
      getItemTypes(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
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
export const useGetDeletedItemTypes = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_ITEM_TYPES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemTypesQ>> =>
      getDeletedItemType(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useSearchItemTypes = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_ITEM_TYPES],
    queryFn: (): Promise<GetItemTypesQ> => searchItemTypes(toast, search),
    enabled: !!search,
    retry: 0,
  });
};
export const useSearchDeletedItemTypes = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_ITEM_TYPES],
    queryFn: (): Promise<GetItemTypesQ> =>
      searchDeletedItemTypes(toast, search),
    enabled: !!search,
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
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
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
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
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
        queryKey: [QUERY_KEYs.SEARCH_ITEM_TYPES],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
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
        queryKey: [QUERY_KEYs.SEARCH_DELETED_ITEM_TYPES],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_ITEM_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
