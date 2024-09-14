import React, { useEffect } from "react";
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
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import { formatDateToDDMMYY } from "@/lib/functions";
const DatePicker = () => {
  const [date, setDate] = React.useState<Date>();
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    if (date) {
      setSearchParam((prev) => {
        const params = new URLSearchParams(prev);
        params.set(
          ENUMs.DATE_PARAM as string,
          formatDateToDDMMYY(date.toISOString())
        );
        return params;
      });
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] hidden md:flex justify-start text-left font-normal gap-2 dark-light    default-border",
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
      <PopoverContent className="w-auto p-0  dark-light">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
