import { useGetCaseGlobalData } from "@/lib/react-query/query/report.query";

import { formatMoney } from "@/components/shared/FormatMoney";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import { Badge, Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import CustomClose from "@/components/shared/CustomClose";
import FilterModal from "@/components/shared/FilterModal";
import Dialog from "@/components/shared/Dialog";

const CaseGlobalData = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  let from = searchParam.get(ENUMs.FROM_PARAM as string);
  let to = searchParam.get(ENUMs.TO_PARAM as string);
  const { data, isLoading, refetch } = useGetCaseGlobalData(
    searchParam.get(ENUMs.FROM_PARAM as string) || "",
    searchParam.get(ENUMs.TO_PARAM as string) || ""
  );
  const [filter, setFilter] = useState<boolean>(false);
  useEffect(() => {
    refetch();
  }, [from, to, refetch]);
  return (
    <>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap">
        <Badge
          invisible={
            !searchParam.get(ENUMs.FROM_PARAM as string) &&
            !searchParam.get(ENUMs.TO_PARAM as string)
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Filter
            onClick={() => setFilter(true)}
            className="w-11 h-11 p-2 rounded-md dark-light hover:light-dark cursor-pointer default-border transition-all duration-200"
          />
        </Badge>
        {searchParam.get(ENUMs.FROM_PARAM as string) &&
          searchParam.get(ENUMs.TO_PARAM as string) && (
            <Button
              onClick={() => {
                setSearchParam((prev) => {
                  const params = new URLSearchParams(prev);
                  params.delete(ENUMs.FROM_PARAM as string);
                  params.delete(ENUMs.TO_PARAM as string);

                  return params;
                });
              }}
              className="!font-bukra !text-xs"
              size="md"
              variant="soft"
              color="danger"
            >
              سڕینەوەی فلتەر
            </Button>
          )}
      </div>

      {!isLoading && data && (
        <div className="w-full flex flex-col justify-center items-center z-[100]  table-dark-light   default-border p-2 gap-5">
          <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
            <p>پارەی سەرەتای ناو قاصە : {formatMoney(data?.total_money)}</p>
          </div>
          <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
            <p>کۆی فرۆشتن : {formatMoney(data?.total_sell)}</p>
          </div>

          <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
            <p>کۆی خەرجی : {formatMoney(data?.total_expense)}</p>
          </div>

          <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
            <p>کۆی ئێستای ناو قاصە : {formatMoney(data?.remain_money)}</p>
          </div>
        </div>
      )}

      {filter && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={filter}
          onClose={() => setFilter(false)}
        >
          <CustomClose onClick={() => setFilter(false)} />
          <FilterModal onClose={() => setFilter(false)} type="global_case" />
        </Dialog>
      )}
    </>
  );
};

export default CaseGlobalData;
