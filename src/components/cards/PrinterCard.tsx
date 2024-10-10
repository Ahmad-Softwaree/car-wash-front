import { PrinterCardProps } from "@/types/printer";
import { PenTool, RotateCcw, Trash2, X } from "lucide-react";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import DeleteModal from "../ui/DeleteModal";
import {
  useDeletePrinter,
  useRestorePrinter,
  useUpdatePrinterState,
} from "@/lib/react-query/query/printer.query";
import PrinterForm from "../forms/PrinterForm";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { Td, Tr } from "../ui";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import Tooltip from "@mui/joy/Tooltip";
import Chip from "@mui/joy/Chip";
import CustomClose from "../shared/CustomClose";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import RestoreModal from "../ui/RestoreModal";
import PrinterStateModal from "../ui/PrinterStateModal";

const PrinterCard = ({
  name,
  id,
  active,
  index = -1,
  ...others
}: PrinterCardProps) => {
  const { deleted_page } = useCheckDeletedPage();

  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);
  const [isState, setIsState] = useState<boolean>(false);

  const {
    dispatch,
    state: { checked },
  } = useGlobalContext();
  const { mutateAsync, isPending } = useDeletePrinter();
  const { mutateAsync: restore, isPending: restoreLoading } =
    useRestorePrinter();
  const { mutateAsync: state, isPending: stateLoading } =
    useUpdatePrinterState(id);

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
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{name}</p>
        </Td>

        <Td className="!p-3">
          <Chip variant="soft" color={!active ? "danger" : "neutral"}>
            <p className="!font-bukra text-right font-light  text-xs">
              {active ? "چالاک" : "ناچالاک"}
            </p>
          </Chip>
        </Td>

        <Td className="!p-3 cup flex flex-row gap-2 justify-center">
          {!deleted_page && (
            <>
              <Tooltip
                placement="top"
                title="چالاککردن"
                color="primary"
                variant="soft"
              >
                <Chip
                  onClick={() => setIsState(true)}
                  variant="soft"
                  color="primary"
                >
                  <p className="!font-bukra">چالاککردن</p>
                </Chip>
              </Tooltip>
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
        </Td>
      </Tr>

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

      {isState && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isState}
          onClose={() => setIsState(false)}
        >
          <PrinterStateModal
            deleteFunction={() => state()}
            loading={stateLoading}
            onClose={() => setIsState(false)}
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
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={update}
          onClose={updateOnClose}
        >
          <CustomClose onClick={() => updateOnClose()} />
          <PrinterForm state="update" onClose={updateOnClose} />
        </Dialog>
      )}
    </>
  );
};

export default PrinterCard;
