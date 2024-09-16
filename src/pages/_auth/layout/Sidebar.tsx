import Image from "@/components/ui/Image";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ReactElement, useState } from "react";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
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
  PackageSearch,
  Palette,
  Presentation,
  ReceiptText,
  UserCog,
  Users,
} from "lucide-react";
import Tooltip from "@mui/joy/Tooltip";
import { useAuthContext } from "@/context/AuthContext";

import { useLogout } from "@/lib/react-query/query/auth.query";
import { Part } from "@/types/part";

import { SideLink } from "@/types/global";
import { ENUMs } from "@/lib/enum";

export const sideLinks: SideLink[] = [
  //GENERAL
  {
    id: crypto.randomUUID() as string,
    icon: <Gauge />,
    name: ENUMs.DASHBOARD_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${
      ENUMs.DASHBOARD_PART as string
    }`,
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Presentation />,
    name: ENUMs.RESERVATION_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${
      ENUMs.RESERVATION_PART as string
    }`,
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Database />,
    name: ENUMs.KOGA_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${ENUMs.KOGA_PART as string}`,
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <ReceiptText />,
    name: ENUMs.SELL_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${ENUMs.SELL_PART as string}`,
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <ReceiptText />,
    name: ENUMs.CREATE_PSULA_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${
      ENUMs.CREATE_PSULA_PART as string
    }`,
    type: "general",
  },
  //MANAGE
  {
    id: crypto.randomUUID() as string,
    icon: <UserCog />,
    name: ENUMs.USERS_PART as string,
    link: `/${ENUMs.MANAGE_SECTION as string}/${ENUMs.USERS_PART as string}`,
    type: "manage",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Users />,
    name: ENUMs.CUSTOMER_PART as string,
    link: `/${ENUMs.MANAGE_SECTION as string}/${ENUMs.CUSTOMER_PART as string}`,
    type: "manage",
  },
  //REPORT
  {
    id: crypto.randomUUID() as string,
    icon: <CircleDollarSign />,
    name: ENUMs.EXPENSE_PART as string,
    link: `/${ENUMs.REPORT_SECTION as string}/${ENUMs.EXPENSE_PART as string}`,
    type: "report",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <ClipboardPlus />,
    name: ENUMs.REPORT_PART as string,
    link: `/${ENUMs.REPORT_SECTION as string}/${ENUMs.REPORT_PART as string}`,
    type: "report",
  },
  //SETTING
  {
    id: crypto.randomUUID() as string,
    icon: <Key />,
    name: ENUMs.ROLE_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${ENUMs.ROLE_PART as string}`,
    type: "setting",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Palette />,
    name: ENUMs.COLOR_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${ENUMs.COLOR_PART as string}`,
    type: "setting",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <Car />,
    name: ENUMs.CAR_TYPE_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${
      ENUMs.CAR_TYPE_PART as string
    }`,
    type: "setting",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <PackageSearch />,
    name: ENUMs.ITEM_TYPE_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${
      ENUMs.ITEM_TYPE_PART as string
    }`,
    type: "setting",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <CarFront />,
    name: ENUMs.CAR_MODEL_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${
      ENUMs.CAR_MODEL_PART as string
    }`,
    type: "setting",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <LoaderPinwheel />,
    name: ENUMs.SERVICE_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${ENUMs.SERVICE_PART as string}`,
    type: "setting",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <HandCoins />,
    name: ENUMs.EXPENSE_TYPE_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${
      ENUMs.EXPENSE_TYPE_PART as string
    }`,
    type: "setting",
  },
  //DELETED
  {
    id: crypto.randomUUID() as string,
    icon: <UserCog />,
    name: ENUMs.USERS_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${ENUMs.USERS_PART as string}`,
    type: "deleted",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Users />,
    name: ENUMs.CUSTOMER_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${
      ENUMs.CUSTOMER_PART as string
    }`,
    type: "deleted",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Database />,
    name: ENUMs.KOGA_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${ENUMs.KOGA_PART as string}`,
    type: "deleted",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <ReceiptText />,
    name: ENUMs.SELL_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${ENUMs.SELL_PART as string}`,
    type: "deleted",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <CircleDollarSign />,
    name: ENUMs.EXPENSE_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${ENUMs.EXPENSE_PART as string}`,
    type: "deleted",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <ClipboardPlus />,
    name: ENUMs.REPORT_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${ENUMs.REPORT_PART as string}`,
    type: "deleted",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <Key />,
    name: ENUMs.ROLE_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${ENUMs.ROLE_PART as string}`,
    type: "deleted",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Palette />,
    name: ENUMs.COLOR_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${ENUMs.COLOR_PART as string}`,
    type: "deleted",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <Car />,
    name: ENUMs.CAR_TYPE_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${
      ENUMs.CAR_TYPE_PART as string
    }`,
    type: "deleted",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <PackageSearch />,
    name: ENUMs.ITEM_TYPE_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${
      ENUMs.ITEM_TYPE_PART as string
    }`,
    type: "deleted",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <CarFront />,
    name: ENUMs.CAR_MODEL_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${
      ENUMs.CAR_MODEL_PART as string
    }`,
    type: "deleted",
  },

  {
    id: crypto.randomUUID() as string,
    icon: <LoaderPinwheel />,
    name: ENUMs.SERVICE_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${ENUMs.SERVICE_PART as string}`,
    type: "deleted",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <HandCoins />,
    name: ENUMs.EXPENSE_TYPE_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${
      ENUMs.EXPENSE_TYPE_PART as string
    }`,
    type: "deleted",
  },
];

const Sidebar = () => {
  let path = useLocation()
    .pathname.split("/")
    .map((val) => decodeURIComponent(val));

  const [index, setIndex] = useState<number | null>(
    path.includes(ENUMs.GENERAL_SECTION as string)
      ? 0
      : path.includes(ENUMs.MANAGE_SECTION as string)
      ? 1
      : path.includes(ENUMs.REPORT_SECTION as string)
      ? 2
      : path.includes(ENUMs.SETTING_SECTION as string)
      ? 3
      : path.includes(ENUMs.DELETED_SECTION as string)
      ? 4
      : 0
  );
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
      userParts?.includes(text) && (
        <NavLink
          className="!font-bukra w-full !text-white bg-transparent flex flex-row justify-start items-center gap-3 transition-all duration-200 hover:!bg-white hover:!bg-opacity-20 p-2 rounded-md my-1"
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
        } lg:right-0 transition-all duration-500 bg-primary-500 top-0 bottom-0 w-[250px]  border-l-2 p-4 border-solid border-primary-300 border-opacity-40 flex flex-col justify-start items-center gap-2 overflow-y-auto`}>
        <Link
          to={`/${ENUMs.GENERAL_SECTION}/${ENUMs.DASHBOARD_PART}`}
          className="w-full mb-3">
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
        <AccordionGroup sx={{ maxWidth: 400 }} transition="0.2s ease">
          <>
            <Accordion
              expanded={index === 0}
              onChange={(event, expanded) => {
                setIndex(expanded ? 0 : null);
              }}>
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm">
                  گشتی
                </Chip>
              </AccordionSummary>

              <AccordionDetails>
                {" "}
                {sideLinks
                  .filter(
                    (val: SideLink, _index: number) => val.type == "general"
                  )
                  .map((val: SideLink, _index: number) => (
                    <Item
                      key={val.id}
                      Icon={val.icon}
                      link={val.link}
                      text={val.name}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={index === 1}
              onChange={(event, expanded) => {
                setIndex(expanded ? 1 : null);
              }}
              defaultExpanded>
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm">
                  بەڕێوەبردن
                </Chip>
              </AccordionSummary>

              <AccordionDetails>
                {" "}
                {sideLinks
                  .filter(
                    (val: SideLink, _index: number) => val.type == "manage"
                  )
                  .map((val: SideLink, _index: number) => (
                    <Item
                      key={val.id}
                      Icon={val.icon}
                      link={val.link}
                      text={val.name}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={index === 2}
              onChange={(event, expanded) => {
                setIndex(expanded ? 2 : null);
              }}
              defaultExpanded>
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm">
                  ڕاپۆرت
                </Chip>
              </AccordionSummary>

              <AccordionDetails>
                {" "}
                {sideLinks
                  .filter(
                    (val: SideLink, _index: number) => val.type == "report"
                  )
                  .map((val: SideLink, _index: number) => (
                    <Item
                      key={val.id}
                      Icon={val.icon}
                      link={val.link}
                      text={val.name}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={index === 3}
              onChange={(event, expanded) => {
                setIndex(expanded ? 3 : null);
              }}
              defaultExpanded>
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm">
                  ڕێکخستن
                </Chip>
              </AccordionSummary>

              <AccordionDetails>
                {" "}
                {sideLinks
                  .filter(
                    (val: SideLink, _index: number) => val.type == "setting"
                  )
                  .map((val: SideLink, _index: number) => (
                    <Item
                      key={val.id}
                      Icon={val.icon}
                      link={val.link}
                      text={val.name}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={index === 4}
              onChange={(event, expanded) => {
                setIndex(expanded ? 4 : null);
              }}
              defaultExpanded>
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm">
                  سڕاوەکان
                </Chip>
              </AccordionSummary>

              <AccordionDetails>
                {" "}
                {sideLinks
                  .filter(
                    (val: SideLink, _index: number) => val.type == "deleted"
                  )
                  .map((val: SideLink, _index: number) => (
                    <Item
                      key={val.id}
                      Icon={val.icon}
                      link={val.link}
                      text={val.name}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
            <div className="my-4"></div>

            <Divider>
              <Chip
                className="!font-bukra"
                variant="soft"
                color="neutral"
                size="sm">
                پڕۆفایل
              </Chip>
            </Divider>
            <div className="w-full mt-3">
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
                    <p className="!text-xs !text-white !font-bukra">
                      {user?.name}
                    </p>
                    <Chip color="danger" variant="soft">
                      {user?.role_name}
                    </Chip>
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
          </>
        </AccordionGroup>
      </aside>
    </>
  );
};

export default Sidebar;
