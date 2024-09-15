import PsulaItemCard from "@/components/cards/PsulaItemCard";
import SellItemCard from "@/components/cards/SellItemCard";
import Pagination from "@/components/providers/Pagination";
import DatePicker from "@/components/shared/DatePicker";
import Dialog from "@/components/shared/Dialog";
import Filter from "@/components/shared/Filter";
import Search from "@/components/shared/Search";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import Container from "@/components/ui/Container";
import DeleteModal from "@/components/ui/DeleteModal";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";
import Loading from "@/components/ui/Loading";
import TBody from "@/components/ui/TBody";
import TFoot from "@/components/ui/TFoot";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { ENUMs } from "@/lib/enum";
import { useGetItemTypesSelection } from "@/lib/react-query/query/item-type.query";
import {
  useGetItems,
  useSearchItems,
} from "@/lib/react-query/query/item.query";
import {
  useAddItemToSell,
  useAddSell,
  useDeleteSell,
  useGetSellItems,
} from "@/lib/react-query/query/sell.query";
import { Id } from "@/types/global";
import { ItemType } from "@/types/item-type";
import { Item, ItemCard, ItemInformation } from "@/types/items";
import { SellItem } from "@/types/sell";
import { Button } from "@mui/joy";
import { CirclePlus, Printer, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";

const CreatePsula = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  let sell_id_param = searchParam.get(ENUMs.SELL_PARAM as string);
  const { mutateAsync: addItem, isPending: addItemPending } = useAddItemToSell(
    Number(sell_id_param)
  );
  const { mutateAsync: create, isPending: createPending } = useAddSell();
  const { mutateAsync: deleteSell, isPending: deletePending } = useDeleteSell();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const {
    data: sellItems,
    isLoading: sellItemsLoading,
    refetch,
  } = useGetSellItems(Number(sell_id_param));

  const { data: types } = useGetItemTypesSelection();
  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  useEffect(() => {
    if (!sell_id_param || sell_id_param == "") {
      create();
      refetch();
    }
  }, [sell_id_param]);

  const onClick = (item_id: Id) => addItem({ item_id });
  return (
    <>
      <Container
        as={`div`}
        className="w-full grid grid-cols-3 gap-5 min-h-[700px]">
        {createPending ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : (
          <>
            <div className="col-span-full 2xl:col-span-1 flex flex-col justify-start items-start gap-5 border-t-2 lg:border-t-0 lg:border-l-2 border-solid border-gray-500 px-0 lg:px-5">
              <div className="w-full gap-5 flex flex-row justify-start items-center flex-wrap">
                <Search />
                {types && (
                  <Filter
                    options={types.map((val: ItemType, _index: number) => {
                      return { value: val.id, label: val.name };
                    })}
                  />
                )}
              </div>

              <DatePicker />
              <Pagination<Item[]>
                queryFn={() =>
                  useGetItems(
                    searchParam.get(ENUMs.FILTER_PARAM as string) || "",
                    searchParam.get(ENUMs.FROM_PARAM as string) || "",
                    searchParam.get(ENUMs.TO_PARAM as string) || ""
                  )
                }
                searchQueryFn={() =>
                  useSearchItems(
                    searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                  )
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
                    <>
                      {isLoading ? (
                        <Loading>
                          <TailSpin />
                        </Loading>
                      ) : (
                        <div className="tableDiv w-full flex flex-row justify-start items-start gap-5 flex-wrap h-full content-start overflow-y-scroll max-h-[700px] hide-scroll">
                          {allData.length > 0 &&
                            allData.map(
                              (
                                val: ItemCard & ItemInformation,
                                _index: number
                              ) => (
                                <article
                                  key={val.id}
                                  className={`w-[150px] h-[150px] rounded-xl default-border cursor-pointer ${
                                    sellItems?.findIndex(
                                      (one: SellItem, _index: number) =>
                                        one.item_id == val.id
                                    ) != -1 && "!border-yellow-500"
                                  }`}>
                                  <PsulaItemCard
                                    onClick={onClick}
                                    key={val.id}
                                    {...val}
                                  />
                                </article>
                              )
                            )}

                          {!isFetchingNextPage && hasNextPage && (
                            <div
                              title="test"
                              className="block w-full"
                              ref={ref}>
                              <Loading>
                                <TailSpin />
                              </Loading>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                }}
              </Pagination>
            </div>
            <div className="col-span-full 2xl:col-span-2 grid grid-rows-8 grid-cols-1   px-0 lg:px-5">
              <div className="row-span-7 w-full max-w-full overflow-x-auto   max-h-[700px]">
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
                                  payload: sellItems?.map(
                                    (val: SellItem, _index: number) => val.id
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
                        <p className="pr-3 table-head-border">ناوی کاڵا</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">دانە</p>
                      </Th>{" "}
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">نرخ</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">کۆ</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">کردارەکان</p>
                      </Th>
                    </Tr>
                  </THead>
                  <TBody className="w-full">
                    {sellItems?.map((val: SellItem, _index: number) => (
                      <SellItemCard key={val.id} {...val} />
                    ))}
                  </TBody>
                  <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
                    <Tr>
                      <Td className="text-center" colSpan={7}>
                        کۆی گشتی :
                      </Td>
                    </Tr>
                  </TFoot>
                </Table>
              </div>{" "}
              <div className="row-span-1 w-full flex flex-row justify-center items-start gap-5">
                <Button
                  onClick={() => setIsDelete(true)}
                  className="flex flex-row justify-center items-center gap-2"
                  variant="soft"
                  color="danger">
                  <p className="!font-bukra text-right font-light  text-xs">
                    سڕینەوەی پسولە
                  </p>
                  <Trash2 className="w-7 h-7 p-1 cursor-pointer" />
                </Button>
                <Button
                  onClick={() => create()}
                  className="flex flex-row justify-center items-center gap-2"
                  variant="soft"
                  color="success">
                  <p className="!font-bukra text-right font-light  text-xs">
                    پسولەی نوێ
                  </p>
                  <CirclePlus className="w-7 h-7 p-1 cursor-pointer" />
                </Button>
                <Button
                  className="flex flex-row justify-center items-center gap-2"
                  variant="soft"
                  color="primary">
                  <p className="!font-bukra text-right font-light  text-xs">
                    چاپکردن
                  </p>
                  <Printer className="w-7 h-7 p-1 cursor-pointer" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>
      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}>
          <DeleteModal
            deleteFunction={() => deleteSell([Number(sell_id_param)])}
            loading={deletePending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
    </>
  );
};

export default CreatePsula;
