import { Info, Minus, PenTool, Plus, RotateCcw, Trash2 } from "lucide-react";
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
import { ItemCardProps, ItemReport } from "@/types/items";
import FormatMoney from "../shared/FormatMoney";
import ItemDetailCard from "./ItemDetailCard";
import ItemForm from "../forms/ItemForm";
import {
  useDeleteItem,
  useRestoreItem,
} from "@/lib/react-query/query/item.query";
import CustomClose from "../shared/CustomClose";
import useCheckReportPage from "@/hooks/useCheckReportPage";
import { formatDateToDDMMYY } from "@/lib/functions";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import RestoreModal from "../ui/RestoreModal";

const ItemCard = ({
  name,
  quantity,
  image_name,
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
  sell_id,
  id,
  index = -1,
  total_quantity,
  created_at,
  ...others
}: ItemCardProps & ItemReport) => {
  const { deleted_page } = useCheckDeletedPage();

  const [detail, setDetail] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);

  const { report_page } = useCheckReportPage();
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
        key={id}>
        {!report_page && (
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
        )}
        <Td className="!p-3">
          <p className="text-right font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        {report_page && (
          <Td className="!p-3">
            <p className="text-right font-light font-poppins text-sm">
              {sell_id}
            </p>
          </Td>
        )}
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{name}</p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{barcode}</p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {type_name}
          </p>
        </Td>

        {!report_page && (
          <Td className="!p-3 flex flex-row justify-start items-center gap-1">
            <Chip
              variant="soft"
              color={actual_quantity < 30 ? "danger" : "neutral"}>
              <p className="!font-bukra text-right font-light  text-xs">
                {actual_quantity}
              </p>
            </Chip>
          </Td>
        )}
        {report_page && (
          <Td className="!p-3 flex flex-row justify-start items-center gap-1">
            <Chip
              variant="soft"
              color={Number(total_quantity) < 30 ? "danger" : "neutral"}>
              <p className="!font-bukra text-right font-light  text-xs">
                {Number(total_quantity)}
              </p>
            </Chip>
          </Td>
        )}
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            <FormatMoney>{item_sell_price}</FormatMoney>
          </p>
        </Td>

        {report_page && (
          <Td className="!p-3">
            <p className="text-right font-light font-bukra text-sm">
              <FormatMoney>
                {item_sell_price * Number(total_quantity)}
              </FormatMoney>
            </p>
          </Td>
        )}
        {!report_page && (
          <Td className="!p-3">
            <p className="text-right font-light font-bukra text-sm">
              <FormatMoney>{item_purchase_price}</FormatMoney>
            </p>
          </Td>
        )}
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {created_by}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {updated_by}
          </p>
        </Td>

        {report_page && (
          <>
            {created_at && (
              <Td className="!p-3">
                <p className="text-right font-light font-bukra text-sm">
                  {formatDateToDDMMYY(created_at.toString())}
                </p>
              </Td>
            )}
          </>
        )}
        {!report_page && (
          <Td className="!p-3 cup flex flex-row gap-2">
            {!deleted_page && (
              <>
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
                          actual_quantity,
                          image_name,
                          image_url,
                          barcode,
                          type_name,
                          type_id,

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
              </>
            )}
            {deleted_page && (
              <Tooltip
                placement="top"
                title="گێڕانەوە"
                color="warning"
                variant="soft">
                <Chip
                  onClick={() => setIsRestore(true)}
                  variant="soft"
                  color="warning">
                  <RotateCcw className="w-7 h-7 p-1 cursor-pointer" />
                </Chip>
              </Tooltip>
            )}
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
        )}
      </Tr>
      {detail && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={1000}
          maxHeight={`90%`}
          isOpen={detail}
          onClose={() => setDetail(false)}>
          <CustomClose onClick={() => setDetail(false)} />
          <ItemDetailCard
            id={id}
            name={name}
            created_by={created_by}
            updated_by={updated_by}
            quantity={quantity}
            actual_quantity={actual_quantity}
            barcode={barcode}
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
          onClose={() => setIsDelete(false)}>
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
          onClose={() => setIsRestore(false)}>
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
          onClose={updateOnClose}>
          <CustomClose onClick={() => updateOnClose()} />

          <ItemForm state="update" onClose={updateOnClose} />
        </Dialog>
      )}
    </>
  );
};

export default ItemCard;
