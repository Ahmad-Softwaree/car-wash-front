import PsulaItemCard from "@/components/cards/PsulaItemCard";
import SellItemCard from "@/components/cards/SellItemCard";
import Pagination from "@/components/providers/Pagination";
import CustomClose from "@/components/shared/CustomClose";
import DeleteChip from "@/components/shared/DeleteChip";
import Dialog from "@/components/shared/Dialog";
import FilterModal from "@/components/shared/FilterModal";
import { formatMoney } from "@/components/shared/FormatMoney";
import Search from "@/components/shared/Search";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import CalculatorModal from "@/components/ui/Calculator";
import Container from "@/components/ui/Container";
import DeleteModal from "@/components/ui/DeleteModal";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";
import Loading from "@/components/ui/Loading";
import MyButton from "@/components/ui/MyButton";
import PrintModal from "@/components/ui/PrintModal";
import TBody from "@/components/ui/TBody";
import TFoot from "@/components/ui/TFoot";
import { useToast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { ENUMs } from "@/lib/enum";
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
  useGetSellPrint,
  useUpdateSell,
} from "@/lib/react-query/query/sell.query";
import { Id } from "@/types/global";
import { Item, ItemCard, ItemInformation } from "@/types/items";
import { SellItem } from "@/types/sell";
import { Badge, Button } from "@mui/joy";
import { Calculator, CirclePlus, Filter, Printer, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";

const CreatePsula = () => {
  const { toast } = useToast();
  const [calculate, setCalculate] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [discountMoney, setDiscountMoney] = useState<number>(0);
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
  const { data: sellItems, isLoading: sellItemsLoading } = useGetSellItems(
    Number(sell_id_param)
  );
  const [filter, setFilter] = useState<boolean>(false);

  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  useEffect(() => {
    if (!sell_id_param || sell_id_param === "") {
      setSearchParam((prev) => {
        const params = new URLSearchParams(prev);
        params.set(ENUMs.SELL_PARAM as string, "0");
        return params;
      });

      // Force a re-render to ensure the URL param is updated
      window.location.search = `?${ENUMs.SELL_PARAM}=0`;
    }
  }, [sell_id_param, setSearchParam]);

  useEffect(() => {
    let barcodeBuffer = "";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // Call your addItem function here with the scanned barcode
        addItem({ item_id: Number(barcodeBuffer), barcode: true });

        // Clear the buffer after processing
        barcodeBuffer = "";
      } else {
        // Append the key to the buffer if it's a number
        if (!isNaN(Number(e.key))) {
          barcodeBuffer += e.key;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onClick = (item_id: Id) => addItem({ item_id, barcode: false });

  let sellTotal = formatMoney(
    sellItems?.reduce((accumulator: number, val: SellItem) => {
      return accumulator + Number(val.item_sell_price) * val.quantity;
    }, 0)
  );
  let sellTotalAfterDiscount = formatMoney(
    (
      sellItems?.reduce((accumulator: number, val: SellItem) => {
        return accumulator + Number(val.item_sell_price) * val.quantity;
      }, 0) - sell?.discount
    ).toFixed(0)
  );

  let totalItems = formatMoney(
    sellItems?.reduce((accumulator: number, val: SellItem) => {
      if (val.quantity != 0) {
        return accumulator + Number(val.quantity);
      } else {
        return 0;
      }
    }, 0) || (0).toFixed(0)
  );

  let discountPercent = (
    (sell?.discount /
      sellItems?.reduce((accumulator: number, val: SellItem) => {
        return accumulator + Number(val.item_sell_price) * val.quantity;
      }, 0)) *
    100
  ).toFixed(0);

  let discountMoneyCalculation: string = formatMoney(
    (
      sellItems?.reduce((accumulator: number, val: SellItem) => {
        return accumulator + Number(val.item_sell_price) * val.quantity;
      }, 0) - sell?.discount
    ).toFixed(0)
  );

  return (
    <>
      <Container
        as={`div`}
        className="w-full grid grid-cols-1 xl:grid-cols-5  gap-5 min-h-[700px]"
      >
        {createPending ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : (
          <>
            <div className="col-span-full  2xl:col-span-2 flex flex-col justify-start items-start gap-5 border-b-2 lg:border-t-0 lg:border-l-2 border-solid border-gray-500 px-0 pl-2">
              <div className="w-full gap-5 flex flex-row justify-start items-center flex-wrap">
                <Search placeholder="گەڕان بەپێێ ناو/بارکۆد" />

                <Badge
                  invisible={!searchParam.get(ENUMs.FILTER_PARAM as string)}
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
                {searchParam.get(ENUMs.FILTER_PARAM as string) && (
                  <Button
                    onClick={() => {
                      setSearchParam((prev) => {
                        const params = new URLSearchParams(prev);
                        params.delete(ENUMs.FILTER_PARAM as string);
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
                }
              >
                {({
                  isFetchingNextPage,
                  hasNextPage,
                  isLoading,
                  ref,
                  data,
                  isSearched,
                  searchData,
                  searchLoading,
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
                  if (isLoading || searchLoading) {
                    return (
                      <Loading>
                        <TailSpin />
                      </Loading>
                    );
                  }
                  return (
                    <div className="tableDiv w-full flex flex-row justify-start items-start gap-5 flex-wrap h-full content-start overflow-y-scroll max-h-[700px] hide-scroll">
                      {allData.length > 0 &&
                        allData.map(
                          (val: ItemCard & ItemInformation, _index: number) => (
                            <article
                              key={val.id}
                              className={`w-[150px] h-[270px] rounded-xl default-border cursor-pointer ${
                                sellItems?.findIndex(
                                  (one: SellItem, _index: number) =>
                                    one.item_id == val.id
                                ) != -1 &&
                                !sellItemsLoading &&
                                sell_id_param != "0" &&
                                sell_id_param &&
                                "!border-yellow-500"
                              }`}
                            >
                              <PsulaItemCard
                                onClick={onClick}
                                key={val.id}
                                {...val}
                              />
                            </article>
                          )
                        )}

                      {!isFetchingNextPage && hasNextPage && (
                        <div title="test" className="block w-full" ref={ref}>
                          <Loading>
                            <TailSpin />
                          </Loading>
                        </div>
                      )}
                    </div>
                  );
                }}
              </Pagination>
            </div>
            <div className="col-span-full 2xl:col-span-3   px-0  flex flex-col justify-start items-start gap-5">
              {" "}
              {checked?.length > 0 && (
                <div className="w-full flex flex-row justify-end items-center gap-3">
                  <div className="flex flex-row justify-center items-center gap-2 dark-light">
                    <DeleteChip onClick={() => setIsItemDelete(true)} />

                    <p dir="ltr">
                      {checked.length} / {ENUMs.CHECK_LIMIT}
                    </p>
                  </div>
                </div>
              )}
              <div className="w-full grid grid-rows-6 grid-cols-1 gap-0 place-items-start ">
                <div className="row-span-3 w-full max-w-full overflow-x-auto max-h-[500px] default-border hide-scroll">
                  <Table className="relative  w-full table-dark-light  default-border">
                    <THead className="sticky -top-1 z-[100]  table-dark-light w-full  default-border">
                      <Tr>
                        <Th className="text-right text-sm !p-4">
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
                          <p className="pr-3 table-head-border">داغڵکار</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">چاککار</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">کردارەکان</p>
                        </Th>
                      </Tr>
                    </THead>
                    <TBody className="w-full">
                      {sellItems?.map((val: SellItem, _index: number) => (
                        <SellItemCard
                          state="insert"
                          index={_index}
                          key={val.id}
                          {...val}
                        />
                      ))}
                    </TBody>
                  </Table>
                </div>
                <div className="flex flex-row justify-between items-center gap-10  table-dark-light w-full  default-border p-4">
                  {sellItems && sellItems?.length > 0 && sell && (
                    <>
                      <p className="text-center text-xs">
                        کۆی مەواد : {totalItems}
                      </p>
                      <p className="text-center text-xs">
                        کۆی گشتی : {sellTotal} IQD
                      </p>
                      <p className="text-center text-xs">
                        داشکاندن : {formatMoney(sell?.discount)} IQD
                      </p>
                      <p className="text-center text-xs">
                        کۆی گشتی دوای داشکان : {sellTotalAfterDiscount} IQD
                      </p>
                    </>
                  )}
                </div>
                <div className="row-span-3 w-full grid grid-cols-1 grid-rows-3 default-border h-[250px]">
                  <div className=" w-full grid grid-cols-3 col-span-full row-span-2">
                    <div className="flex flex-col gap-2 col-span-1 row-span-full h-full my-2 justify-center items-center">
                      <p className="text-sm text-center w-full">
                        کۆی گشتی : {sellTotal}
                      </p>
                      <p className="text-sm text-center w-full">
                        داشکان بە ڕێژە : {discountPercent} %
                      </p>{" "}
                      <p className="text-sm text-center w-full">
                        داشکان بەپارە : {formatMoney(sell?.discount)}
                      </p>
                      <p className="text-sm text-center w-full">
                        کۆی گشتی دوای داشکان : {sellTotalAfterDiscount}
                      </p>
                    </div>
                    <div className="flex flex-col  col-span-1 row-span-full h-full">
                      <Input
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        value={discount}
                        id="discount"
                        type="number"
                        max={`100`}
                        min={`0`}
                        name="discount"
                        placeholder="داشکاندن بە ڕێژەی سەدی"
                        className="w-full text-md h-1/2"
                      />

                      <MyButton
                        onClick={async () => {
                          if (sell_id_param == "0") {
                            throw toast({
                              alertType: "error",
                              title: "هەڵە",
                              description: "سەرەتا وەصڵ دروسکە",
                            });
                          }
                          try {
                            await update({
                              discount: Number(
                                (
                                  sellItems?.reduce(
                                    (accumulator: number, val: SellItem) => {
                                      return (
                                        accumulator +
                                        Number(val.item_sell_price) *
                                          val.quantity
                                      );
                                    },
                                    0
                                  ) * Number(discount / 100)
                                ).toFixed(0)
                              ),
                            });
                          } catch (error) {
                          } finally {
                            setDiscount(0);
                            setDiscountMoney(0);
                          }
                        }}
                        disabled={updatePending}
                        name="addDiscountButton"
                        type="submit"
                        className=" bg-sky-600 h-1/2  p-2 px-4 text-white flex flex-row justify-center items-center gap-2 col-span-1 bg-opacity-60 hover:bg-opacity-100 transition-all duration-200"
                      >
                        <p className="font-light text-md font-bukra">
                          جێبەجێکردن
                        </p>
                      </MyButton>
                    </div>
                    <div className="flex flex-col  col-span-1 row-span-full h-full">
                      <Input
                        onChange={(e) =>
                          setDiscountMoney(Number(e.target.value))
                        }
                        value={discountMoney}
                        id="discountMoney"
                        type="text"
                        min={`0`}
                        name="discountMoney"
                        placeholder="داشکاندن بە پارە"
                        className="w-full text-md h-1/2"
                      />

                      <MyButton
                        onClick={async () => {
                          if (sell_id_param == "0") {
                            throw toast({
                              alertType: "error",
                              title: "هەڵە",
                              description: "سەرەتا وەصڵ دروسکە",
                            });
                          }
                          try {
                            await update({
                              discount: discountMoney,
                            });
                          } catch (error) {
                          } finally {
                            setDiscount(0);
                            setDiscountMoney(0);
                          }
                        }}
                        disabled={updatePending}
                        name="addDiscountButton"
                        type="submit"
                        className=" bg-sky-600 h-1/2  p-2 px-4 text-white flex flex-row justify-center items-center gap-2 col-span-1 bg-opacity-60 hover:bg-opacity-100 transition-all duration-200"
                      >
                        <p className="font-light text-md font-bukra">
                          جێبەجێکردن
                        </p>
                      </MyButton>
                    </div>
                  </div>
                  <div className="w-full grid  grid-cols-4 col-span-full row-span-1">
                    <Button
                      onClick={() => setIsDelete(true)}
                      className="flex flex-row justify-center items-center gap-2 col-span-1 !rounded-none row-span-1"
                      variant="soft"
                      color="danger"
                    >
                      <p className="!font-bukra text-right font-light  text-md">
                        سڕینەوەی پسولە
                      </p>
                      <Trash2 className="w-7 h-7 p-1 cursor-pointer" />
                    </Button>
                    <Button
                      onClick={() => create()}
                      className="flex flex-row justify-center items-center gap-2 col-span-1 !rounded-none row-span-1"
                      variant="soft"
                      color="success"
                    >
                      <p className="!font-bukra text-right font-light  text-md">
                        پسولەی نوێ
                      </p>
                      <CirclePlus className="w-7 h-7 p-1 cursor-pointer" />
                    </Button>
                    <Button
                      onClick={() => setIsPrint(true)}
                      className="flex flex-row justify-center items-center gap-2 col-span-1 !rounded-none row-span-1"
                      variant="soft"
                      color="primary"
                    >
                      <p className="!font-bukra text-right font-light  text-md">
                        چاپکردن
                      </p>
                      <Printer className="w-7 h-7 p-1 cursor-pointer" />
                    </Button>
                    <Button
                      onClick={() => setCalculate(true)}
                      className="flex flex-row justify-center items-center gap-2 col-span-1 !rounded-none row-span-1"
                      variant="soft"
                      color="warning"
                    >
                      <p className="!font-bukra text-right font-light  text-md">
                        بژمێر
                      </p>
                      <Calculator className="w-7 h-7 p-1 cursor-pointer" />
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
          onClose={() => setIsDelete(false)}
        >
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
          onClose={() => setIsPrint(false)}
        >
          <PrintModal
            printFn={() => useGetSellPrint(Number(sell_id_param) || 0)}
            onClose={() => setIsPrint(false)}
          />
        </Dialog>
      )}
      {isItemDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isItemDelete}
          onClose={() => setIsItemDelete(false)}
        >
          <DeleteModal
            deleteFunction={() => deleteItemInSell(checked)}
            loading={deleteItemInSellPending}
            onClose={() => setIsItemDelete(false)}
          />
        </Dialog>
      )}
      {calculate && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={calculate}
          onClose={() => setCalculate(false)}
        >
          <CustomClose onClick={() => setCalculate(false)} />
          <CalculatorModal
            money={Number(
              (
                sellItems?.reduce((accumulator: number, val: SellItem) => {
                  return (
                    accumulator + Number(val.item_sell_price) * val.quantity
                  );
                }, 0) || 0 * (1 - Number(sell?.discount) / 100)
              ).toFixed(0)
            )}
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
          <FilterModal onClose={() => setFilter(false)} type="item" />
        </Dialog>
      )}
    </>
  );
};

export default CreatePsula;
