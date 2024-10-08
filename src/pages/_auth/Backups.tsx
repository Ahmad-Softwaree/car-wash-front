import Container from "@/components/ui/Container";
import { useEffect, useMemo, useState } from "react";

import Pagination from "@/components/providers/Pagination";
import TBody from "@/components/ui/TBody";
import { Table, Td, Th, THead, Tr } from "@/components/ui";

import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

import TFoot from "@/components/ui/TFoot";
import {
  useBackupEntity,
  useGetBackups,
} from "@/lib/react-query/query/backup.query";
import BackupCard from "@/components/cards/BackupCard";
import { Backup } from "@/types/backup";
import { downloadFile } from "@/lib/functions";
import { Badge, Button } from "@mui/joy";
import { Filter } from "lucide-react";
import Dialog from "@/components/shared/Dialog";
import CustomClose from "@/components/shared/CustomClose";
import FilterModal from "@/components/shared/FilterModal";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";

const Backups = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [entityName, setEntityName] = useState<string>("");
  const { data, isFetching, refetch } = useBackupEntity(entityName || "");
  const [filter, setFilter] = useState<boolean>(false);

  useEffect(() => {
    if (data && entityName != "") {
      downloadFile(data, `${entityName}_backup.json`);
      setEntityName("");
    }
  }, [data]);

  useEffect(() => {
    if (entityName && entityName != "") {
      refetch();
    }
  }, [entityName]);
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start"
      >
        <div className="w-full gap-5 flex flex-row justify-start ">
          <Badge
            invisible={
              !searchParam.get(ENUMs.FROM_PARAM as string) &&
              !searchParam.get(ENUMs.TO_PARAM as string) &&
              !searchParam.get(ENUMs.TABLE_NAME_PARAM as string)
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
          {(searchParam.get(ENUMs.FROM_PARAM as string) &&
            searchParam.get(ENUMs.TO_PARAM as string)) ||
          searchParam.get(ENUMs.TABLE_NAME_PARAM as string) ? (
            <Button
              onClick={() => {
                setSearchParam((prev) => {
                  const params = new URLSearchParams(prev);
                  params.delete(ENUMs.FROM_PARAM as string);
                  params.delete(ENUMs.TO_PARAM as string);
                  params.delete(ENUMs.TABLE_NAME_PARAM as string);
                  return params;
                });
              }}
              className="!font-bukra !text-xs text-nowrap "
              size="md"
              variant="soft"
              color="danger"
            >
              سڕینەوەی فلتەر
            </Button>
          ) : null}
        </div>
        <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap p-5 default-border dark-light rounded-xl">
          <button
            onClick={() => setEntityName("user")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="user"
            title="user"
            id="user"
          >
            باکئەپی بەکارهێنەران
          </button>
          <button
            onClick={() => setEntityName("customer")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="customer"
            title="customer"
            id="customer"
          >
            باکئەپی کڕیارەکان
          </button>
          <button
            onClick={() => setEntityName("reservation")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="reservation"
            title="reservation"
            id="reservation"
          >
            باکئەپی نۆرەکان
          </button>
          <button
            onClick={() => setEntityName("item")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="item"
            title="item"
            id="item"
          >
            باکئەپی کۆگا
          </button>
          <button
            onClick={() => setEntityName("sell")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="sell"
            title="sell"
            id="sell"
          >
            باکئەپی وەصڵەکان
          </button>
          <button
            onClick={() => setEntityName("sell_item")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="sell_item"
            title="sell_item"
            id="sell_item"
          >
            باکئەپی مەوادی وەصڵ
          </button>
          <button
            onClick={() => setEntityName("expense")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="expense"
            title="expense"
            id="expense"
          >
            باکئەپی خەرجی
          </button>
          <button
            onClick={() => setEntityName("role")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="role"
            title="role"
            id="role"
          >
            باکئەپی ڕۆڵەکان
          </button>
          <button
            onClick={() => setEntityName("color")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="color"
            title="color"
            id="color"
          >
            باکئەپی ڕەنگەکان
          </button>
          <button
            onClick={() => setEntityName("car_type")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="car_type"
            title="car_type"
            id="car_type"
          >
            باکئەپی جۆرەکانی ئۆتۆمبێل
          </button>
          <button
            onClick={() => setEntityName("car_model")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="car_model"
            title="car_model"
            id="car_model"
          >
            باکئەپی مۆدێلەکانی ئۆتۆمبێڵ
          </button>
          <button
            onClick={() => setEntityName("expense_type")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="expense_type"
            title="expense_type"
            id="expense_type"
          >
            باکئەپی جۆرەکانی خەرجی
          </button>
          <button
            onClick={() => setEntityName("item_type")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="item_type"
            title="item_type"
            id="item_type"
          >
            باکئەپی جۆرەکانی مەواد
          </button>
          <button
            onClick={() => setEntityName("service")}
            disabled={isFetching}
            className="p-2 px-4 rounded-md bg-sky-500 text-white text-sm opacity-70 transition-all duration-200 hover:opacity-100 disabled:!opacity-60 disabled:hover:!opacity-60 disabled:cursor-not-allowed"
            name="service"
            title="service"
            id="service"
          >
            باکئەپی خزمەتگوزاریەکان
          </button>
        </div>
        <Pagination<Backup[]>
          queryFn={() =>
            useGetBackups(
              searchParam.get(ENUMs.TABLE_NAME_PARAM as string) || "",
              searchParam.get(ENUMs.FROM_PARAM as string) || "",
              searchParam.get(ENUMs.TO_PARAM as string) || ""
            )
          }
        >
          {({ isFetchingNextPage, hasNextPage, ref, data, isLoading }) => {
            const allData = useMemo(
              () =>
                data?.pages && data?.pages?.length > 0
                  ? data.pages.map((page) => page.paginatedData).flat()
                  : [],
              [data]
            );
            if (isLoading) {
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
                          <p className="pr-3 table-head-border">ناوی تەیبڵ</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">بکەر</p>
                        </Th>{" "}
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">ڕۆلێ بکەرەکە</p>
                        </Th>{" "}
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">
                            بەرواری باکئەپ
                          </p>
                        </Th>
                      </Tr>
                    </THead>
                    <TBody className="w-full ">
                      {allData?.map((val: Backup, index: number) => (
                        <BackupCard key={val.id} index={index} {...val} />
                      ))}
                      {!isFetchingNextPage && hasNextPage && (
                        <div className="h-[20px]" ref={ref}></div>
                      )}
                    </TBody>
                  </Table>
                </div>
                <div className="w-full flex flex-row justify-center items-center z-[100]  table-dark-light   default-border p-2 ">
                  <p className="text-center">ژمارەی داتا {allData.length}</p>
                </div>
              </>
            );
          }}
        </Pagination>
      </Container>
      {filter && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={filter}
          onClose={() => setFilter(false)}
        >
          <CustomClose onClick={() => setFilter(false)} />
          <FilterModal onClose={() => setFilter(false)} type="backup" />
        </Dialog>
      )}
    </>
  );
};

export default Backups;
