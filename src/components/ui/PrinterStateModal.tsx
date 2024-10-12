import { PrinterStateModalProps } from "@/types/global";
import MyButton from "@/components/ui/MyButton";
import Chip from "@mui/joy/Chip";
import { Printer, Trash2 } from "lucide-react";

const PrinterStateModal = ({
  deleteFunction,
  onClose,
  finalOperator,
  loading,
}: PrinterStateModalProps) => {
  return (
    <div className="w-full  h-full flex flex-col justify-center bg-transparent items-center gap-5">
      <Chip variant="soft" color="danger">
        <Printer className="w-11 h-11 p-2 cursor-pointer" />
      </Chip>
      <p className="w-full text-center text-md text-black">
        دڵنیای لە گۆڕینی ئەم دۆخە
      </p>
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <MyButton
          name="closePrinterStateModal"
          onClick={onClose}
          type="button"
          className="my-2 bg-red-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2"
        >
          <p className="font-light text-sm font-bukra">نەخێر</p>
        </MyButton>

        <MyButton
          name="closePrinterStateModal"
          onClick={async () => {
            try {
              if (deleteFunction) await deleteFunction();
            } catch (error) {
            } finally {
              onClose();
              if (finalOperator) finalOperator();
            }
          }}
          disabled={loading}
          type="button"
          className="my-2 bg-green-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2"
        >
          <p className="font-light text-sm font-bukra">بەڵێ</p>
        </MyButton>
      </div>
    </div>
  );
};

export default PrinterStateModal;
