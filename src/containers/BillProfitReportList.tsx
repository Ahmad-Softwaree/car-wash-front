import Search from "@/components/shared/Search";
import TFoot from "@/components/ui/TFoot";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import TBody from "@/components/ui/TBody";
import { useSearchParams } from "react-router-dom";
import {
  useGetBillProfitReport,
  useGetBillProfitReportInformation,
  useGetBillProfitReportInformationSearch,
  useGetBillProfitReportSearch,
  useBillProfitPrint,
} from "@/lib/react-query/query/report.query";
import { ENUMs } from "@/lib/enum";
import Pagination from "@/components/providers/Pagination";
import { useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/components/shared/FormatMoney";
import { Filter, Printer } from "lucide-react";
import { Badge, Button, Chip } from "@mui/joy";
import PrintModal from "@/components/ui/PrintModal";
import Dialog from "@/components/shared/Dialog";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";
import CustomClose from "@/components/shared/CustomClose";
import FilterModal from "@/components/shared/FilterModal";
import SellProfitCard from "@/components/cards/SellProfitCard";
import { Sell } from "@/types/sell";
const BillProfitReportList = () => {
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
  } = useGetBillProfitReportInformation(from || "", to || "");
  useEffect(() => {
    refetch();
  }, [from, to, refetch]);

  const {
    data: searchReportData,
    isLoading: searchLoading,
    refetch: searchRefetch,
  } = useGetBillProfitReportInformationSearch(search || "");
  useEffect(() => {
    searchRefetch();
  }, [searchRefetch, search]);
  let loading = isLoading || searchLoading;

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
      <Pagination<Sell[]>
        queryFn={() =>
          useGetBillProfitReport(
            searchParam.get(ENUMs.FROM_PARAM as string) || "",
            searchParam.get(ENUMs.TO_PARAM as string) || ""
          )
        }
        searchQueryFn={() =>
          useGetBillProfitReportSearch(
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
          searchLoading,
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

          console.log(allData);
          if (isLoading || searchLoading) {
            return (
              <Loading>
                <TailSpin />
              </Loading>
            );
          }
          return (
            <>
              <div className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll">
                <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                  <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                    <Tr>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-1">#</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">ژمارەی وەصڵ</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">بەروار</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">کۆی گشتی</p>
                      </Th>{" "}
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">داشکاندن</p>
                      </Th>{" "}
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">
                          نرخ دوای داشکان
                        </p>
                      </Th>{" "}
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">
                          کۆی قازانجی پسوڵە
                        </p>
                      </Th>{" "}
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">داغڵکار</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">چاککار</p>
                      </Th>
                    </Tr>
                  </THead>
                  <TBody className="w-full ">
                    <>
                      {allData?.map((val: Sell, index: number) => (
                        <SellProfitCard key={val.id} index={index} {...val} />
                      ))}
                      {!isFetchingNextPage && hasNextPage && !isSearched && (
                        <div className="h-[20px]" ref={ref}></div>
                      )}
                    </>
                  </TBody>
                </Table>
              </div>
              {!loading && reportData && searchReportData && (
                <div className="w-full flex flex-col justify-center items-center z-[100]  table-dark-light   default-border p-2 gap-5">
                  <div className="w-full flex flex-row justify-evenly items-center">
                    <p>
                      کۆی پسولە :{" "}
                      {!isSearched
                        ? reportData?.sell_count
                        : searchReportData?.sell_count}
                    </p>

                    <p>
                      کۆی گشتی پسولە :{" "}
                      {!isSearched
                        ? formatMoney(reportData?.total_sell_price)
                        : formatMoney(searchReportData?.total_sell_price)}
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-evenly items-center">
                    <p>
                      کۆی داشکاندنی پسولە :{" "}
                      {!isSearched
                        ? formatMoney(reportData?.total_sell_discount)
                        : formatMoney(searchReportData?.total_sell_discount)}
                    </p>

                    <p>
                      کۆی دوای داشکان :{" "}
                      {!isSearched
                        ? formatMoney(
                            reportData?.total_sell_price -
                              reportData?.total_sell_discount
                          )
                        : formatMoney(
                            searchReportData?.total_sell_price -
                              searchReportData?.total_sell_discount
                          )}
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-evenly items-center">
                    <p>
                      کۆی قازانجی پسوڵە :{" "}
                      {!isSearched
                        ? formatMoney(reportData?.total_profit)
                        : formatMoney(searchReportData?.total_profit)}
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-evenly items-center">
                    ژمارەی داتا {allData.length}
                  </div>
                </div>
              )}
            </>
          );
        }}
      </Pagination>
      {print && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={1500}
          height={`90%`}
          maxHeight={1000}
          isOpen={print}
          onClose={() => setPrint(false)}
        >
          <PrintModal
            printFn={() =>
              useBillProfitPrint(search || "", from || "", to || "")
            }
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

export default BillProfitReportList;
