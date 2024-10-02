import Search from "@/components/shared/Search";
import DatePicker from "@/components/shared/DatePicker";
import TFoot from "@/components/ui/TFoot";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import TBody from "@/components/ui/TBody";
import { Sell } from "@/types/sell";
import SellCard from "@/components/cards/SellCard";
import { useSearchParams } from "react-router-dom";
import {
  useGetCaseReport,
  useGetCaseReportInformation,
  useGetCaseReportInformationSearch,
  useGetCaseReportSearch,
  useSellPrint,
} from "@/lib/react-query/query/report.query";
import { ENUMs } from "@/lib/enum";
import Pagination from "@/components/providers/Pagination";
import { useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/components/shared/FormatMoney";
import useDebounce from "@/hooks/useDebounce";
import { Filter, Printer } from "lucide-react";
import { Badge, Button, Chip } from "@mui/joy";
import PrintModal from "@/components/ui/PrintModal";
import Dialog from "@/components/shared/Dialog";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";
import CustomClose from "@/components/shared/CustomClose";
import FilterModal from "@/components/shared/FilterModal";
import { CaseReport } from "@/types/global";
import CaseReportCard from "@/components/cards/CaseReportCard";
const CaseReportList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  let search = searchParam.get(ENUMs.SEARCH_PARAM as string);
  let from = searchParam.get(ENUMs.FROM_PARAM as string);
  let to = searchParam.get(ENUMs.TO_PARAM as string);

  const [print, setPrint] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  const {
    data: reportData,
    isLoading,
    refetch,
  } = useGetCaseReportInformation(from || "", to || "");
  useEffect(() => {
    refetch();
  }, [from, to, refetch]);

  const {
    data: searchReportData,
    isLoading: searchLoading,
    refetch: searchRefetch,
  } = useGetCaseReportInformationSearch(search || "");
  useEffect(() => {
    searchRefetch();
  }, [searchRefetch, search]);

  console.log(reportData);
  return (
    <>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap">
        <Search />
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
        <Chip variant="soft" color="warning">
          <Printer
            onClick={() => {
              setPrint(true);
            }}
            className="w-11 h-11 p-2 cursor-pointer"
          />
        </Chip>
      </div>
      <Pagination<CaseReport[]>
        queryFn={() =>
          useGetCaseReport(
            searchParam.get(ENUMs.FROM_PARAM as string) || "",
            searchParam.get(ENUMs.TO_PARAM as string) || ""
          )
        }
        searchQueryFn={() =>
          useGetCaseReportSearch(
            searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
          )
        }
      >
        {({
          isFetchingNextPage,
          hasNextPage,
          ref,
          data,
          isSearched,
          searchData,
          isLoading,
        }) => {
          const allData = useMemo(
            () =>
              !isSearched
                ? data?.pages && data?.pages?.length > 0
                  ? data.pages.map((page) => page.paginatedData).flat()
                  : []
                : searchData && searchData.length > 0
                ? searchData
                : [],
            [data, searchData, isSearched]
          );
          if (isLoading) {
            return (
              <Loading>
                <TailSpin />
              </Loading>
            );
          }
          return (
            <div className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll">
              <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                  <Tr>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-1">#</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">کۆدی بەکارهێنەر</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">بەکارهێنەر</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">دانەی فرۆشراو</p>
                    </Th>{" "}
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">نرخی فرۆشتن</p>
                    </Th>{" "}
                  </Tr>
                </THead>
                <TBody className="w-full ">
                  <>
                    {allData?.map((val: CaseReport, index: number) => (
                      <CaseReportCard key={val.id} index={index} {...val} />
                    ))}
                    {!isFetchingNextPage && hasNextPage && !isSearched && (
                      <div className="h-[20px]" ref={ref}></div>
                    )}
                  </>
                </TBody>
                <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
                  <Tr className="!default-border">
                    <Td className="text-center" colSpan={4}>
                      <p>
                        کۆی دانەی فرۆشراو :{" "}
                        {!isSearched
                          ? formatMoney(reportData?.total_quantity)
                          : formatMoney(searchReportData?.total_quantity)}
                      </p>
                    </Td>
                    <Td className="text-center" colSpan={4}>
                      <p>
                        کۆی نرخی فرۆشراو :{" "}
                        {!isSearched
                          ? formatMoney(reportData?.total_item_sell_price)
                          : formatMoney(
                              searchReportData?.total_item_sell_price
                            )}
                      </p>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td className="text-center" colSpan={9}>
                      ژمارەی داتا {allData.length}
                    </Td>
                  </Tr>
                </TFoot>
              </Table>
            </div>
          );
        }}
      </Pagination>
      {print && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={print}
          onClose={() => setPrint(false)}
        >
          <PrintModal
            printFn={() => useSellPrint(search || "", from || "", to || "")}
            onClose={() => setPrint(false)}
          />
        </Dialog>
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
          <FilterModal onClose={() => setFilter(false)} type="sell_report" />
        </Dialog>
      )}
    </>
  );
};

export default CaseReportList;
