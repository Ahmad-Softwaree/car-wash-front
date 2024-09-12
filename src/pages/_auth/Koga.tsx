import Container from "@/components/ui/Container";
import { lazy, useMemo, useState } from "react";
import { CircleFadingPlus, Search, Trash2, X } from "lucide-react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));

import Pagination from "@/components/providers/Pagination";
import TBody from "@/components/ui/TBody";
import { Table, Th, THead, Tr } from "@/components/ui";

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
              <div className="w-full max-w-full overflow-x-auto">
                <Table className="relative  w-full !bg-white dark:!bg-[#0e1214] !text-primary-800 dark:!text-white  border-2 border-solid border-primary-400 border-opacity-80">
                  <THead
                    className="sticky top-0   !bg-white dark:!bg-[#0e1214] z-10 w-full  border-2 border-solid border-primary-400 border-opacity-80"
                    color="gray">
                    <Tr>
                      <Th className="text-right text-sm !p-4 !min-w-[100px]">
                        <InputGroup className="checkbox-input">
                          <Input
                            onClick={() => {
                              if (checked.length == 0) {
                                dispatch({
                                  type: CONTEXT_TYPEs.CHECK,
                                  payload: allData.map(
                                    (val: Item, _index: number) => val.id
                                  ),
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
                        <p className="pr-3 border-r-2 border-solid border-primary-400 border-opacity-80">
                          ناو
                        </p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 border-r-2 border-solid border-primary-400 border-opacity-80">
                          بارکۆد
                        </p>
                      </Th>{" "}
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 border-r-2 border-solid border-primary-400 border-opacity-80">
                          جۆر
                        </p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 border-r-2 border-solid border-primary-400 border-opacity-80">
                          عەدەد
                        </p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 border-r-2 border-solid border-primary-400 border-opacity-80">
                          نرخی فرۆشتن
                        </p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 border-r-2 border-solid border-primary-400 border-opacity-80">
                          نرخی تێچوو
                        </p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 border-r-2 border-solid border-primary-400 border-opacity-80">
                          کردارەکان
                        </p>
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
          <X
            onClick={() => setIsAddOpen(false)}
            className="cursor-pointer p-1 w-8 h-8 border-2 border-solid border-primary-400 border-opacity-40 rounded-lg mb-2 transition-all duration-200 hover:bg-red-400"
          />
          <ItemForm state="insert" onClose={() => setIsAddOpen(false)} />
        </Dialog>
      )}
    </>
  );
};

export default Koga;
