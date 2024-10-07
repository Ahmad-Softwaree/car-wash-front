import { useToast } from "@/components/ui/use-toast";
import {
  AddItemToSellF,
  AddSellItemQ,
  AddSellQ,
  DeleteSellItemQ,
  DeleteSellQ,
  GetSellItemsQ,
  GetSellsQ,
  RestoreSelfDeletedSellItemQ,
  RestoreSellQ,
  UpdateItemInSellF,
  UpdateSellF,
  UpdateSellItemQ,
  UpdateSellQ,
} from "@/types/sell";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addItemToSell,
  addSell,
  decreaseItemInSell,
  deleteItemInSell,
  deleteSell,
  getDeletedSell,
  getDeletedSellItems,
  getSelfDeletedSellItems,
  getSell,
  getSellItems,
  getSellPrint,
  getSells,
  increaseItemInSell,
  restoreSelfDeletedSellItem,
  restoreSell,
  searchDeletedSells,
  searchSelfDeletedSellItems,
  searchSells,
  updateItemInSell,
  updateSell,
} from "../actions/sell.action";
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
import { generateNestErrors } from "@/lib/functions";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

export const useGetSells = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.SELLS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetSellsQ>> =>
      getSells(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetSelfDeletedSellItems = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.SELF_DELETED_SELL_ITEMS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetSellItemsQ>> =>
      getSelfDeletedSellItems(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useSearchSelfDeletedSellItems = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_SELF_DELETED_SELL_ITEMS],
    queryFn: (): Promise<GetSellItemsQ> =>
      searchSelfDeletedSellItems(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useGetDeletedSells = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_SELLS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetSellsQ>> =>
      getDeletedSell(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useSearchSells = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_SELLS],
    queryFn: (): Promise<GetSellsQ> => searchSells(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useSearchDeletedSells = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_SELLS],
    queryFn: (): Promise<GetSellsQ> => searchDeletedSells(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};

export const useGetSell = (sell_id: Id) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL],
    queryFn: () => getSell(toast, sell_id),
    retry: 0,
  });
};
export function useGetSellPrint(sell_id: Id) {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.SELL_PRINT],
    queryFn: (): Promise<Blob | null> => getSellPrint(toast, sell_id),
    enabled: !!sell_id,
    retry: 0,
  });
}
export const useGetSellItems = (sell_id: Id) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL_ITEMS, sell_id],
    queryFn: () => getSellItems(toast, sell_id),
    retry: 0,
    enabled: !!sell_id,
  });
};
export const useGetDeletedSellItems = (sell_id: Id) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.DELETED_SELL_ITEMS, sell_id],
    queryFn: () => getDeletedSellItems(toast, sell_id),
    retry: 0,
    enabled: !!sell_id,
  });
};
export const useAddSell = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();

  return useMutation({
    mutationFn: (): Promise<AddSellQ> => addSell(),
    onSuccess: (data: AddSellQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "پسولەی نوێ دروستبوو",
        alertType: "success",
      });
      setSearchParam((prev) => {
        const params = new URLSearchParams(prev);
        params.set(ENUMs.SELL_PARAM as string, data.id.toString());
        return params;
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateSell = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateSellF): Promise<UpdateSellQ> =>
      updateSell(form, id),
    onSuccess: (data: UpdateSellQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "پسولەکە چاککرا",
        alertType: "success",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useAddItemToSell = (sell_id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();
  return useMutation({
    mutationFn: async (form: AddItemToSellF): Promise<AddSellItemQ> =>
      addItemToSell(form, sell_id),
    onSuccess: (data: AddSellItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "مەواد زیادکرا بۆ سەر پسولە",
        alertType: "success",
      });
      setSearchParam((prev) => {
        const params = new URLSearchParams(prev);
        params.set(ENUMs.SELL_PARAM as string, data.sell_id.toString());
        return params;
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL_ITEMS, data.sell_id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useUpdateItemInSell = (sell_id: Id, item_id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateItemInSellF): Promise<UpdateSellItemQ> =>
      updateItemInSell(form, sell_id, item_id),
    onSuccess: (data: UpdateSellItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "مەواد چاککرا  لەسەر پسولە",
        alertType: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL_ITEMS, sell_id],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useIncreaseItemInSell = (sell_id: Id, item_id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<UpdateSellItemQ> =>
      increaseItemInSell(sell_id, item_id),
    onSuccess: (data: UpdateSellItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "مەواد زیادکرا  لەسەر پسولە",
        alertType: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL_ITEMS, sell_id],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDecreaseItemInSell = (sell_id: Id, item_id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<UpdateSellItemQ> =>
      decreaseItemInSell(sell_id, item_id),
    onSuccess: (data: UpdateSellItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "مەواد کەمکرا  لەسەر پسولە",
        alertType: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL_ITEMS, sell_id],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteItemInSell = (sell_id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();
  return useMutation({
    mutationFn: async (item_ids: Id[]): Promise<DeleteSellItemQ> =>
      deleteItemInSell(sell_id, item_ids),
    onSuccess: (data: DeleteSellItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "مەواد سڕایەوە  لەسەر پسولە",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL_ITEMS, sell_id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useDeleteSell = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();
  const [searchParam, setSearchParam] = useSearchParams();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteSellQ> => deleteSell(ids),
    onSuccess: (data: DeleteSellQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "پسولەکە سڕایەوە",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      setSearchParam((prev) => {
        const params = new URLSearchParams(prev);
        params.set(ENUMs.SELL_PARAM as string, "0");
        return params;
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELLS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_SELLS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELL],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useRestoreSell = (item_ids: Id[]) => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sell_id: Id): Promise<RestoreSellQ> =>
      restoreSell(sell_id, item_ids),
    onSuccess: (data: RestoreSellQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "پسولەکە گێردرایەوە",
        alertType: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_SELLS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_SELLS],
      });
      return dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useRestoreSelfDeletedSellItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<RestoreSelfDeletedSellItemQ> =>
      restoreSelfDeletedSellItem(ids),
    onSuccess: (data: RestoreSelfDeletedSellItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "مەوادی سەر پسوڵە گێردرایەوە",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SELF_DELETED_SELL_ITEMS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_SELF_DELETED_SELL_ITEMS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
