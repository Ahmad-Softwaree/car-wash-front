import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/Container";
import { getCurrentDate, getCurrentTime } from "@/lib/functions";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserRound, KeyRound, Power } from "lucide-react";
import { DropDownItem, HeaderItem } from "@/types/global";
import { useAuthContext } from "@/context/AuthContext";
import { useLogout } from "@/lib/react-query/query/auth.query";
import Image from "@/components/ui/Image";
import Typography from "@/components/shared/Typography";
const ChangePasswordForm = lazy(
  () => import("@/components/forms/ChangePasswordForm")
);
const ChangeNameForm = lazy(() => import("@/components/forms/ChangeNameForm"));
const Dialog = lazy(() => import("@/components/shared/Dialog"));

const Header = () => {
  const { mutateAsync, isPending } = useLogout();
  const {
    state: { user },
  } = useAuthContext();
  console.log(user);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState<boolean>(false);
  const [isPassDialogOpen, setIsPassDialogOpen] = useState<boolean>(false);

  const openDialog = useCallback(
    (type: "name" | "password") =>
      type === "name" ? setIsNameDialogOpen(true) : setIsPassDialogOpen(true),
    [isNameDialogOpen, isPassDialogOpen]
  );
  const closeDialog = useCallback(
    (type: "name" | "password") =>
      type === "name" ? setIsNameDialogOpen(false) : setIsPassDialogOpen(false),
    [isNameDialogOpen, isPassDialogOpen]
  );

  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const headerItems: HeaderItem[] = useMemo(
    () => [
      {
        id: 1,
        icon: "/images/time.svg",
        text: currentTime,
      },
      {
        id: 2,
        icon: "/images/calender.svg",
        text: getCurrentDate(),
      },
    ],
    []
  );

  const dropdownItems: DropDownItem[] = useMemo(
    () => [
      {
        id: 1,
        icon: <UserRound size={`20`} />,
        text: `گۆڕینی ناو`,
        onClick: () => openDialog("name"),
        loading: false,
      },
      {
        id: 2,
        icon: <KeyRound size={`20`} />,
        text: `گۆڕینی وشەی نهێنی`,
        onClick: () => openDialog("password"),
        loading: false,
      },
      {
        id: 3,
        icon: <Power size={`20`} />,
        text: `چوونەدەر`,
        color: "red",
        onClick: () => mutateAsync(),
        loading: isPending,
      },
    ],
    []
  );
  return (
    <>
      <Container
        as={`header`}
        className="w-full flex flex-row bg-transparent justify-between items-center gap-10">
        <h1 className="font-bold text-lg lg:text-[26px] text-black-500 text-nowrap">
          {import.meta.env.VITE_COMPANY_NAME}
        </h1>

        <div className="flex flex-row justify-center items-start gap-10">
          {headerItems.map((val: HeaderItem, _index: number) => (
            <div
              key={val.id}
              className="hidden lg:flex flex-row justify-center items-center gap-3">
              <p
                dir="ltr"
                className="text-black-500 font-[600] text-md font-poppins">
                {val.text}
              </p>
              <Image
                height={30}
                width={30}
                loading="lazy"
                className="object-cover relative"
                image={val.icon}
                alt={val.text}
              />
            </div>
          ))}

          <div className="flex flex-row justify-center items-center gap-5">
            <div className="flex flex-col justify-start items-end">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row gap-2 !font-poppins focus:outline-none">
                  <ChevronDown />{" "}
                  <Typography text={user.full_name}>
                    <p className="text-sm md:text-md">{user.full_name}</p>
                  </Typography>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!font-rabar007 !text-right mt-5">
                  {dropdownItems.map((val: DropDownItem, _index: number) => (
                    <DropdownMenuItem
                      disabled={val.loading}
                      onClick={val.onClick}
                      key={val.id}
                      className={`!justify-end flex flex-row gap-2 focus:outline-none ${
                        val.color === "red" &&
                        "text-red-500 hover:!text-red-500"
                      }`}>
                      {val.text} {val.icon}
                    </DropdownMenuItem>
                  ))}
                  {headerItems.map((val: HeaderItem, _index: number) => (
                    <DropdownMenuItem
                      key={val.id}
                      className="flex lg:hidden flex-row justify-end items-center gap-3">
                      <p
                        dir="ltr"
                        className="text-black-500 font-[500] text-sm font-poppins">
                        {val.text}
                      </p>
                      <Image
                        height={20}
                        width={20}
                        loading="lazy"
                        className="object-cover relative"
                        image={val.icon}
                        alt={val.text}
                      />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Badge
                variant="default"
                className=" text-sm p-1 md:px-2  text-white font-light hover:bg-black">
                {user.role_name}
              </Badge>
            </div>
            <Avatar className="border-[1px] border-solid border-black-500">
              <AvatarImage
                className="object-cover"
                height={30}
                width={30}
                alt={user.full_name}
                src={`/images/logo.jpg`}
              />
              <AvatarFallback>
                {user.full_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </Container>
      {isNameDialogOpen && (
        <Dialog
          className="!p-5 !rounded-xl !overflow-hidden"
          maxWidth={400}
          maxHeight={`fit`}
          isOpen={isNameDialogOpen}
          onClose={() => closeDialog("name")}>
          <ChangeNameForm onClose={() => closeDialog("name")} />
          <button
            name="closeNameDialogButton"
            onClick={() => closeDialog("name")}
            type="button"
            className="w-full  mt-2 bg-red-600 rounded-sm p-3 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-rabar007">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
      {isPassDialogOpen && (
        <Dialog
          className="!p-5 !rounded-xl !overflow-hidden"
          maxWidth={300}
          maxHeight={`fit`}
          isOpen={isPassDialogOpen}
          onClose={() => closeDialog("password")}>
          <ChangePasswordForm onClose={() => closeDialog("password")} />
          <button
            name="closePasswordDialogButton"
            onClick={() => closeDialog("password")}
            type="button"
            className="w-full  mt-2 bg-red-600 rounded-sm p-3 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-rabar007">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
    </>
  );
};

export default Header;
