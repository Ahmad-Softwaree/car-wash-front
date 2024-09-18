import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, LucideCircleGauge } from "lucide-react";
import { Chip } from "@mui/joy";
import { useGetPanelReservation } from "@/lib/react-query/query/reservation.query";
import Loading from "../ui/Loading";
import { TailSpin } from "react-loader-spinner";
import { PanelReservation } from "@/types/reservation";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import Dialog from "./Dialog";
import CustomClose from "./CustomClose";
import ReservationModal from "./ReservationModal";

type CalenderDataType = {
  day: number;
  data: PanelReservation[];
};

// Helper function to get number of days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar: React.FC = () => {
  const [monthOpen, setMonthOpen] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const today = new Date();
  const [daysGrid, setDaysGrid] = useState<JSX.Element[]>([]);
  const [calenderData, setCalenderData] = useState<CalenderDataType[]>([]);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentDay, setCurrentDay] = useState(today.getDay());
  const selectedDate = new Date(currentYear, currentMonth, 1);

  const { data, isLoading, isPending, refetch, isError } =
    useGetPanelReservation(selectedDate);

  // Update calendar data and daysGrid when new data is fetched or month/year changes
  useEffect(() => {
    if (data) {
      const updatedCalenderData: CalenderDataType[] = [];
      data.forEach((val: PanelReservation) => {
        const date = new Date(val.date_time);
        const day = date.getUTCDate();
        const index = updatedCalenderData.findIndex(
          (calenderEntry: CalenderDataType) => calenderEntry.day === day
        );

        if (index !== -1) {
          updatedCalenderData[index].data.push(val);
        } else {
          updatedCalenderData.push({
            day,
            data: [val],
          });
        }
      });

      setCalenderData(updatedCalenderData);

      // Generate daysGrid based on updated calenderData
      const newDaysGrid = Array.from(
        { length: getDaysInMonth(currentYear, currentMonth) },
        (_, i) => {
          const day = i + 1;
          const calenderDataDays = updatedCalenderData.map(
            (val: CalenderDataType) => val.day
          );
          const include = calenderDataDays.includes(day);
          const customers: PanelReservation[] =
            updatedCalenderData.find((val: CalenderDataType) => val.day === day)
              ?.data || [];

          return (
            <article
              onClick={() => {
                if (include) {
                  setSearchParam((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set(
                      ENUMs.RESERVATION_PARAM as string,
                      customers[0].date_time.toLocaleString()
                    );
                    return params;
                  });
                  setMonthOpen(true);
                }
              }}
              key={day}
              className={`cursor-pointer col-span-2 dark-light rounded-md h-[200px] flex items-center justify-center border bg-gray-100 text-sm transition-all duration-300  ${
                include
                  ? "border-yellow-500 hover:scale-125"
                  : "cursor-not-allowed"
              }`}>
              {!include ? (
                <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                  <p className="text-center text-xl">{day}</p>
                  <p className="text-xl">سەرە نیە</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                  <p className="text-center text-xl">{day}</p>
                  {customers.map((val: PanelReservation) => {
                    const date = new Date(val.date_time);
                    const hours = date
                      .getUTCHours()
                      .toString()
                      .padStart(2, "0");
                    const minutes = date
                      .getUTCMinutes()
                      .toString()
                      .padStart(2, "0");
                    const timeString = `${hours}:${minutes}`;
                    return (
                      <div
                        className="w-full flex flex-row justify-center items-center gap-2"
                        key={val.id}>
                        <Chip variant="soft" color="primary">
                          <p>{timeString}</p>
                        </Chip>
                        <Chip variant="soft" color="primary">
                          <p>{val.customer_name}</p>
                        </Chip>
                        <Chip variant="soft" color="primary">
                          <p>{val.id}</p>
                        </Chip>
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          );
        }
      );

      setDaysGrid(newDaysGrid);
    }
  }, [data, currentMonth, currentYear]);

  useEffect(() => {
    if (!isError) {
      refetch();
    }
  }, [selectedDate, isError]);
  // Month names for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Handle previous month click
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  // Handle next month click
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  // Number of days in the current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  return (
    <>
      <div className="w-full flex flex-col gap-5 justify-center items-center">
        {/* Month and Year Display with Navigation */}
        <div className="w-full flex flex-row justify-center items-center gap-10">
          <Chip variant="soft" color="neutral">
            <ChevronRight
              onClick={handleNextMonth}
              className="cursor-pointer w-12 h-12"
            />
          </Chip>
          <p className="text-2xl">
            {daysOfWeek[currentDay]} {monthNames[currentMonth]} {currentYear}
          </p>
          <Chip variant="soft" color="neutral">
            <ChevronLeft
              onClick={handlePreviousMonth}
              className="cursor-pointer w-12 h-12"
            />
          </Chip>{" "}
        </div>

        {/* Days Grid */}
        {isLoading || isPending ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : (
          <div className="w-full grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 rounded-md gap-2">
            {daysGrid}
          </div>
        )}
      </div>
      {monthOpen && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={2000}
          maxHeight={`90%`}
          isOpen={monthOpen}
          onClose={() => setMonthOpen(false)}>
          <CustomClose
            onClick={() => {
              setSearchParam((prev) => {
                const params = new URLSearchParams(prev);
                params.delete(ENUMs.RESERVATION_PARAM as string);
                return params;
              });
              setMonthOpen(false);
            }}
          />
          <ReservationModal onClose={() => setMonthOpen(false)} />
        </Dialog>
      )}
    </>
  );
};

export default Calendar;
