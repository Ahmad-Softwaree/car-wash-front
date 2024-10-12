import { RestoreModalProps } from "@/types/global";
import MyButton from "@/components/ui/MyButton";
import Chip from "@mui/joy/Chip";
import { RotateCcw } from "lucide-react";

const RestoreModal = ({
  deleteFunction,
  onClose,
  finalOperator,
  loading,
}: RestoreModalProps) => {
  return (
    <div className="w-full  h-full flex flex-col justify-center bg-transparent items-center gap-5">
      <Chip variant="soft" color="warning">
        <RotateCcw className="w-11 h-11 p-2 cursor-pointer" />
      </Chip>
      <p className="w-full text-center text-md text-black">
        دڵنیای لە گێرانەوەی ئەم داتایە
      </p>
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <MyButton
          name="closeRestoreModal"
          onClick={onClose}
          type="button"
          className="my-2 bg-red-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2"
        >
          <p className="font-light text-sm font-bukra">نەخێر</p>
        </MyButton>

        <MyButton
          name="closeRestoreModal"
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

export default RestoreModal;
