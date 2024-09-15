import { useToast } from "@/components/ui/use-toast";
import {
  AddItemToSellF,
  AddSellItemQ,
  AddSellQ,
  DeleteSellItemQ,
  DeleteSellQ,
  UpdateItemInSellF,
  UpdateSellF,
  UpdateSellItemQ,
  UpdateSellQ,
} from "@/types/sell";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addItemToSell,
  addSell,
  deleteItemInSell,
  deleteSell,
  getSell,
  getSellItems,
  restoreSell,
  updateItemInSell,
  updateSell,
} from "../actions/sell.action";
import { QUERY_KEYs } from "../key";
import { Id, NestError } from "@/types/global";
import { generateNestErrors } from "@/lib/functions";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

export const useGetSells = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL],
    queryFn: () => getSell(toast),
    retry: 0,
  });
};
export const useGetSellItems = (sell_id: Id) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SELL_ITEMS, sell_id],
    queryFn: () => getSellItems(toast, sell_id),
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

  return useMutation({
    mutationFn: async (form: AddItemToSellF): Promise<AddSellItemQ> =>
      addItemToSell(form, sell_id),
    onSuccess: (data: AddSellItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "مەواد زیادکرا بۆ سەر پسولە",
        alertType: "success",
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

export const useDeleteItemInSell = (sell_id: Id, item_id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<DeleteSellItemQ> =>
      deleteItemInSell(sell_id, item_id),
    onSuccess: (data: DeleteSellItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "مەواد سڕایەوە  لەسەر پسولە",
        alertType: "success",
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
        params.delete(ENUMs.SELL_PARAM as string);
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
export const useRestoreSell = () => {
  const { toast } = useToast();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteSellQ> => restoreSell(ids),
    onSuccess: (data: DeleteSellQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "پسولەکە گێردرایەوە",
        alertType: "success",
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
