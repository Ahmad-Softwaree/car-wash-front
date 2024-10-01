import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import {
  AddReservationF,
  AddReservationQ,
  DeleteReservationQ,
  GetReservationsQ,
  PanelReservation,
  UpdateReservationF,
  UpdateReservationQ,
} from "@/types/reservation";
import {
  addReservation,
  completeReservation,
  deleteReservation,
  getDeletedReservation,
  getPanelReservation,
  getReservations,
  restoreReservation,
  searchDeletedReservations,
  searchReservations,
  updateReservation,
} from "../actions/reservation.action";
import { useToast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/context/GlobalContext";
import {
  Filter,
  From,
  Id,
  NestError,
  Page,
  PaginationReturnType,
  Search,
  To,
} from "@/types/global";
import { CONTEXT_TYPEs } from "@/context/types";
import { generateNestErrors } from "@/lib/functions";
import { ENUMs } from "@/lib/enum";

export const useGetPanelReservation = (date: Date) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: [QUERY_KEYs.PANEL_RESERVATIONS],
    queryFn: (): Promise<PanelReservation[]> =>
      getPanelReservation(toast, date),
    retry: 0,
  });
};

export const useGetReservations = (date: Date, filter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.RESERVATIONS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetReservationsQ>> =>
      getReservations(toast, pageParam, ENUMs.LIMIT as number, date, filter),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetDeletedReservations = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_RESERVATIONS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetReservationsQ>> =>
      getDeletedReservation(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useSearchReservations = (search: Search, date: Date) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_RESERVATIONS],
    queryFn: (): Promise<GetReservationsQ> =>
      searchReservations(toast, search, date),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useSearchDeletedReservations = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_RESERVATIONS],
    queryFn: (): Promise<GetReservationsQ> =>
      searchDeletedReservations(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useAddReservation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddReservationF): Promise<AddReservationQ> =>
      addReservation(form),
    onSuccess: (data: AddReservationQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.PANEL_RESERVATIONS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.RESERVATIONS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateReservation = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateReservationF): Promise<UpdateReservationQ> =>
      updateReservation(form, id),
    onSuccess: (data: UpdateReservationQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.PANEL_RESERVATIONS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.RESERVATIONS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteReservation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteReservationQ> =>
      deleteReservation(ids),
    onSuccess: (data: DeleteReservationQ) => {
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
        queryKey: [QUERY_KEYs.PANEL_RESERVATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.RESERVATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_RESERVATIONS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.RESERVATIONS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useRestoreReservation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteReservationQ> =>
      restoreReservation(ids),
    onSuccess: (data: DeleteReservationQ) => {
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
        queryKey: [QUERY_KEYs.PANEL_RESERVATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.RESERVATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_RESERVATIONS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_RESERVATIONS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useCompleteReservation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: ({
      ids,
      complete,
    }: {
      ids: Id[];
      complete: boolean;
    }): Promise<DeleteReservationQ> => completeReservation(ids, complete),
    onSuccess: (data: DeleteReservationQ) => {
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
        queryKey: [QUERY_KEYs.PANEL_RESERVATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.RESERVATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_RESERVATIONS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_RESERVATIONS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
