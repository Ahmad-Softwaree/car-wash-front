import { FormFinalOperation } from "@/types/global";
import { SellCardProps, SellItem } from "@/types/sell";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import {
  useGetDeletedSellItems,
  useGetSellItems,
  useRestoreSell,
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
import MyButton from "../ui/MyButton";

const SellRestoreConfirm = ({
  id,
  discount,
  date,
  onClose,
}: FormFinalOperation & SellCardProps) => {
  const { deleted_page } = useCheckDeletedPage();

  const { data, isLoading } = !deleted_page
    ? useGetSellItems(Number(id))
    : useGetDeletedSellItems(Number(id));

  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  const { mutateAsync: restore, isPending: restoreLoading } =
    useRestoreSell(checked);

  return (
    <div className="space-y-4  dark-light  rounded-lg default-border bg-transparent py-2 w-full shadow-4xl mt-2">
      <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
        <p className="text-sm">
          ئەم مەوادانە لەسەر ئەم وەصەڵەیە، دەتەوێ چەند دانە بگێڕێتەوە لەگەڵ
          وەصڵەکە؟
        </p>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
        <p className="text-sm">مەوادەکانی وەصڵ</p>
      </div>
      {isLoading ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : (
        <div className="row-span-6 w-full max-w-full overflow-x-auto h-[600px] default-border hide-scroll">
          <Table className="relative  w-full table-dark-light  default-border">
            <THead className="sticky -top-1 z-[100]  table-dark-light w-full  default-border">
              <Tr>
                <Th className="text-center text-sm !p-4 !min-w-[100px]">
                  <InputGroup className="checkbox-input">
                    <Input
                      onClick={() => {
                        if (checked.length == 0) {
                          dispatch({
                            type: CONTEXT_TYPEs.CHECK,
                            payload: data?.map(
                              (val: SellItem, _index: number) => val.item_id
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
              </Tr>
            </THead>
            <TBody className="w-full">
              {data?.map((val: SellItem, _index: number) => (
                <SellItemCard
                  confirm={true}
                  state="read"
                  index={_index}
                  key={val.id}
                  {...val}
                />
              ))}
            </TBody>
            <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
              {data && data?.length > 0 && (
                <Tr>
                  <Td className="text-center" colSpan={7}>
                    گشتی : {data.length}
                  </Td>
                </Tr>
              )}
            </TFoot>
          </Table>
        </div>
      )}
      <MyButton
        loading={restoreLoading}
        onClick={() => restore(id)}
        name="restoreSellButton"
        type="button"
        className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2 mx-2"
      >
        <p className="font-light text-sm font-bukra">جێبەجێکردن</p>
      </MyButton>
    </div>
  );
};

export default SellRestoreConfirm;
