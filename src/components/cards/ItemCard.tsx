import { Info, PenTool, Trash2, X } from "lucide-react";
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
import { ItemCardProps } from "@/types/items";
import FormatMoney from "../shared/FormatMoney";
import ItemDetailCard from "./ItemDetailCard";
import ItemForm from "../forms/ItemForm";
import { useDeleteItem } from "@/lib/react-query/query/item.query";

const ItemCard = ({
  name,
  quantity,
  image_name,
  image_url,
  barcode,
  type,
  item_purchase_price,
  item_sell_price,
  note,
  id,
  index = -1,
  ...others
}: ItemCardProps) => {
  const [detail, setDetail] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const {
    dispatch,
    state: { checked },
  } = useGlobalContext();
  const { mutateAsync, isPending } = useDeleteItem();

  const updateOnClose = () => {
    dispatch({
      type: CONTEXT_TYPEs.SET_OLD_DATA,
      payload: null,
    });
    setUpdate(false);
  };
  return (
    <>
      <Tr
        className={`border-2 border-solid border-primary-400 border-opacity-80    hover:bg-sky-300 dark:hover:bg-sky-800 transition-all duration-200 ${
          checked?.includes(id)
            ? "bg-sky-300 dark:bg-sky-800"
            : "bg-white dark:bg-[#0e1214]"
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
          <p className="text-right font-light font-rabar007 text-sm">{name}</p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-rabar007 text-sm">
            {barcode}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-rabar007 text-sm">{type}</p>
        </Td>

        <Td className="!p-3">
          <Chip variant="soft" color={quantity < 30 ? "danger" : "neutral"}>
            <p className="!font-bukra text-right font-light font-rabar007 text-xs">
              {quantity}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-rabar007 text-sm">
            <FormatMoney>{item_sell_price}</FormatMoney>
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-rabar007 text-sm">
            <FormatMoney>{item_purchase_price}</FormatMoney>
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
            <Chip
              onClick={() => {
                dispatch({
                  type: CONTEXT_TYPEs.SET_OLD_DATA,
                  payload: {
                    name,
                    quantity,
                    image_name,
                    image_url,
                    barcode,
                    type,
                    item_purchase_price,
                    item_sell_price,
                    note,
                    id,
                    ...others,
                  },
                });
                setUpdate(true);
              }}
              variant="soft"
              color="success">
              <PenTool className="w-7 h-7 p-1 cursor-pointer" />
            </Chip>
          </Tooltip>
          <Tooltip
            placement="top"
            title="زانیاری"
            color="primary"
            variant="soft">
            <Chip
              onClick={() => setDetail(true)}
              variant="soft"
              color="primary">
              <Info className="w-7 h-7 p-1 cursor-pointer" />
            </Chip>
          </Tooltip>
        </Td>
      </Tr>
      {detail && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={1000}
          maxHeight={`90%`}
          isOpen={detail}
          onClose={() => setDetail(false)}>
          <X
            onClick={() => setDetail(false)}
            className="cursor-pointer p-1 w-8 h-8 border-2 border-solid border-primary-400 border-opacity-40 rounded-lg mb-2 transition-all duration-200 hover:bg-red-400"
          />
          <ItemDetailCard
            id={id}
            name={name}
            quantity={quantity}
            barcode={barcode}
            type={type}
            item_purchase_price={item_purchase_price}
            item_sell_price={item_sell_price}
            image_url={image_url}
            image_name={image_name}
            note={note}
            {...others}
            onClose={() => setDetail(false)}
          />
        </Dialog>
      )}
      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}>
          <DeleteModal
            deleteFunction={() => mutateAsync([id])}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
      {update && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={1500}
          maxHeight={`90%`}
          isOpen={update}
          onClose={updateOnClose}>
          <X
            onClick={updateOnClose}
            className="cursor-pointer p-1 w-8 h-8 border-2 border-solid border-primary-400 border-opacity-40 rounded-lg mb-2 transition-all duration-200 hover:bg-red-400"
          />
          <ItemForm state="update" onClose={updateOnClose} />
        </Dialog>
      )}
    </>
  );
};

export default ItemCard;
