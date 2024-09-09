import { useGetAuth } from "@/lib/react-query/query/auth.query";
import { Fallback } from "@/pages";
import { RouterProviderType } from "@/types/global";
import { Part } from "@/types/part";
import { Navigate } from "react-router-dom";

export default function CheckPart({
  Component,
  part,
}: RouterProviderType & { part: string | "all" }) {
  const { data, isLoading } = useGetAuth();
  let check = data?.parts
    .map((val: Part, _index: number) => val.name)
    .includes(part);
  if (isLoading) return <Fallback />;
  if (data && part == "all") return <Component />;
  if (!data || !check) return <Navigate replace to={`/`} />;
  if (data && check) return <Component />;
}
