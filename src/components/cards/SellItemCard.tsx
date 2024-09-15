import { Minus, PenTool, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import DeleteModal from "../ui/DeleteModal";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { Td, Tr } from "../ui";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import Tooltip from "@mui/joy/Tooltip";
import Chip from "@mui/joy/Chip";
import { SellItemCardProps } from "@/types/sell";
import { useDeleteItemInSell } from "@/lib/react-query/query/sell.query";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

const SellItemCard = ({
  id,
  quantity,
  item_id,
  sell_id,
  item_purchase_price,
  item_sell_price,
  index = -1,
  ...others
}: SellItemCardProps) => {
  const [searchParam, setSearchParam] = useSearchParams();
  let sell_id_param = searchParam.get(ENUMs.SELL_PARAM as string);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const {
    dispatch,
    state: { checked },
  } = useGlobalContext();
  const { mutateAsync, isPending } = useDeleteItemInSell(
    Number(sell_id_param),
    item_id
  );

  return (
    <>
      <Tr
        className={`default-border table-row-hover  ${
          checked?.includes(id) ? "table-row-include" : "table-row-normal"
        }`}
        key={id}>
        <Td className="!p-3">
          <InputGroup className="checkbox-input">
            <Input
              onClick={() => {
                if (checked?.includes(id)) {
                  dispatch({
                    type: CONTEXT_TYPEs.UNCHECK,
                    payload: id,
                  });
                } else {
                  dispatch({
                    type: CONTEXT_TYPEs.CHECK,
                    payload: id,
                  });
                }
              }}
              checked={checked.includes(id)}
              type="checkbox"
              className="cursor-pointer"
            />
          </InputGroup>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{item_id}</p>
        </Td>

        <Td className="!p-3 flex flex-row justify-start items-center gap-1">
          <Tooltip
            placement="top"
            title="زیادکردن"
            color="success"
            variant="soft">
            <Chip onClick={() => {}} variant="soft" color="success">
              <Plus className="w-4 h-4 cursor-pointer" />
            </Chip>
          </Tooltip>

          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-right font-light  text-xs">
              {quantity}
            </p>
          </Chip>

          <Tooltip
            placement="top"
            title="کەمکردن"
            color="danger"
            variant="soft">
            <Chip onClick={() => {}} variant="soft" color="danger">
              <Minus className="w-4 h-4 cursor-pointer" />
            </Chip>
          </Tooltip>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {item_sell_price}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {item_purchase_price}
          </p>
        </Td>

        <Td className="!p-3 cup flex flex-row gap-2">
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
          <Tooltip
            placement="top"
            title="چاککردن"
            color="success"
            variant="soft">
            <Chip variant="soft" color="success">
              <PenTool className="w-7 h-7 p-1 cursor-pointer" />
            </Chip>
          </Tooltip>
        </Td>
      </Tr>

      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}>
          <DeleteModal
            deleteFunction={() => mutateAsync()}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
    </>
  );
};

export default SellItemCard;
