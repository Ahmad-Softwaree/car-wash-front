import Image from "@/components/ui/Image";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
import {
  AlignJustify,
  Bolt,
  Car,
  CarFront,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CircleMinus,
  Database,
  DatabaseBackup,
  Gauge,
  HandCoins,
  HardDrive,
  Images,
  Key,
  LoaderPinwheel,
  LogOut,
  PackageSearch,
  Palette,
  Presentation,
  Receipt,
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
import { CardContent, CircularProgress } from "@mui/joy";
import { useGetFirebaseSize } from "@/lib/react-query/query/firebase.query";

export const sideLinks: SideLink[] = [
  //BACKUP
  {
    id: crypto.randomUUID() as string,
    icon: <DatabaseBackup />,
    name: ENUMs.NORMAL_BACKUP_PART as string,
    link: `/${ENUMs.BACKUP_SECTION as string}/${
      ENUMs.NORMAL_BACKUP_PART as string
    }`,
    type: "backup",
  },

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
    icon: <Users />,
    name: ENUMs.CUSTOMER_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${
      ENUMs.CUSTOMER_PART as string
    }`,
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-cash-register"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M21 15h-2.5c-.398 0 -.779 .158 -1.061 .439c-.281 .281 -.439 .663 -.439 1.061c0 .398 .158 .779 .439 1.061c.281 .281 .663 .439 1.061 .439h1c.398 0 .779 .158 1.061 .439c.281 .281 .439 .663 .439 1.061c0 .398 -.158 .779 -.439 1.061c-.281 .281 -.663 .439 -1.061 .439h-2.5" />
        <path d="M19 21v1m0 -8v1" />
        <path d="M13 21h-7c-.53 0 -1.039 -.211 -1.414 -.586c-.375 -.375 -.586 -.884 -.586 -1.414v-10c0 -.53 .211 -1.039 .586 -1.414c.375 -.375 .884 -.586 1.414 -.586h2m12 3.12v-1.12c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-2" />
        <path d="M16 10v-6c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-4c-.53 0 -1.039 .211 -1.414 .586c-.375 .375 -.586 .884 -.586 1.414v6m8 0h-8m8 0h1m-9 0h-1" />
        <path d="M8 14v.01" />
        <path d="M8 17v.01" />
        <path d="M12 13.99v.01" />
        <path d="M12 17v.01" />
      </svg>
    ),
    name: ENUMs.CREATE_PSULA_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${
      ENUMs.CREATE_PSULA_PART as string
    }`,
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
    icon: <CircleDollarSign />,
    name: ENUMs.EXPENSE_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${ENUMs.EXPENSE_PART as string}`,
    type: "general",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <CircleMinus />,
    name: ENUMs.LESS_ITEM_PART as string,
    link: `/${ENUMs.GENERAL_SECTION as string}/${
      ENUMs.LESS_ITEM_PART as string
    }`,
    type: "general",
  },
  //REPORT
  {
    id: crypto.randomUUID() as string,
    icon: <Presentation />,

    name: ENUMs.RESERVATION_REPORT_PART as string,
    link: `/${ENUMs.REPORT_SECTION as string}/${
      ENUMs.RESERVATION_REPORT_PART as string
    }`,
    type: "report",
  },
  {
    id: crypto.randomUUID() as string,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-chart-infographic"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M7 3v4h4" />
        <path d="M9 17l0 4" />
        <path d="M17 14l0 7" />
        <path d="M13 13l0 8" />
        <path d="M21 12l0 9" />
      </svg>
    ),
    name: ENUMs.SELL_REPORT_PART as string,
    link: `/${ENUMs.REPORT_SECTION as string}/${
      ENUMs.SELL_REPORT_PART as string
    }`,
    type: "report",
  },

  {
    id: crypto.randomUUID() as string,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-file-database"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12.75m-4 0a4 1.75 0 1 0 8 0a4 1.75 0 1 0 -8 0" />
        <path d="M8 12.5v3.75c0 .966 1.79 1.75 4 1.75s4 -.784 4 -1.75v-3.75" />
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      </svg>
    ),
    name: ENUMs.KOGA_REPORT_PART as string,
    link: `/${ENUMs.REPORT_SECTION as string}/${
      ENUMs.KOGA_REPORT_PART as string
    }`,
    type: "report",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <Receipt />,
    name: ENUMs.PROFIT_REPORT_PART as string,
    link: `/${ENUMs.REPORT_SECTION as string}/${
      ENUMs.PROFIT_REPORT_PART as string
    }`,
    type: "report",
  },
  {
    id: crypto.randomUUID() as string,
    icon: <HandCoins />,
    name: ENUMs.EXPENSE_REPORT_PART as string,
    link: `/${ENUMs.REPORT_SECTION as string}/${
      ENUMs.EXPENSE_REPORT_PART as string
    }`,
    type: "report",
  },
  {
    id: crypto.randomUUID() as string,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-moneybag"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5z" />
        <path d="M4 17v-1a8 8 0 1 1 16 0v1a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
      </svg>
    ),
    name: ENUMs.CASE_REPORT_PART as string,
    link: `/${ENUMs.REPORT_SECTION as string}/${
      ENUMs.CASE_REPORT_PART as string
    }`,
    type: "report",
  },
  //SETTING
  {
    id: crypto.randomUUID() as string,
    icon: <UserCog />,
    name: ENUMs.USERS_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${ENUMs.USERS_PART as string}`,
    type: "setting",
  },
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

  {
    id: crypto.randomUUID() as string,
    icon: <Bolt />,
    name: ENUMs.CONFIG_PART as string,
    link: `/${ENUMs.SETTING_SECTION as string}/${ENUMs.CONFIG_PART as string}`,
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
    icon: <Presentation />,
    name: ENUMs.RESERVATION_PART as string,
    link: `/${ENUMs.DELETED_SECTION as string}/${
      ENUMs.RESERVATION_PART as string
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

const Sidebar = ({
  shrink,
  setShrink,
}: {
  shrink: boolean;
  setShrink: Dispatch<SetStateAction<boolean>>;
}) => {
  const location = useLocation();

  const { data } = useGetFirebaseSize();
  const totalStorageLimit = 5 * 1024 * 1024 * 1024; // 5 GB in bytes
  const [emptyStorage, setEmptyStorage] = useState<number>();
  useEffect(() => {
    if (data != undefined) {
      setEmptyStorage((totalStorageLimit - data) / (1024 * 1024 * 1024));
    }
  }, [data]);

  useEffect(() => {
    setExpand(false);
  }, [location.pathname]);

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
      : path.includes(ENUMs.BACKUP_SECTION as string)
      ? 5
      : 0
  );
  const [expand, setExpand] = useState<boolean>(false);

  const { mutateAsync, isPending } = useLogout();

  const {
    state: { user },
  } = useAuthContext();

  let userParts: string[] | undefined = user?.parts.map(
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
          className="!font-bukra w-full !text-white bg-transparent flex flex-row justify-start items-center gap-3 transition-all duration-200 hover:!bg-secondary-100 hover:!bg-opacity-20 p-2 rounded-md my-1"
          to={link}
        >
          {Icon}
          <p className={`!text-xs ${shrink && "hidden"}`}>{text}</p>
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
           right-[270px]
          top-0 bottom-0  my-auto fixed z-[1000] text-red-500 bg-primary-500 p-2 flex lg:hidden rounded-lg cursor-pointer w-12 h-12`}
        />
      )}
      <aside
        className={`z-[2000] h-full fixed ${
          expand ? "right-0" : "-right-full"
        } lg:right-0 transition-all duration-500 bg-primary-500 top-0 bottom-0 w-[280px]  border-l-2 p-4 border-solid border-primary-300 border-opacity-40 flex flex-col justify-start items-center gap-2 overflow-y-auto ${
          shrink && "!w-[80px] !border-none !bg-transparent"
        }`}
      >
        <div className={`w-full mb-3 ${shrink && "hidden"}`}>
          <Card
            size="sm"
            className="w-full !bg-primary-600 !border-2 !border-solid !border-primary-300 !border-opacity-40 !flex !flex-row !justify-center !items-center !gap-5"
          >
            <Image
              image={import.meta.env.VITE_COMPANY_LOGO}
              className="w-10 h-10 rounded-full"
            />
            <p className="!text-sm !text-white !font-bukra">
              {import.meta.env.VITE_COMPANY_NAME}
            </p>
            <AlignJustify
              onClick={() => {
                setShrink(true);
                localStorage.setItem("shrink", "yes");
              }}
              className="!text-white !bg-transparent p-2 w-12 h-12 cursor-pointer"
            />
          </Card>
        </div>
        <AlignJustify
          onClick={() => {
            setShrink(false);
            localStorage.setItem("shrink", "no");
          }}
          className={`light-dark rounded-full mt-3 p-2 w-12 h-12 cursor-pointer ${
            !shrink && "hidden"
          }`}
        />

        <AccordionGroup
          sx={{
            maxWidth: "240px",
            width: "240px",
            display: shrink ? "none" : "flex",
          }}
          transition="0.2s ease"
        >
          <>
            <Accordion
              expanded={index === 0}
              onChange={(event, expanded) => {
                setIndex(expanded ? 0 : null);
              }}
            >
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm"
                >
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
              expanded={index === 2}
              onChange={(event, expanded) => {
                setIndex(expanded ? 2 : null);
              }}
              defaultExpanded
            >
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm"
                >
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
              defaultExpanded
            >
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm"
                >
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
              defaultExpanded
            >
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm"
                >
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
            <Accordion
              expanded={index === 5}
              onChange={(event, expanded) => {
                setIndex(expanded ? 5 : null);
              }}
              defaultExpanded
            >
              <AccordionSummary>
                <Chip
                  className="!font-bukra my-3"
                  variant="soft"
                  color="neutral"
                  size="sm"
                >
                  باکئەپ
                </Chip>
              </AccordionSummary>

              <AccordionDetails>
                {sideLinks
                  .filter(
                    (val: SideLink, _index: number) => val.type == "backup"
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
                size="sm"
              >
                کۆگای وێنە
              </Chip>
            </Divider>
            <div className="my-2"></div>

            <Card variant="solid" color="warning" invertedColors>
              <CardContent orientation="horizontal">
                <CircularProgress size="lg" determinate value={data}>
                  <Images />
                </CircularProgress>
                <CardContent>
                  <p className="font-bukra text-sm">شوێنی بەتاڵ</p>
                  <p className="font-poppins text-xl font-bold">
                    {emptyStorage} GB
                  </p>
                </CardContent>
              </CardContent>
            </Card>
            <div className="my-4"></div>

            <Divider>
              <Chip
                className="!font-bukra"
                variant="soft"
                color="neutral"
                size="sm"
              >
                پڕۆفایل
              </Chip>
            </Divider>
            <div className="w-full mt-3">
              <Card
                size="sm"
                className="w-full !bg-primary-600 !border-2 !border-solid !border-primary-300 !border-opacity-40 !flex !flex-row !justify-between !items-center !gap-2 !text-white"
              >
                <Tooltip
                  placement="top"
                  color="neutral"
                  title="بینینی پڕۆفایل"
                  variant="soft"
                >
                  <Link
                    to={`/پڕۆفایل`}
                    className="flex flex-col justify-start items-start gap-2"
                  >
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
                  variant="soft"
                >
                  <button
                    title="چوونەدەر"
                    type="button"
                    onClick={() => mutateAsync()}
                    className="text-red-400 hover:!bg-opacity-50 !transition-all !duration-200 !font-bukra !text-xs"
                  >
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
