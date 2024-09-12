import Container from "@/components/ui/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ChevronLeft, SunMoon } from "lucide-react";
import { useLocation } from "react-router-dom"; // To get the current URL
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
const Header = () => {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const [date, setDate] = React.useState<Date>();
  return (
    <Container
      as={`header`}
      className="w-full flex flex-row bg-white dark:bg-primary-800 justify-between items-center gap-10 !text-primary-800 dark:!text-white">
      <Breadcrumbs
        separator={<ChevronLeft />}
        className="!text-primary-800 dark:!text-white"
        aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <span
              key={index}
              className="!text-primary-800 dark:!text-white !font-bukra !text-md !font-bold">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              key={index}
              className="!text-primary-800 dark:!text-white !font-bukra !text-md !text-opacity-50"
              underline="hover"
              href={breadcrumb.href}>
              {breadcrumb.label}
            </Link>
          );
        })}
      </Breadcrumbs>
      <div className="flex flex-row justify-center items-center gap-4">
        <SunMoon
          onClick={() => {
            let mode = document.getElementsByTagName("html")[0];
            mode.classList.toggle("dark");
          }}
          className="cursor-pointer"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] hidden md:flex justify-start text-left font-normal gap-2 !text-primary-800 dark:!text-white !bg-white dark:!bg-primary-500   !border-primary-300 !border-2 !border-opacity-40",
                !date && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="!text-xs ">بەروارێک هەڵبژێرە</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 !bg-white dark:!bg-primary-500 !text-primary-800 dark:!text-white">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </Container>
  );
};

export default Header;

function generateBreadcrumbs(pathname: string) {
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment);

    return { label, href };
  });

  return [...breadcrumbs];
}
