import { formatDateToDDMMYY } from "@/lib/functions";
import { ExpenseCardProps } from "@/types/expense";
import Typography from "../shared/Typography";
import FormatMoney from "../shared/FormatMoney";
import { PenLine } from "lucide-react";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import ExpenseForm from "../forms/ExpenseForm";
import MyButton from "../ui/MyButton";
const ExpenseCard = ({
  onClick,
  price,
  note,
  type,
  id,
  date,
}: ExpenseCardProps) => {
  const { dispatch } = useGlobalContext();
  const [update, setUpdate] = useState<boolean>(false);

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
        className="w-[340px] h-[150px] rounded-lg bg-white shadow-md border-[1.2px] border-solid border-opacity-50 border-gray-400 flex flex-col justify-between items-center p-3 cursor-pointer">
        <div className="w-full flex flex-row justify-between items-start">
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex flex-row justify-start items-center gap-2">
              <Typography text={type}>
                <p className="font-bold text-lg text-nowrap">{type}</p>
              </Typography>
              <PenLine
                onClick={() => {
                  dispatch({
                    type: CONTEXT_TYPEs.SET_OLD_DATA,
                    payload: {
                      price,
                      note,
                      type,
                      id,
                      date,
                    },
                  });
                  setUpdate(true);
                }}
                className="cursor-pointer text-green-500"
              />
            </div>
            <MyButton
              onClick={() => onClick(id)}
              id="showUserDataButton"
              type="button"
              name="showUserDataButton"
              className="px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              زانیاری
            </MyButton>
          </div>

          <div className="flex flex-col justify-start items-start gap-2">
            <span className="opacity-50 text-black text-md">بڕی خەرجکراو</span>
            <div className="w-full flex flex-row gap-2 justify-end">
              <FormatMoney className="text-primary-500 font-bold font-rabar007 text-lg text-nowrap">
                {price}
              </FormatMoney>
              <p className="text-primary-500 font-bold font-rabar007 text-lg text-nowrap">
                د.ع
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row justify-center items-center gap-1">
            <p className="text-sm text-nowrap font-rabar007 opacity-50 text-black">
              بەروار :
            </p>
            <p className="text-sm text-nowrap font-poppins opacity-50 text-black">
              {formatDateToDDMMYY(date.toLocaleString())}
            </p>
          </div>
        </div>
      </article>
      {update && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={800}
          maxHeight={`90%`}
          isOpen={update}
          onClose={updateOnClose}>
          <ExpenseForm state="update" onClose={updateOnClose} />

          <button
            name="closeUserFormButton"
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

export default ExpenseCard;
