import { getCookie } from "@/lib/config/cookie.config";
import { ENUMs } from "@/lib/enum";
import { useGetAuth } from "@/lib/react-query/query/auth.query";
import { Fallback } from "@/pages";
import { RouterProviderType } from "@/types";
import { Navigate } from "react-router-dom";

export default function UserNullRouterProvider({
  Component,
}: RouterProviderType) {
  const { data, isLoading } = useGetAuth();
  let token = getCookie({ name: ENUMs.COOKIE_NAME });
  if (isLoading) return <Fallback />;
  if (token && data) return <Navigate replace to={`/home`} />;
  if (!token || !data) return <Component />;
}
