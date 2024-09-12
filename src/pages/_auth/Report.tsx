import CreditCard from "@/components/cards/CreditCard";
import MostItemCard from "@/components/cards/MostItemCard";
import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";
import Loading from "@/components/ui/Loading";
import useWindowSize from "@/hooks/useWindowSize";
import {
  useGetReportMoneyData,
  useGetReportMostOrder,
  useGetReportMostItem,
} from "@/lib/react-query/query/case.query";
import { Item } from "@/types";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Report = () => {
  const defaultDate: string = "2024-01-08";
  const [from, setFrom] = useState<Date | string>("");
  const [to, setTo] = useState<Date | string>("");

  const {
    refetch: reportMoneyRefetch,
    data: reportMoney,
    isLoading: reportMoneyLoading,
  } = useGetReportMoneyData(from || "", to || "");

  const {
    refetch: reportMostItemRefetch,
    data: reportItem,
    isLoading: reportItemLoading,
  } = useGetReportMostItem(from || "", to || "");

  const {
    refetch: reportMostOrderRefetch,
    data: reportOrder,
    isLoading: reportOrderLoading,
  } = useGetReportMostOrder(from || "", to || "");

  useEffect(() => {
    reportMoneyRefetch();
    reportMostItemRefetch();
    reportMostOrderRefetch();
  }, [from, to]);
  const { windowX } = useWindowSize();

  return (
    <Container
      as={`div`}
      className="w-full gap-10 flex flex-col justify-start items-start ">
      <Return>ڕاپۆرتەکان</Return>
      <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
        <p className="text-md font-bukra">بەروار</p>
        <InputGroup className="!p-1 md:!p-3 text-input">
          <Input
            value={from !== "" ? from.toLocaleString() : defaultDate}
            onChange={useCallback((e: any) => setFrom(e.target.value), [from])}
            id="date-1"
            type="date"
          />
        </InputGroup>

        <p className="text-md font-bukra">بۆ</p>
        <InputGroup className="!p-1 md:!p-3 text-input">
          <Input
            value={to !== "" ? to.toLocaleString() : defaultDate}
            onChange={useCallback((e: any) => setTo(e.target.value), [to])}
            id="date-2"
            type="date"
          />
        </InputGroup>

        <RefreshCcw
          className="cursor-pointer"
          onClick={() => {
            setFrom(defaultDate);
            setTo(defaultDate);
          }}
        />
      </div>
      {reportMoneyLoading ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : reportMoney ? (
        <>
          <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
            <CreditCard title="داهات" color="green">
              {reportMoney?.money}
            </CreditCard>
            <CreditCard title="خەرجی" color="purple">
              {reportMoney?.expense}
            </CreditCard>
            <CreditCard title="بڕی پارەی قەرز" color="pink">
              {reportMoney?.dept}
            </CreditCard>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
            {" "}
            <CreditCard type="small" title="بڕی پارەی قەرز" color="gray">
              {reportMoney?.dept_psula}
            </CreditCard>
            <CreditCard type="small" title="بڕی پارەی قەرز" color="gray">
              {reportMoney?.naqd_psula}
            </CreditCard>
            <CreditCard type="small" title="بڕی پارەی قەرز" color="gray">
              {reportMoney?.wasl_psula}
            </CreditCard>
            <CreditCard type="small" title="بڕی پارەی قەرز" color="gray">
              {reportMoney?.new_customers}
            </CreditCard>
            <CreditCard type="small" title="بڕی پارەی قەرز" color="gray">
              {reportMoney?.dept_amount}
            </CreditCard>
          </div>
        </>
      ) : null}
      <div className="my-10 w-full h-[2px] rounded-full bg-gray-500 bg-opacity-50"></div>
      <p className="font-bold text-md md:text-xl font-bukra whitespace-nowrap">
        زۆرترین کاڵای فرۆشراو
      </p>
      {reportItemLoading ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : reportItem ? (
        <div className="w-full flex flex-row justify-start items-start gap-4 flex-wrap">
          {reportItem.map((val: Item, index: number) => (
            <MostItemCard key={val.id} {...val} />
          ))}
        </div>
      ) : null}
      <div className="my-10 w-full h-[2px] rounded-full bg-gray-500 bg-opacity-50"></div>
      <p className="font-bold text-md md:text-xl font-bukra whitespace-nowrap">
        ١٠ زۆرترین داواکاری
      </p>

      {reportOrderLoading ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : reportOrder ? (
        <div dir="ltr">
          <PieChart
            colors={[
              "red",
              "green",
              "brown",
              "blue",
              "yellow",
              "pink",
              "orange",
              "black",
              "purple",
              "grey",
            ]}
            className="!w-full"
            series={[
              {
                data: reportOrder,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 3,
                cornerRadius: 6,
                startAngle: -180,
                endAngle: 180,
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 1,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: "14px",
              },
            }}
            width={windowX}
            height={500}
          />
        </div>
      ) : null}
    </Container>
  );
};

export default Report;
