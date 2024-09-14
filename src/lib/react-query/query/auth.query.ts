import { useToast } from "@/components/ui/use-toast";
import {
  ChangeProfileF,
  ChangeProfileQ,
  GetAuthQ,
  LoginF,
  LoginQ,
} from "@/types/auth";
import { NestError } from "@/types/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { changeProfile, getAuth, login, logout } from "../actions/auth.action";
import { useAuthContext } from "@/context/AuthContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { useNavigate } from "react-router-dom";
import { generateNestErrors } from "@/lib/functions";
import { ENUMs } from "@/lib/enum";

export const useGetAuth = () => {
  const { toast } = useToast();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  return useQuery({
    queryKey: [QUERY_KEYs.AUTH],
    queryFn: (): Promise<GetAuthQ> => getAuth(toast, dispatch, navigate),
    retry: 0,
  });
};
export const useLogin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (form: LoginF) => login(form),
    onSuccess: (data: LoginQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.SET_USER,
        payload: data,
      });
      queryClient.setQueryData([QUERY_KEYs.AUTH], data.user);
      return navigate(`${ENUMs.GENERAL_SECTION}/${ENUMs.DASHBOARD_PART}`);
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useLogout = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.REMOVE_USER,
      });

      queryClient.setQueryData([QUERY_KEYs.AUTH], null);
      return navigate("/login");
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useChangeProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext();

  return useMutation({
    mutationFn: (form: ChangeProfileF): Promise<ChangeProfileQ> =>
      changeProfile(form),
    onSuccess: (data: ChangeProfileQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.SET_USER,
        payload: { user: data },
      });
      return queryClient.setQueryData([QUERY_KEYs.AUTH], data);
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
