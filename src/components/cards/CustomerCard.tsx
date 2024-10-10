import { CustomerCardProps } from "@/types/customer";
import { Info, PenTool, RotateCcw, Trash2, X } from "lucide-react";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import CustomerDetailCard from "./CustomerDetailCard";
import DeleteModal from "../ui/DeleteModal";
import {
  useDeleteCustomer,
  useRestoreCustomer,
} from "@/lib/react-query/query/customer.query";
import CustomerForm from "../forms/CustomerForm";
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

const CustomerCard = ({
  first_name,
  last_name,
  phone,
  id,
  updated_by,
  created_by,
  index = -1,
  ...others
}: CustomerCardProps) => {
  const { deleted_page } = useCheckDeletedPage();

  const [detail, setDetail] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);

  const {
    dispatch,
    state: { checked },
  } = useGlobalContext();
  const { mutateAsync, isPending } = useDeleteCustomer();
  const { mutateAsync: restore, isPending: restoreLoading } =
    useRestoreCustomer();

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
          <p className="text-center font-light font-bukra text-sm">
            {first_name}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {last_name}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">{phone}</p>
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
                        first_name,
                        last_name,
                        phone,
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
          <CustomerDetailCard
            id={id}
            updated_by={updated_by}
            created_by={created_by}
            first_name={first_name}
            last_name={last_name}
            phone={phone}
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
          maxWidth={1500}
          maxHeight={`90%`}
          isOpen={update}
          onClose={updateOnClose}
        >
          <CustomClose onClick={() => updateOnClose()} />
          <CustomerForm state="update" onClose={updateOnClose} />
        </Dialog>
      )}
    </>
  );
};

export default CustomerCard;
