import useScreenSize from "@/hooks/useScreenSize";
import { CustomerCardProps } from "@/types/customer";
import Image from "../ui/Image";
import { PenLine, Trash2 } from "lucide-react";
import MyButton from "../ui/MyButton";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import CustomerDetailCard from "./CustomerDetailCard";
import DeleteModal from "../ui/DeleteModal";
import { useDeleteCustomer } from "@/lib/react-query/query/customer.query";
import CustomerForm from "../forms/CustomerForm";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import Typography from "../shared/Typography";

const CustomerCard = ({
  first_name,
  last_name,
  phone,
  id,
  ...others
}: CustomerCardProps) => {
  const { size } = useScreenSize();
  const [detail, setDetail] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { dispatch } = useGlobalContext();
  const { mutateAsync, isPending } = useDeleteCustomer(id);

  const updateOnClose = () => {
    dispatch({
      type: CONTEXT_TYPEs.SET_OLD_DATA,
      payload: null,
    });
    setUpdate(false);
  };
  return (
    <>
      <article
        id={id.toLocaleString()}
        className="w-[320px] md:w-[420px] h-[140px] rounded-lg bg-white shadow-md border-[1.2px] border-solid border-opacity-50 border-gray-400 flex flex-row justify-between items-center p-3  gap-5">
        <div className="flex flex-row justify-start items-center gap-5">
          <div className="flex flex-col justify-center items-start gap-1">
            <span className="opacity-50 text-black text-sm">ناو</span>

            <Typography
              text={first_name + last_name}
              className="font-bold  text-sm mb-1">
              <p>
                {first_name} {last_name}
              </p>
            </Typography>
            <span className="opacity-50 text-black text-sm">
              ژمارەی تەلەفۆن
            </span>

            <p className="font-bold font-poppins text-sm mb-1">{phone}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex flex-row justify-center items-center gap-3">
            <Trash2
              onClick={() => setIsDelete(true)}
              className="cursor-pointer text-red-500"
            />
            <PenLine
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
              className="cursor-pointer text-green-500"
            />
          </div>{" "}
          <MyButton
            onClick={() => setDetail(true)}
            id="showCustomerDataButton"
            type="button"
            name="showCustomerDataButton"
            className="px-2 md:px-4 text-sm md:text-md py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            زانیاری
          </MyButton>
        </div>
      </article>
      {detail && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={detail}
          onClose={() => setDetail(false)}>
          <CustomerDetailCard
            id={id}
            first_name={first_name}
            last_name={last_name}
            phone={phone}
            {...others}
            onClose={() => setDetail(false)}
          />
          <button
            name="closeCustomerFormButton"
            onClick={() => setDetail(false)}
            type="button"
            className="w-full  my-2 bg-black-600 rounded-sm p-2 text-white flex flex-row justify-center items-center gap-2">
            <p className="text-md">لابردن</p>
          </button>
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
            deleteFunction={() => mutateAsync()}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
      {update && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={800}
          maxHeight={`90%`}
          isOpen={update}
          onClose={updateOnClose}>
          <CustomerForm state="update" onClose={updateOnClose} />

          <button
            name="closeCustomerFormButton"
            onClick={updateOnClose}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-rabar007">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
    </>
  );
};

export default CustomerCard;
