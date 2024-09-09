import useScreenSize from "@/hooks/useScreenSize";
import { ClientCardProps } from "@/types/client";
import Image from "../ui/Image";
import { PenLine, Trash2 } from "lucide-react";
import MyButton from "../ui/MyButton";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import ClientDetailCard from "./ClientDetailCard";
import DeleteModal from "../ui/DeleteModal";
import { useDeleteClient } from "@/lib/react-query/query/client.query";
import ClientForm from "../forms/ClientForm";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import Typography from "../shared/Typography";

const ClientCard = ({
  image_name,
  image_url,
  first_name,
  last_name,
  phone,
  id,
  ...others
}: ClientCardProps) => {
  const { size } = useScreenSize();
  const [detail, setDetail] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { dispatch } = useGlobalContext();
  const { mutateAsync, isPending } = useDeleteClient(id);

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
          <Image
            preview={first_name.charAt(0)}
            className="object-cover relative rounded-full"
            image={image_url}
            divClassName="text-lg capitalize"
            alt={first_name}
            height={size === "sm" || size === "xs" ? 50 : 80}
            width={size === "sm" || size === "xs" ? 50 : 80}
          />
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
                    image_name,
                    image_url,
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
            id="showClientDataButton"
            type="button"
            name="showClientDataButton"
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
          <ClientDetailCard
            image_name={image_name}
            image_url={image_url}
            id={id}
            first_name={first_name}
            last_name={last_name}
            phone={phone}
            {...others}
            onClose={() => setDetail(false)}
          />
          <button
            name="closeClientFormButton"
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
          <ClientForm state="update" onClose={updateOnClose} />

          <button
            name="closeClientFormButton"
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

export default ClientCard;
