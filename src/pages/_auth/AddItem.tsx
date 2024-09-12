import { lazy, useEffect, useMemo, useState } from "react";

import AddItemCard from "@/components/cards/AddItemCard";
import ItemForm from "@/components/forms/ItemForm";
const Dialog = lazy(() => import("@/components/shared/Dialog"));
import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";

import { CirclePlus, PencilLine, Trash2 } from "lucide-react";
import {
  useDeleteItem,
  useGetItemById,
  useGetItemsInAdd,
} from "@/lib/react-query/query/item.query";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";
import Image from "@/components/ui/Image";
import DeleteModal from "@/components/ui/DeleteModal";
import Pagination from "@/components/providers/Pagination";
import { GlobalFormProps, InfoTypeProps } from "@/types/global";
import { Item, ItemCard, ItemInformation } from "@/types/items";
import MyButton from "@/components/ui/MyButton";
import Typography from "@/components/shared/Typography";

const InfoLine = ({ title, body }: InfoTypeProps) => (
  <div className="w-full flex flex-row justify-between items-center gap-5">
    <Typography
      className="opacity-60 text-black-500 text-md font-bold w-1/2"
      text={title}>
      <p>{title}</p>
    </Typography>
    <Typography
      className="opacity-60 text-black-500 text-md font-bold w-1/2"
      text={body.toLocaleString()}>
      <p>{body}</p>
    </Typography>{" "}
  </div>
);

const AddItem = () => {
  const { dispatch } = useGlobalContext();
  const [active, setActive] = useState<ItemCard | null>(null);
  const { mutateAsync: deleteItem, isPending: deleteLoading } = useDeleteItem(
    active?.id || 0
  );

  const {
    data: item,
    isLoading: itemLoading,
    refetch,
  } = useGetItemById(active?.id || null);
  const [proInfo, setProInfo] = useState<ItemInformation | null>(null);
  const [state, setState] = useState<GlobalFormProps>({
    state: "insert",
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    dispatch({
      type: CONTEXT_TYPEs.SET_OLD_DATA,
      payload: null,
    });
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (active) refetch();
  }, [active]);

  useEffect(() => {
    if (item) {
      let { withoutBarcode, id, frosh, sold, image_name, image_url, ...rest } =
        item;
      setProInfo(rest);
    }
  }, [item]);

  return (
    <>
      <Pagination<Item[]> queryFn={() => useGetItemsInAdd()}>
        {({ isFetchingNextPage, data, hasNextPage, isLoading, ref }) => {
          const allData = useMemo(
            () =>
              data?.pages && data?.pages?.length > 0
                ? data.pages.map((page) => page.paginatedData).flat()
                : [],
            [data]
          );
          return (
            <Container
              as={`div`}
              className="w-full space-y-5 flex flex-col justify-end items-start">
              <Return>داغڵکردنی مواد</Return>
              <div className="grid-rows-auto w-full grid gird-cols-1 xl:grid-cols-5 gap-10 place-items-start xl:min-h-[600px] ">
                {isLoading ? (
                  <Loading>
                    <TailSpin />
                  </Loading>
                ) : (
                  <div className="col-span-full xl:col-span-3  flex flex-row justify-start items-start gap-5   flex-wrap h-full content-start overflow-x-auto px-4 xl:px-0 overflow-y-scroll max-h-[300px] md:max-h-[800px]">
                    <MyButton
                      name="addItem"
                      className="w-[120px] md:w-[150px] h-[140px] md:h-[196px] rounded-xl flex flex-col justify-center items-center gap-4 bg-blue-100 text-blue border-2 border-solid border-blue-500 bg-opacity-20 text-sm md:text-md"
                      onClick={() => {
                        setState({ state: "insert" });
                        openDialog();
                      }}>
                      <CirclePlus color="blue" />
                      <p className="text-md text-blue-500 font-bukra font-bold">
                        زیادکردنی مواد
                      </p>
                    </MyButton>
                    {allData.length > 0 &&
                      allData.map((val: ItemCard, _index: number) => (
                        <article
                          key={val.id}
                          className={`w-[120px] md:w-[150px] h-[140px] md:h-[196px] rounded-xl border-[3px] border-solid cursor-pointer ${
                            active?.id === val.id
                              ? "border-yellow-500"
                              : "border-white"
                          }`}>
                          <AddItemCard
                            onClick={() => setActive(val)}
                            {...val}
                          />
                        </article>
                      ))}

                    {!isFetchingNextPage && hasNextPage && (
                      <div title="test" className="block w-full" ref={ref}>
                        <Loading>
                          <TailSpin />
                        </Loading>
                      </div>
                    )}
                  </div>
                )}

                <div className="col-span-full xl:col-span-2 flex flex-col justify-between items-start gap-5 w-full border-t-2 xl:border-t-0 xl:border-r-2 border-solid border-gray-300 pt-3 xl:pr-3 h-full ">
                  {itemLoading ? (
                    <Loading>
                      <TailSpin />
                    </Loading>
                  ) : active && item && proInfo ? (
                    <>
                      <div className="flex flex-col xl:flex-row justify-between items-start gap-5 w-full">
                        <div className="w-full xl:w-2/3 flex flex-col justify-start items-start gap-5">
                          <p className="font-bold font-bukra text-lg">
                            بینینی وردەکاری
                          </p>
                          <InfoLine title="بارکۆد" body={item.barcode} />
                          <InfoLine title="ناوی مواد" body={item.title} />
                          <InfoLine title="کۆی پاکەت" body={item.cartoonSum} />
                          <InfoLine title="کۆی دانە" body={item.oneSum} />
                          <InfoLine
                            title="بڕی تێچوو"
                            body={item.oneDollarPrice}
                          />
                          <InfoLine
                            title="نرخی فرۆشتن پاکەت"
                            body={item.cartoonSellPrice}
                          />
                          <InfoLine
                            title="نرخی فرۆشتن دانە"
                            body={item.oneSellPrice}
                          />
                          <InfoLine
                            title="نرخی جوملە پاکەت"
                            body={item.cartoonJumlaPrice}
                          />
                          <InfoLine
                            title="نرخی جوملە دانە"
                            body={item.oneJumlaPrice}
                          />

                          <InfoLine title="تێبینی" body={item.note} />
                        </div>
                        <Image
                          height={`170px`}
                          width={`170px`}
                          image={item?.image_url}
                          alt={item?.image_name}
                          className="rounded-xl"
                        />
                      </div>

                      <div className="space-y-2 w-full mt-10">
                        <button
                          name="changeItemButton"
                          onClick={() => {
                            dispatch({
                              type: CONTEXT_TYPEs.SET_OLD_DATA,
                              payload: item,
                            });
                            setState({ state: "update" });
                            openDialog();
                          }}
                          type="submit"
                          className="w-full bg-black-600 rounded-sm p-3 text-white flex flex-row justify-center items-center gap-2">
                          <PencilLine />
                          <p className="font-bold font-bukra">گۆڕانکاری</p>
                        </button>
                        <button
                          name="deleteItemButton"
                          onClick={() => {
                            setDeleteDialog(true);
                          }}
                          type="button"
                          className="w-full bg-red-500 rounded-sm p-3 text-white flex flex-row justify-center items-center gap-2">
                          <Trash2 />
                          <p className="font-bold font-bukra">سڕینەوە</p>
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="w-full text-lg font-bold  text-center">
                      موادێک هەڵبژێرە
                    </p>
                  )}
                </div>
              </div>
            </Container>
          );
        }}
      </Pagination>
      {isDialogOpen && (
        <Dialog
          className="!p-5 rounded-md"
          maxHeight={`90%`}
          isOpen={isDialogOpen}
          onClose={closeDialog}>
          <ItemForm onClose={closeDialog} state={state.state} />
          <button
            name="closeItemFormButton"
            onClick={closeDialog}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-bukra">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
      {deleteDialog && active && (
        <Dialog
          maxHeight={`90%`}
          isOpen={deleteDialog}
          className="max-w-fit !w-fit !p-5 !rounded-md"
          onClose={() => setDeleteDialog(false)}>
          <DeleteModal
            loading={deleteLoading}
            deleteFunction={() => deleteItem()}
            onClose={() => setDeleteDialog(false)}
            finalOperator={() => setActive(null)}
          />
        </Dialog>
      )}
    </>
  );
};

export default AddItem;
