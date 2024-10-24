import { ReservationCardProps } from "@/types/reservation";
import {
  CircleCheck,
  CircleX,
  Info,
  PenTool,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import ReservationDetailCard from "./ReservationDetailCard";
import DeleteModal from "../ui/DeleteModal";
import {
  useCompleteReservation,
  useDeleteReservation,
  useRestoreReservation,
} from "@/lib/react-query/query/reservation.query";
import ReservationForm from "../forms/ReservationFrom";
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
import { formateDateToYMDHM } from "@/lib/functions";
import CompleteModal from "../ui/CompleteModal";
import FormatMoney from "../shared/FormatMoney";

const ReservationCard = ({
  customer_name,
  color_name,
  car_model_name,
  car_type_name,
  service_name,
  price,
  car_number,
  note,
  date_time,
  created_by,
  updated_by,
  id,
  completed,
  index = -1,
  ...others
}: ReservationCardProps) => {
  const { deleted_page } = useCheckDeletedPage();

  const [detail, setDetail] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [completeState, setCompleteState] = useState<boolean>(false);

  const [isRestore, setIsRestore] = useState<boolean>(false);

  const {
    dispatch,
    state: { checked },
  } = useGlobalContext();
  const { mutateAsync, isPending } = useDeleteReservation();
  const { mutateAsync: restore, isPending: restoreLoading } =
    useRestoreReservation();
  const { mutateAsync: complete, isPending: completeLoading } =
    useCompleteReservation();
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
        </Td>{" "}
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm flex flex-row gap-1">
            <FormatMoney>{price}</FormatMoney>
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {customer_name}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {formateDateToYMDHM(date_time as string)}
          </p>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {service_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {car_number}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {car_type_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {car_model_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {color_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={completed ? "neutral" : "danger"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {completed ? "تەواوبوو" : "تەواونەبوو"}
            </p>
          </Chip>
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
          {!completed && (
            <Tooltip
              placement="top"
              title="تەواو بوو"
              color="primary"
              variant="soft"
            >
              <Chip
                onClick={() => {
                  setIsComplete(true);
                  setCompleteState(true);
                }}
                variant="soft"
                color="primary"
              >
                <CircleCheck className="w-7 h-7 p-1 cursor-pointer" />
              </Chip>
            </Tooltip>
          )}
          {completed && (
            <Tooltip
              placement="top"
              title="تەواو نەبوو"
              color="danger"
              variant="soft"
            >
              <Chip
                onClick={() => {
                  setIsComplete(true);
                  setCompleteState(false);
                }}
                variant="soft"
                color="danger"
              >
                <CircleX className="w-7 h-7 p-1 cursor-pointer" />
              </Chip>
            </Tooltip>
          )}
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
                        customer_name,
                        car_number,
                        color_name,
                        car_model_name,
                        car_type_name,
                        service_name,
                        price,
                        note,
                        date_time,
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
          <ReservationDetailCard
            id={id}
            updated_by={updated_by}
            car_number={car_number}
            created_by={created_by}
            completed={completed}
            customer_name={customer_name}
            color_name={color_name}
            service_name={service_name}
            car_type_name={car_type_name}
            car_model_name={car_model_name}
            note={note}
            price={price}
            date_time={date_time}
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
      {isComplete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isComplete}
          onClose={() => setIsComplete(false)}
        >
          <CompleteModal
            deleteFunction={() =>
              complete({ ids: [id], complete: completeState })
            }
            loading={completeLoading}
            onClose={() => setIsComplete(false)}
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
          <ReservationForm state="update" onClose={updateOnClose} />
        </Dialog>
      )}
    </>
  );
};

export default ReservationCard;
