import { useToast } from "@/components/ui/use-toast";
import {
  AddUserF,
  AddUserQ,
  DeleteUserQ,
  GetUsersQ,
  UpdateUserF,
  UpdateUserQ,
} from "@/types/auth";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addUser,
  deleteUser,
  getDeletedUser,
  getUsers,
  restoreUser,
  searchDeletedUsers,
  searchUsers,
  updateUser,
} from "../actions/user.action";
import { QUERY_KEYs } from "../key";
import {
  Filter,
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

export const useGetUsers = (filter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.USERS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetUsersQ>> =>
      getUsers(toast, pageParam, ENUMs.LIMIT as number, filter),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetDeletedUsers = (filter: Filter) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_USERS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetUsersQ>> =>
      getDeletedUser(toast, pageParam, ENUMs.LIMIT as number, filter),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useSearchUsers = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_USERS],
    queryFn: (): Promise<GetUsersQ> => searchUsers(toast, search),
    enabled: !!search,
    retry: 0,
  });
};
export const useSearchDeletedUsers = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_USERS],
    queryFn: (): Promise<GetUsersQ> => searchDeletedUsers(toast, search),
    enabled: !!search,
    retry: 0,
  });
};
export const useAddUser = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: (form: AddUserF): Promise<AddUserQ> => addUser(form),
    onSuccess: (data: AddUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateUser = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateUserF): Promise<UpdateUserQ> =>
      updateUser(form, id),
    onSuccess: (data: UpdateUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteUser = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteUserQ> => deleteUser(ids),
    onSuccess: (data: DeleteUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_USERS],
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useRestoreUser = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteUserQ> => restoreUser(ids),
    onSuccess: (data: DeleteUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_USERS],
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
