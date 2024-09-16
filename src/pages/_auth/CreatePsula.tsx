import PsulaItemCard from "@/components/cards/PsulaItemCard";
import SellItemCard from "@/components/cards/SellItemCard";
import Pagination from "@/components/providers/Pagination";
import DatePicker from "@/components/shared/DatePicker";
import DeleteChip from "@/components/shared/DeleteChip";
import Dialog from "@/components/shared/Dialog";
import Filter from "@/components/shared/Filter";
import Search from "@/components/shared/Search";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import Container from "@/components/ui/Container";
import DeleteModal from "@/components/ui/DeleteModal";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";
import Label from "@/components/ui/Label";
import Loading from "@/components/ui/Loading";
import MyButton from "@/components/ui/MyButton";
import PrintModal from "@/components/ui/PrintModal";
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
  useDeleteItemInSell,
  useDeleteSell,
  useGetSell,
  useGetSellItems,
  useUpdateSell,
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
  const [discount, setDiscount] = useState<number>(0);
  const [searchParam, setSearchParam] = useSearchParams();
  let sell_id_param = searchParam.get(ENUMs.SELL_PARAM as string);
  const { mutateAsync: addItem, isPending: addItemPending } = useAddItemToSell(
    Number(sell_id_param)
  );

  const { data: sell, isLoading: sellLoading } = useGetSell(
    Number(sell_id_param)
  );

  const { mutateAsync: update, isPending: updatePending } = useUpdateSell(
    Number(sell_id_param)
  );

  const { mutateAsync: create, isPending: createPending } = useAddSell();
  const { mutateAsync: deleteSell, isPending: deletePending } = useDeleteSell();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isPrint, setIsPrint] = useState<boolean>(false);

  const [isItemDelete, setIsItemDelete] = useState<boolean>(false);

  const { mutateAsync: deleteItemInSell, isPending: deleteItemInSellPending } =
    useDeleteItemInSell(Number(sell_id_param));

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
    if (!sell_id_param || sell_id_param === "") {
      console.log("here");

      setSearchParam((prev) => {
        const params = new URLSearchParams(prev);
        params.set(ENUMs.SELL_PARAM as string, "0");
        return params;
      });

      // Force a re-render to ensure the URL param is updated
      window.location.search = `?${ENUMs.SELL_PARAM}=0`;
    }
  }, [sell_id_param, setSearchParam]);

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
                                  className={`w-[150px] h-[270px] rounded-xl default-border cursor-pointer ${
                                    sellItems?.findIndex(
                                      (one: SellItem, _index: number) =>
                                        one.item_id == val.id
                                    ) != -1 &&
                                    sell_id_param != "0" &&
                                    sell_id_param &&
                                    "!border-yellow-500"
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
            <div className="col-span-full 2xl:col-span-2   px-0 lg:px-5 flex flex-col justify-start items-start gap-5">
              {" "}
              {checked?.length > 0 && (
                <div className=" flex flex-row justify-end items-center gap-3">
                  <div className="flex flex-row justify-center items-center gap-2 dark-light">
                    <DeleteChip onClick={() => setIsItemDelete(true)} />

                    <p dir="ltr">
                      {checked.length} / {ENUMs.CHECK_LIMIT}
                    </p>
                  </div>
                </div>
              )}
              <div className="grid grid-rows-8 grid-cols-1 gap-5 place-items-start ">
                <div className="row-span-6 w-full max-w-full overflow-x-auto h-[600px] default-border hide-scroll">
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
                                      (val: SellItem, _index: number) =>
                                        val.item_id
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
                        <SellItemCard index={_index} key={val.id} {...val} />
                      ))}
                    </TBody>
                    <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
                      {sellItems && sellItems?.length > 0 && sell && (
                        <Tr>
                          <Td className="text-center" colSpan={4}>
                            کۆی گشتی :{" "}
                            {(
                              sellItems?.reduce(
                                (accumulator: number, val: SellItem) => {
                                  return (
                                    accumulator +
                                    Number(val.item_sell_price) * val.quantity
                                  );
                                },
                                0
                              ) *
                              (1 - Number(sell?.discount) / 100)
                            ).toFixed(0)}
                          </Td>
                          <Td className="text-center" colSpan={3}>
                            داشکاندن : {sell?.discount}
                          </Td>
                        </Tr>
                      )}
                    </TFoot>
                  </Table>
                </div>{" "}
                <div className="row-span-2 w-full flex flex-col justify-center items-center gap-5 default-border p-5">
                  <div className=" w-full flex flex-row justify-center items-end gap-5">
                    <div className="w-[200px] flex flex-col gap-2">
                      <Label
                        htmlFor="discount"
                        className="w-full text-sm  flex flex-row gap-2">
                        <p>داشکاندن</p>
                      </Label>{" "}
                      <div className="w-full flex flex-row justify-start items-center gap-2">
                        <InputGroup className="w-full space-y-2  text-input col-span-full md:col-span-1">
                          <Input
                            onChange={(e) =>
                              setDiscount(Number(e.target.value))
                            }
                            id="discount"
                            type="number"
                            max={`100`}
                            min={`0`}
                            name="discount"
                            placeholder="داشکاندن"
                            className="w-full text-sm"
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <MyButton
                      onClick={() => update({ discount })}
                      disabled={updatePending}
                      name="addDiscountButton"
                      type="submit"
                      className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
                      <p className="font-light text-sm font-bukra">
                        جێبەجێکردن
                      </p>
                    </MyButton>
                  </div>
                  <div className=" w-full flex flex-row justify-center items-start gap-5">
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
                      onClick={() => setIsPrint(true)}
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
      {isPrint && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isPrint}
          onClose={() => setIsPrint(false)}>
          <PrintModal onClose={() => setIsPrint(false)} />
        </Dialog>
      )}
      {isItemDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isItemDelete}
          onClose={() => setIsItemDelete(false)}>
          <DeleteModal
            deleteFunction={() => deleteItemInSell(checked)}
            loading={deleteItemInSellPending}
            onClose={() => setIsItemDelete(false)}
          />
        </Dialog>
      )}
    </>
  );
};

export default CreatePsula;
