import { FormFinalOperation } from "@/types/global";
import { SellCardProps, SellItem } from "@/types/sell";
import Label from "../ui/Label";
import InputGroup from "../ui/InputGroup";
import { Hash, User } from "lucide-react";
import InputAddon from "../ui/InputAddon";
import Input from "../ui/Input";
import {
  useDeleteItemInSell,
  useGetDeletedSellItems,
  useGetSellItems,
} from "@/lib/react-query/query/sell.query";
import Loading from "../ui/Loading";
import { TailSpin } from "react-loader-spinner";
import { Table, Td, Th, THead, Tr } from "../ui";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import TBody from "../ui/TBody";
import TFoot from "../ui/TFoot";
import SellItemCard from "./SellItemCard";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import { ENUMs } from "@/lib/enum";
import DeleteChip from "../shared/DeleteChip";
import Dialog from "../shared/Dialog";
import DeleteModal from "../ui/DeleteModal";
import { useState } from "react";

const SellDetailCard = ({
  id,
  discount,
  created_by,
  updated_by,
  date,
  onClose,
}: FormFinalOperation & SellCardProps) => {
  const { deleted_page } = useCheckDeletedPage();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { mutateAsync, isPending } = useDeleteItemInSell(id);

  const { data, isLoading } = !deleted_page
    ? useGetSellItems(Number(id))
    : useGetDeletedSellItems(Number(id));

  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  return (
    <>
      <div className="space-y-4  dark-light  rounded-lg default-border bg-transparent py-2 w-full shadow-4xl mt-2">
        <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
          <p className="text-sm">زانیاری</p>
        </div>

        <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <Label className="w-full text-sm  flex flex-row gap-2">
              <p>ژمارە وەصڵ</p>
            </Label>
            <InputGroup className="w-full text-input 0">
              <InputAddon className="w-[20%] md:w-[10%]">
                <Hash />
              </InputAddon>

              <Input
                value={id}
                name="id"
                disabled
                type="text"
                dir="ltr"
                placeholder="ناو"
                className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
              />
            </InputGroup>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <Label className="w-full text-sm  flex flex-row gap-2">
              <p>داشکاندن</p>
            </Label>
            <InputGroup className="w-full text-input 0">
              <InputAddon className="w-[20%] md:w-[10%]">
                <Hash />
              </InputAddon>

              <Input
                value={discount}
                name="discount"
                disabled
                type="text"
                dir="ltr"
                placeholder="ناو"
                className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
              />
            </InputGroup>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <Label className="w-full text-sm  flex flex-row gap-2">
              <p>کۆی گشتی</p>
            </Label>
            <InputGroup className="w-full text-input 0">
              <InputAddon className="w-[20%] md:w-[10%]">
                <Hash />
              </InputAddon>

              <Input
                value={discount}
                name="sum"
                disabled
                type="text"
                dir="ltr"
                placeholder="ناو"
                className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
              />
            </InputGroup>
          </div>
        </div>
        <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <Label className="w-full text-sm  flex flex-row gap-2">
              <p>داغڵکراوە لەلایەن</p>
            </Label>
            <InputGroup className="w-full text-input 0">
              <InputAddon className="w-[20%] md:w-[10%]">
                <User />
              </InputAddon>

              <Input
                value={created_by}
                name="created_by"
                disabled
                type="text"
                dir="ltr"
                className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
              />
            </InputGroup>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <Label className="w-full text-sm  flex flex-row gap-2">
              <p>چاککراوە لەلایەن</p>
            </Label>
            <InputGroup className="w-full text-input 0">
              <InputAddon className="w-[20%] md:w-[10%]">
                <User />
              </InputAddon>

              <Input
                value={updated_by}
                name="updated_by"
                disabled
                type="text"
                dir="ltr"
                className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
              />
            </InputGroup>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
          <p className="text-sm">مەوادەکانی وەصڵ</p>
        </div>
        <div className=" flex flex-row justify-end items-center gap-3 mx-4">
          {checked?.length > 0 && (
            <div className="flex flex-row justify-center items-center gap-2 dark-light">
              <DeleteChip onClick={() => setIsDelete(true)} />

              <p dir="ltr">
                {checked.length} / {ENUMs.CHECK_LIMIT}
              </p>
            </div>
          )}
        </div>
        {isLoading ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : (
          <>
            <div className="row-span-6 w-full max-w-full overflow-x-auto max-h-[600px] default-border hide-scroll">
              <Table className="relative  w-full table-dark-light  default-border">
                <THead className="sticky -top-1 z-[100]  table-dark-light w-full  default-border">
                  <Tr>
                    {!deleted_page && (
                      <Th className="text-right text-sm !p-4 !min-w-[100px]">
                        <InputGroup className="checkbox-input">
                          <Input
                            onClick={() => {
                              if (checked.length == 0) {
                                dispatch({
                                  type: CONTEXT_TYPEs.CHECK,
                                  payload: data?.map(
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
                    )}
                    <Th className="text-center text-sm !p-4">
                      <p className="pr-1">#</p>
                    </Th>
                    <Th className="text-center text-sm !p-4">
                      <p className="pr-3 table-head-border">ناوی کاڵا</p>
                    </Th>
                    <Th className="text-center text-sm !p-4">
                      <p className="pr-3 table-head-border">دانە</p>
                    </Th>{" "}
                    <Th className="text-center text-sm !p-4">
                      <p className="pr-3 table-head-border">نرخ</p>
                    </Th>
                    <Th className="text-center text-sm !p-4">
                      <p className="pr-3 table-head-border">کۆ</p>
                    </Th>
                    {!deleted_page && (
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">کردارەکان</p>
                      </Th>
                    )}
                  </Tr>
                </THead>
                <TBody className="w-full">
                  {data?.map((val: SellItem, _index: number) => (
                    <SellItemCard
                      state="read"
                      index={_index}
                      key={val.id}
                      {...val}
                    />
                  ))}
                </TBody>
              </Table>
            </div>
            <div className="w-full flex flex-row justify-center items-center z-[100]  table-dark-light   default-border p-2 ">
              <p className="text-center">ژمارەی داتا {data?.length}</p>
            </div>
          </>
        )}
      </div>
      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}
        >
          <DeleteModal
            deleteFunction={() => mutateAsync(checked)}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
    </>
  );
};

export default SellDetailCard;
