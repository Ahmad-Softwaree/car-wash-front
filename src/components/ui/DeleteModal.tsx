import { DeleteModalProps } from "@/types/global";
import MyButton from "@/components/ui/MyButton";

const DeleteModal = ({
  deleteFunction,
  onClose,
  finalOperator,
  loading,
}: DeleteModalProps) => {
  return (
    <div className="w-full  h-full flex flex-col justify-center bg-white items-center gap-5">
      <p className="w-full text-center text-md text-black">
        دڵنیای لە سڕینەوە ئەم داتایە
      </p>
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <MyButton
          name="closeDeleteModal"
          onClick={onClose}
          type="button"
          className="my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
          <p className="font-bold font-rabar007">نەخێر</p>
        </MyButton>

        <MyButton
          name="closeDeleteModal"
          onClick={async () => {
            if (deleteFunction) await deleteFunction();
            onClose();
            if (finalOperator) finalOperator();
          }}
          disabled={loading}
          type="button"
          className="my-2 bg-green-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
          <p className="font-bold font-rabar007">بەڵێ</p>
        </MyButton>
      </div>
    </div>
  );
};

export default DeleteModal;
