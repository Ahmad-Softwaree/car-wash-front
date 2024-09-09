import { useGetAuth } from "@/lib/react-query/query/auth.query";
import { useCheckSetting } from "@/lib/react-query/query/setting.query";
import { Fallback } from "@/pages";
import { RouterProviderType } from "@/types/global";
import { Part } from "@/types/part";
import { CheckSettingType } from "@/types/setting";
import { Navigate } from "react-router-dom";

export default function CheckMandub({
  Component,
  part,
}: RouterProviderType & { part: string | "all" }) {
  const { data, isLoading } = useGetAuth();
  const { data: checkData, isLoading: checkLoading } = useCheckSetting([
    "مەندووب",
  ]);

  let check = data?.parts
    .map((val: Part, _index: number) => val.name)
    .includes(part);

  let canMandub = checkData?.find(
    (one: CheckSettingType, _index: number) => one.value == "مەندووب"
  )?.exists;

  if (isLoading || checkLoading) return <Fallback />;
  if (data && part == "all") return <Component />;
  if (!data || !check || !canMandub) return <Navigate replace to={`/`} />;
  if (data && check && canMandub) return <Component />;
}
