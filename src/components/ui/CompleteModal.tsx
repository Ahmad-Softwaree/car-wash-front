import { CompleteModalProps } from "@/types/global";
import MyButton from "@/components/ui/MyButton";
import Chip from "@mui/joy/Chip";
import { Presentation, RotateCcw } from "lucide-react";

const CompleteModal = ({
  deleteFunction,
  onClose,
  finalOperator,
  loading,
}: CompleteModalProps) => {
  return (
    <div className="w-full  h-full flex flex-col justify-center bg-transparent items-center gap-5">
      <Chip variant="soft" color="warning">
        <Presentation className="w-11 h-11 p-2 cursor-pointer" />
      </Chip>
      <p className="w-full text-center text-md text-black">
        دڵنیای لە گۆڕینی دۆخی ئەم داتایە
      </p>
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <MyButton
          name="closeCompleteModal"
          onClick={onClose}
          type="button"
          className="my-2 bg-red-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
          <p className="font-light text-sm font-bukra">نەخێر</p>
        </MyButton>

        <MyButton
          name="closeCompleteModal"
          onClick={async () => {
            if (deleteFunction) await deleteFunction();
            onClose();
            if (finalOperator) finalOperator();
          }}
          disabled={loading}
          type="button"
          className="my-2 bg-green-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
          <p className="font-light text-sm font-bukra">بەڵێ</p>
        </MyButton>
      </div>
    </div>
  );
};

export default CompleteModal;
