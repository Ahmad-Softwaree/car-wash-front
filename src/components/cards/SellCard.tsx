import { SellCardProps } from "@/types/sell";
import { Info, PenTool, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import DeleteModal from "../ui/DeleteModal";
import {
  useDeleteSell,
  useRestoreSell,
} from "@/lib/react-query/query/sell.query";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { Td, Tr } from "../ui";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import Tooltip from "@mui/joy/Tooltip";
import Chip from "@mui/joy/Chip";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import RestoreModal from "../ui/RestoreModal";
import SellDetailCard from "./SellDetailCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import SellRestoreConfirm from "./SellRestoreConfirm";
import CustomClose from "../shared/CustomClose";
import { formatDateToDDMMYY } from "@/lib/functions";

const SellCard = ({
  discount,
  date,
  id,
  index = -1,
  ...others
}: SellCardProps) => {
  const navigate = useNavigate();
  const { deleted_page } = useCheckDeletedPage();
  const [searchParam, setSearchParam] = useSearchParams();
  const [detail, setDetail] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const {
    dispatch,
    state: { checked },
  } = useGlobalContext();
  const { mutateAsync, isPending } = useDeleteSell();

  return (
    <>
      <Tr
        className={`default-border table-row-hover  ${
          checked?.includes(id) ? "table-row-include" : "table-row-normal"
        }`}
        key={id}>
        {!deleted_page && (
          <Td className="!p-3">
            <InputGroup className="checkbox-input">
              <Input
                onChange={() => {
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
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{id}</p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {formatDateToDDMMYY(date.toLocaleString())}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{discount}</p>
        </Td>

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
                  onClick={async () => {
                    navigate(
                      `/${ENUMs.GENERAL_SECTION}/${ENUMs.CREATE_PSULA_PART}?sell_id=${id}`
                    );
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
      </Tr>

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
            deleteFunction={() => setIsConfirm(true)}
            loading={false}
            onClose={() => setIsRestore(false)}
          />
        </Dialog>
      )}
      {detail && (
        <Dialog
          className="!p-5 rounded-md hide-scroll"
          maxWidth={2000}
          maxHeight={`90%`}
          isOpen={detail}
          onClose={() => setDetail(false)}>
          <CustomClose onClick={() => setDetail(false)} />
          <SellDetailCard
            discount={discount}
            id={id}
            date={date}
            index={index}
            onClose={() => setDetail(false)}
          />
        </Dialog>
      )}
      {isConfirm && (
        <Dialog
          className="!p-5 rounded-md hide-scroll"
          maxWidth={2000}
          maxHeight={`90%`}
          isOpen={isConfirm}
          onClose={() => setIsConfirm(false)}>
          <CustomClose onClick={() => setIsConfirm(false)} />

          <SellRestoreConfirm
            discount={discount}
            id={id}
            date={date}
            index={index}
            onClose={() => setIsConfirm(false)}
          />
        </Dialog>
      )}
    </>
  );
};

export default SellCard;
