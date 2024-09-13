import { useGetAuth } from "@/lib/react-query/query/auth.query";
import { Fallback } from "@/pages";
import { RouterProviderType } from "@/types/global";
import { Part } from "@/types/part";
import { Navigate } from "react-router-dom";

export default function CheckPart({
  Component,
  part,
}: RouterProviderType & { part: string[] | "all" }) {
  const { data, isLoading } = useGetAuth();

  const check = data?.parts
    .map((val: Part) => val.name)
    .some((name: string) => part.includes(name));

  if (isLoading) return <Fallback />;
  if (data && part.includes("all")) return <Component />;
  if (!data || !check) return <Navigate replace to={`/`} />;
  if (data && check) return <Component />;
}
