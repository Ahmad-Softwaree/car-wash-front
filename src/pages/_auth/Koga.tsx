import Container from "@/components/ui/Container";
import { lazy, useMemo, useState } from "react";
import { CircleFadingPlus, Search, Trash2, X } from "lucide-react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));

import Pagination from "@/components/providers/Pagination";
import TBody from "@/components/ui/TBody";
import { Table, Td, Th, THead, Tr } from "@/components/ui";

import Input from "@/components/ui/Input";
import { InputAddon, InputGroup } from "@chakra-ui/react";

import { CONTEXT_TYPEs } from "@/context/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import Tooltip from "@mui/joy/Tooltip";
import Chip from "@mui/joy/Chip";
import DeleteModal from "@/components/ui/DeleteModal";
import {
  useDeleteItem,
  useGetItems,
  useSearchItems,
} from "@/lib/react-query/query/item.query";
import { Item } from "@/types/items";
import ItemCard from "@/components/cards/ItemCard";
import ItemForm from "@/components/forms/ItemForm";
import TFoot from "@/components/ui/TFoot";
import CustomClose from "@/components/shared/CustomClose";

const Koga = () => {
  const { mutateAsync, isPending } = useDeleteItem();

  const [searchParam, setSearchParam] = useSearchParams();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start">
        <div className="w-full gap-5 flex flex-row justify-between">
          <InputGroup className="text-input max-w-[400px] text-primary-800 dark:text-white">
            {" "}
            <Input
              onChange={(e) =>
                setSearchParam((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set(ENUMs.SEARCH_PARAM as string, e.target.value);
                  return params;
                })
              }
              value={searchParam.get(ENUMs.SEARCH_PARAM as string) || ""}
              placeholder="گەڕان بەپێی (ئایدی،بارکۆد، ناوی بەرهەم)"
              className="w-[85%] text-xs"
              type="input"
            />
            <InputAddon className="w-[15%]">
              <Search />
            </InputAddon>
          </InputGroup>
          {checked?.length > 0 && (
            <div className="flex flex-row justify-center items-center gap-2 dark-light">
              <Tooltip
                placement="top"
                title="سڕینەوە"
                color="danger"
                variant="soft">
                <Chip
                  onClick={() => setIsDelete(true)}
                  variant="soft"
                  color="danger">
                  <Trash2 className="w-7 h-7 p-1 cursor-pointer" />
                </Chip>
              </Tooltip>
              <p dir="ltr">
                {checked.length} / {ENUMs.CHECK_LIMIT}
              </p>
            </div>
          )}
          <button
            title="newUser"
            type="button"
            onClick={() => setIsAddOpen(true)}
            name="newUser"
            className="flex flex-row justify-center items-center gap-2 p-2 px-4 text-sm bg-sky-500 text-white rounded-sm">
            <CircleFadingPlus />
            <p>زیادکردن</p>
          </button>
        </div>
        <Pagination<Item[]>
          queryFn={() => useGetItems()}
          searchQueryFn={() =>
            useSearchItems(searchParam.get(ENUMs.SEARCH_PARAM as string) || "")
          }>
          {({
            isFetchingNextPage,
            hasNextPage,
            isLoading,
            ref,
            data,
            refetch,
            isSearched,
            searchData,
            searchRefetch,
            fetchNextPage,
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

            return (
              <div className="w-full max-w-full overflow-x-auto max-h-screen hide-scroll">
                <Table className="relative  w-full table-dark-light  default-border">
                  <THead className="sticky -top-1 z-[100]  table-dark-light w-full  default-border">
                    <Tr>
                      <Th className="text-right text-sm !p-4 !min-w-[100px]">
                        <InputGroup className="checkbox-input">
                          <Input
                            onClick={() => {
                              if (checked.length == 0) {
                                dispatch({
                                  type: CONTEXT_TYPEs.CHECK,
                                  payload: allData
                                    .slice(0, ENUMs.CHECK_LIMIT as number)
                                    .map((val: Item, _index: number) => val.id),
                                });
                              } else {
                                dispatch({
                                  type: CONTEXT_TYPEs.CHECK,
                                  payload: [],
                                });
                              }
                            }}
                            checked={check_type == "all"}
                            type="checkbox"
                            className="cursor-pointer"
                          />
                        </InputGroup>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-1">#</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">ناو</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">بارکۆد</p>
                      </Th>{" "}
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">جۆر</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">عەدەد</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">نرخی فرۆشتن</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">نرخی تێچوو</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">کردارەکان</p>
                      </Th>
                    </Tr>
                  </THead>
                  <TBody className="w-full">
                    <>
                      {allData?.map((val: Item, index: number) => (
                        <ItemCard key={val.id} index={index} {...val} />
                      ))}

                      {!isFetchingNextPage && hasNextPage && !isSearched && (
                        <div className="h-[20px]" ref={ref}></div>
                      )}
                    </>
                  </TBody>
                  <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
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
      </Container>
      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}>
          <DeleteModal
            deleteFunction={() => mutateAsync(checked)}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
      {isAddOpen && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={1500}
          maxHeight={`90%`}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}>
          <CustomClose onClick={() => setIsAddOpen(false)} />

          <ItemForm state="insert" onClose={() => setIsAddOpen(false)} />
        </Dialog>
      )}
    </>
  );
};

export default Koga;
