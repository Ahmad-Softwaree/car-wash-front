import { UserCardProps } from "@/types/auth";
import { PenLine, Trash2 } from "lucide-react";
import MyButton from "../ui/MyButton";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import UserDetailCard from "./UserDetailCard";
import DeleteModal from "../ui/DeleteModal";
import { useDeleteUser } from "@/lib/react-query/query/user.query";
import UserForm from "../forms/UserForm";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { Badge } from "../ui/badge";
import Typography from "../shared/Typography";

const UserCard = ({
  name,
  role_id,
  role_name,
  id,
  ...others
}: UserCardProps) => {
  const [detail, setDetail] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { dispatch } = useGlobalContext();
  const { mutateAsync, isPending } = useDeleteUser(id);

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
        className="w-[330px] md:w-[420px] h-[140px] rounded-lg bg-white shadow-md border-[1.2px] border-solid border-opacity-50 border-gray-400 flex flex-row justify-between items-center p-3  gap-5">
        <div className="flex flex-row justify-start items-center gap-5">
          <div className="flex flex-col justify-center items-start gap-1">
            <span className="opacity-50 text-black text-sm">ناو</span>

            <Typography
              text={name}
              className="font-bold font-rabar007 text-sm md:text-lg text-nowrap mb-1">
              <p>{name}</p>
            </Typography>
            <span className="opacity-50 text-black text-sm">دەسەڵات</span>
            <Badge
              variant="default"
              className=" text-sm p-1 md:px-2  text-white font-light hover:bg-black">
              {role_name}
            </Badge>
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
                    name,
                    role_id,
                    role_name,
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
            id="showUserDataButton"
            type="button"
            name="showUserDataButton"
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
          <UserDetailCard
            id={id}
            name={name}
            role_id={role_id}
            role_name={role_name}
            {...others}
            onClose={() => setDetail(false)}
          />
          <button
            name="closeUserFormButton"
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
          <UserForm state="update" onClose={updateOnClose} />

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

export default UserCard;
