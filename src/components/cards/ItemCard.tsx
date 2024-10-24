import { Info, PenTool, RotateCcw, Trash2 } from "lucide-react";
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
import {
  useDeleteItem,
  useRestoreItem,
} from "@/lib/react-query/query/item.query";
import CustomClose from "../shared/CustomClose";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import RestoreModal from "../ui/RestoreModal";
import { useGetConfigs } from "@/lib/react-query/query/config.query";
import Image from "../ui/Image";

const ItemCard = ({
  name,
  quantity,
  image_name,
  item_less_from,
  image_url,
  barcode,
  type_name,
  type_id,
  item_purchase_price,
  item_sell_price,
  actual_quantity,
  note,
  created_by,
  updated_by,
  id,
  index = -1,

  ...others
}: ItemCardProps) => {
  const { data: config } = useGetConfigs();
  const { deleted_page } = useCheckDeletedPage();

  const [detail, setDetail] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);

  const { mutateAsync: restore, isPending: restoreLoading } = useRestoreItem();

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
        className={`default-border table-row-hover  ${
          checked?.includes(id) ? "table-row-include" : "table-row-normal"
        }`}
        key={id}
      >
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
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">{name}</p>
        </Td>
        <Td className="!p-3">
          <Image
            image={image_url}
            preview={name.charAt(0)}
            className="w-20 h-20 rounded-full object-cover"
          />
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">{barcode}</p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {type_name}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="!font-bukra text-center font-light  text-xs">
            {item_less_from}
          </p>
        </Td>
        {config && (
          <Td className="!p-3">
            <Chip
              variant="soft"
              color={
                actual_quantity < item_less_from ||
                actual_quantity < config.item_less_from
                  ? "danger"
                  : "neutral"
              }
            >
              <p className="!font-bukra text-center font-light  text-xs">
                {actual_quantity}
              </p>
            </Chip>
          </Td>
        )}

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm flex flex-row gap-1">
            <FormatMoney>{item_sell_price}</FormatMoney>
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm flex flex-rwo gap-1">
            <FormatMoney>{item_purchase_price}</FormatMoney>
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {created_by}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {updated_by}
          </p>
        </Td>

        <Td className="!p-3 cup flex flex-row gap-2 justify-center">
          {!deleted_page && (
            <>
              <Tooltip
                placement="top"
                title="سڕینەوە"
                color="danger"
                variant="soft"
              >
                <Chip
                  onClick={() => setIsDelete(true)}
                  variant="soft"
                  color="danger"
                >
                  <Trash2 className="w-7 h-7 p-1 cursor-pointer" />
                </Chip>
              </Tooltip>
              <Tooltip
                placement="top"
                title="چاککردن"
                color="success"
                variant="soft"
              >
                <Chip
                  onClick={() => {
                    dispatch({
                      type: CONTEXT_TYPEs.SET_OLD_DATA,
                      payload: {
                        name,
                        quantity,
                        actual_quantity,
                        image_name,
                        image_url,
                        barcode,
                        type_name,
                        type_id,
                        item_less_from,
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
                  color="success"
                >
                  <PenTool className="w-7 h-7 p-1 cursor-pointer" />
                </Chip>
              </Tooltip>
            </>
          )}
          {deleted_page && (
            <Tooltip
              placement="top"
              title="گێڕانەوە"
              color="warning"
              variant="soft"
            >
              <Chip
                onClick={() => setIsRestore(true)}
                variant="soft"
                color="warning"
              >
                <RotateCcw className="w-7 h-7 p-1 cursor-pointer" />
              </Chip>
            </Tooltip>
          )}
          <Tooltip
            placement="top"
            title="زانیاری"
            color="primary"
            variant="soft"
          >
            <Chip
              onClick={() => setDetail(true)}
              variant="soft"
              color="primary"
            >
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
          onClose={() => setDetail(false)}
        >
          <CustomClose onClick={() => setDetail(false)} />
          <ItemDetailCard
            id={id}
            name={name}
            created_by={created_by}
            updated_by={updated_by}
            quantity={quantity}
            actual_quantity={actual_quantity}
            barcode={barcode}
            item_less_from={item_less_from}
            type_name={type_name}
            type_id={type_id}
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
          onClose={() => setIsDelete(false)}
        >
          <DeleteModal
            deleteFunction={() => mutateAsync([id])}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
      {isRestore && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isRestore}
          onClose={() => setIsRestore(false)}
        >
          <RestoreModal
            deleteFunction={() => restore([id])}
            loading={restoreLoading}
            onClose={() => setIsRestore(false)}
          />
        </Dialog>
      )}
      {update && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={2000}
          maxHeight={700}
          isOpen={update}
          onClose={updateOnClose}
        >
          <CustomClose onClick={() => updateOnClose()} />

          <ItemForm state="update" onClose={updateOnClose} />
        </Dialog>
      )}
    </>
  );
};

export default ItemCard;
