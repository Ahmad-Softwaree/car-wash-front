import Image from "@/components/ui/Image";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import { Link, NavLink } from "react-router-dom";
import { ReactElement, useState } from "react";
import {
  Car,
  CarFront,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardPlus,
  Database,
  Gauge,
  HandCoins,
  Key,
  LoaderPinwheel,
  LogOut,
  Palette,
  ReceiptText,
  User,
  UserCog,
  Users,
} from "lucide-react";
import Tooltip from "@mui/joy/Tooltip";
import { useAuthContext } from "@/context/AuthContext";

import { useLogout } from "@/lib/react-query/query/auth.query";
import { Part } from "@/types/part";

import { SideLink } from "@/types/global";

export const sideLinks: SideLink[] = [
  {
    id: crypto.randomUUID() as string,
    icon: <Gauge />,
    name: "داشبۆرد",
    link: "/داشبۆرد",
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Database />,
    name: "کۆگا",
    link: "/کۆگا",
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <ReceiptText />,
    name: "پسولەکان",
    link: "/پسولەکان",
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <ReceiptText />,
    name: "دروستکردنی پسولە",
    link: "/دروستکردنی_پسولە",
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <UserCog />,
    name: "بەکارهێنەران",
    link: "/بەکارهێنەران",
    type: "manage",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Users />,
    name: "کڕیارەکان",
    link: "/کڕیارەکان",
    type: "manage",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <CircleDollarSign />,
    name: "خەرجی",
    link: "/خەرجی",
    type: "report",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <ClipboardPlus />,
    name: "ڕاپۆرتەکان",
    link: "/ڕاپۆرتەکان",
    type: "report",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <Key />,
    name: "ڕۆڵەکان",
    link: "/ڕۆڵەکان",
    type: "setting",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Palette />,
    name: "ڕەنگەکان",
    link: "/ڕەنگەکان",
    type: "setting",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <Car />,
    name: "جۆرەکانی ئۆتۆمبێل",
    link: "/جۆرەکانی ئۆتۆمبێل",
    type: "setting",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <CarFront />,
    name: "مۆدێلەکانی ئۆتۆمبێل",
    link: "/مۆدێلەکانی ئۆتۆمبێل",
    type: "setting",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <LoaderPinwheel />,
    name: "خزمەتگوزاریەکان",
    link: "/خزمەتگوزاریەکان",
    type: "setting",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <HandCoins />,
    name: "جۆرەکانی خەرجی",
    link: "/جۆرەکانی خەرجی",
    type: "setting",
  },
];

const Sidebar = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const { mutateAsync, isPending } = useLogout();

  const {
    state: { user },
  } = useAuthContext();

  let userParts: string[] = user?.parts.map(
    (val: Part, _index: number) => val.name
  );

  const Item = ({
    Icon,
    link,
    text,
  }: {
    Icon: ReactElement;
    link: string;
    text: string;
  }) => {
    return (
      userParts.includes(text) && (
        <NavLink
          className="w-full !text-white flex flex-row justify-start items-center gap-3 transition-all duration-200 hover:!bg-white hover:!bg-opacity-20 p-2 rounded-md"
          to={link}>
          {Icon}
          <p className="!text-xs">{text}</p>
        </NavLink>
      )
    );
  };

  return (
    <>
      {!expand && (
        <ChevronLeft
          onClick={() => setExpand(true)}
          className={`
           right-0
          top-0 bottom-0  my-auto fixed z-[1000] text-red-500 bg-primary-500 p-2 flex lg:hidden rounded-lg cursor-pointer w-12 h-12`}
        />
      )}
      {expand && (
        <ChevronRight
          onClick={() => setExpand(false)}
          className={`
           right-[210px]
          top-0 bottom-0  my-auto fixed z-[1000] text-red-500 bg-primary-500 p-2 flex lg:hidden rounded-lg cursor-pointer w-12 h-12`}
        />
      )}
      <aside
        className={`z-[100] h-full fixed ${
          expand ? "right-0" : "-right-full"
        } lg:right-0 transition-all duration-500 bg-primary-500 top-0 bottom-0 w-[250px]bg-primary-600 border-l-2 p-4 border-solid border-primary-300 border-opacity-40 flex flex-col justify-start items-center gap-2 overflow-y-auto`}>
        <Link to={`/داشبۆرد`} className="w-full mb-3">
          <Card
            size="sm"
            className="w-full !bg-primary-600 !border-2 !border-solid !border-primary-300 !border-opacity-40 !flex !flex-row !justify-center !items-center !gap-5">
            <Image
              image="/images/logo.jpg"
              className="w-10 h-10 rounded-full"
            />
            <p className="!text-sm !text-white !font-bukra">
              {import.meta.env.VITE_COMPANY_NAME}
            </p>
          </Card>
        </Link>

        <Divider>
          <Chip
            className="!font-bukra"
            variant="soft"
            color="neutral"
            size="sm">
            گشتی
          </Chip>
        </Divider>
        <div className="mt-3"></div>
        {sideLinks
          .filter((val: SideLink, _index: number) => val.type == "general")
          .map((val: SideLink, _index: number) => (
            <Item
              key={val.id}
              Icon={val.icon}
              link={val.link}
              text={val.name}
            />
          ))}

        <div className="mt-3"></div>
        <Divider>
          <Chip
            className="!font-bukra"
            variant="soft"
            color="neutral"
            size="sm">
            بەڕێوەبردن
          </Chip>
        </Divider>
        <div className="mt-3"></div>

        {sideLinks
          .filter((val: SideLink, _index: number) => val.type == "manage")
          .map((val: SideLink, _index: number) => (
            <Item
              key={val.id}
              Icon={val.icon}
              link={val.link}
              text={val.name}
            />
          ))}

        <div className="mt-3"></div>
        <Divider>
          <Chip
            className="!font-bukra"
            variant="soft"
            color="neutral"
            size="sm">
            ڕاپۆرتەکان
          </Chip>
        </Divider>
        <div className="mt-3"></div>

        {sideLinks
          .filter((val: SideLink, _index: number) => val.type == "report")
          .map((val: SideLink, _index: number) => (
            <Item
              key={val.id}
              Icon={val.icon}
              link={val.link}
              text={val.name}
            />
          ))}

        <div className="mt-3"></div>
        <Divider>
          <Chip
            className="!font-bukra"
            variant="soft"
            color="neutral"
            size="sm">
            ڕێکخستن
          </Chip>
        </Divider>
        <div className="mt-3"></div>

        {sideLinks
          .filter((val: SideLink, _index: number) => val.type == "setting")
          .map((val: SideLink, _index: number) => (
            <Item
              key={val.id}
              Icon={val.icon}
              link={val.link}
              text={val.name}
            />
          ))}

        <div className="mt-3"></div>
        <Divider>
          <Chip
            className="!font-bukra"
            variant="soft"
            color="neutral"
            size="sm">
            پڕۆفایل
          </Chip>
        </Divider>
        <div className="mt-3"></div>
        <div className="w-full mb-3">
          <Card
            size="sm"
            className="w-full !bg-primary-600 !border-2 !border-solid !border-primary-300 !border-opacity-40 !flex !flex-row !justify-between !items-center !gap-2 !text-white">
            <Tooltip
              placement="top"
              color="neutral"
              title="بینینی پڕۆفایل"
              variant="soft">
              <Link
                to={`/پڕۆفایل`}
                className="flex flex-col justify-start items-start gap-2">
                <p className="!text-xs !text-white !font-bukra">
                  {user?.username}
                </p>
                <div className="flex flex-row justify-start items-center gap-2">
                  <p className="!text-xs !text-white !font-bukra">
                    {user?.name}
                  </p>
                  <Chip color="danger" variant="soft">
                    {user?.role_name}
                  </Chip>
                </div>
              </Link>
            </Tooltip>
            <Tooltip
              placement="top"
              color="danger"
              title="چوونەدەر"
              variant="soft">
              <button
                title="چوونەدەر"
                type="button"
                onClick={() => mutateAsync()}
                className="text-red-400 hover:!bg-opacity-50 !transition-all !duration-200 !font-bukra !text-xs">
                <LogOut />
              </button>
            </Tooltip>
          </Card>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
