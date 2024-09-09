import { ColorCardProps } from "@/types/color";
import { PenLine, Trash } from "lucide-react";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import ColorForm from "../forms/ColorForm";
import DeleteModal from "../ui/DeleteModal";
import { useDeleteColor } from "@/lib/react-query/query/color.query";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";

const ColorCard = ({ id, name }: ColorCardProps) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const { mutateAsync, isPending } = useDeleteColor(id);
  const { dispatch } = useGlobalContext();
  const closeUpdate = () => {
    dispatch({
      type: CONTEXT_TYPEs.SET_OLD_DATA,
      payload: null,
    });
    setIsUpdate(false);
  };
  return (
    <>
      <article
        className="p-3 rounded-md cursor-pointer flex justify-between items-center shadow-md bg-white px-5 min-w-[200px] w-fit"
        id={id.toLocaleString()}>
        <p className="text-sm font-bold font-rabar007">{name}</p>
        <div className="flex flex-row justify-center items-center gap-4">
          <Trash
            onClick={() => setIsDelete(true)}
            className="cursor-pointer text-red-500"
          />
          <PenLine
            onClick={() => {
              setIsUpdate(true);
              dispatch({
                type: CONTEXT_TYPEs.SET_OLD_DATA,
                payload: {
                  id,
                  name,
                },
              });
            }}
            className="cursor-pointer text-green-500"
          />
        </div>
      </article>
      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={300}
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
      {isUpdate && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={isUpdate}
          onClose={closeUpdate}>
          <ColorForm state="update" onClose={closeUpdate} />
          <button
            name="closeColorFormButton"
            onClick={closeUpdate}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-rabar007">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
    </>
  );
};

export default ColorCard;
