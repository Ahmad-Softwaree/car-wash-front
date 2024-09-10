import { useToast } from "@/components/ui/use-toast";
import {
  ChangeNameF,
  ChangeNameQ,
  ChangePasswordF,
  ChangePasswordQ,
  GetAuthQ,
  LoginF,
  LoginQ,
} from "@/types/auth";
import { NestError } from "@/types/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import {
  changeName,
  changePassword,
  getAuth,
  login,
  logout,
} from "../actions/auth.action";
import { useAuthContext } from "@/context/AuthContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { useNavigate } from "react-router-dom";
import { generateNestErrors } from "@/lib/functions";

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
  const queryCustomer = useQueryClient();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (form: LoginF) => login(form),
    onSuccess: (data: LoginQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      dispatch({
        type: CONTEXT_TYPEs.SET_USER,
        payload: data,
      });
      queryCustomer.setQueryData([QUERY_KEYs.AUTH], data.user);
      return navigate("/home");
    },
    onError: (error: NestError) => {
      console.log(error);
      return generateNestErrors(error, toast);
    },
  });
};

export const useLogout = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      dispatch({
        type: CONTEXT_TYPEs.REMOVE_USER,
      });

      queryCustomer.setQueryData([QUERY_KEYs.AUTH], null);
      return navigate("/login");
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useChangeName = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  const { dispatch } = useAuthContext();

  return useMutation({
    mutationFn: (form: ChangeNameF): Promise<ChangeNameQ> => changeName(form),
    onSuccess: (data: ChangeNameQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      dispatch({
        type: CONTEXT_TYPEs.SET_USER,
        payload: { user: data },
      });
      return queryCustomer.setQueryData([QUERY_KEYs.AUTH], data);
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useChangePassword = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  const { dispatch } = useAuthContext();

  return useMutation({
    mutationFn: async (form: ChangePasswordF) => {
      if (form.newPassword != form.reNewPassword) {
        throw new Error("Passwords must be the same");
      }
      return await changePassword(form);
    },
    onSuccess: (data: ChangePasswordQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      dispatch({
        type: CONTEXT_TYPEs.SET_USER,
        payload: { user: data },
      });
      return queryCustomer.setQueryData([QUERY_KEYs.AUTH], data);
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
