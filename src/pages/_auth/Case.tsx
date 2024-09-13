import CreditCard from "@/components/cards/CreditCard";
import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import TBody from "@/components/ui/TBody";
import {
  useGetCaseChart,
  useGetCaseHistory,
  useGetCaseMoney,
} from "@/lib/react-query/query/case.query";
import { TailSpin } from "react-loader-spinner";
import Loading from "@/components/ui/Loading";
import { CaseHistory } from "@/types/case";
import NoData from "@/components/shared/NoData";
import Pagination from "@/components/providers/Pagination";
import { useMemo } from "react";
import { formatDateToDDMMYY } from "@/lib/functions";
import FormatMoney from "@/components/shared/FormatMoney";
const Case = () => {
  const { data: caseMoney, isLoading: caseMoneyLoading } = useGetCaseMoney();

  const { data: caseChart, isLoading: caseChartLoading } = useGetCaseChart();
  if (caseMoneyLoading || caseChartLoading)
    return (
      <Loading screen>
        <TailSpin />
      </Loading>
    );

  return (
    <Container
      as={`div`}
      className="w-full space-y-5 flex flex-col justify-end items-start ">
      <Return>قاصە</Return>

      <CreditCard title="بڕی پارەی ناو قاصە" color="green">
        {caseMoney && (
          <div className="w-full flex flex-row gap-2 justify-end">
            <FormatMoney>{caseMoney.money}</FormatMoney>
            <p>د.ع</p>
          </div>
        )}
      </CreditCard>

      <h2 className="!mt-10 text-right font-bold font-bukra text-lg">مێژوو</h2>

      <div className="w-full flex flex-row justify-between items-start flex-wrap gap-30">
        {" "}
        <div className="tableDiv w-full lg:w-1/2 max-h-[600px] overflow-auto relative">
          <Table className="max-w-[1000px] relative overflow-auto w-full">
            <THead className="sticky top-0 bg-white z-10 w-full" type="simple">
              <Tr>
                <Th className="text-right">#</Th>
                <Th className="text-right">حاڵەت</Th>
                <Th className="text-right">بەروار</Th>
                <Th className="text-right">بڕی پارە</Th>
              </Tr>
            </THead>
            <TBody className="w-full">
              <Pagination<CaseHistory[]> queryFn={() => useGetCaseHistory()}>
                {({
                  isFetchingNextPage,
                  data,
                  hasNextPage,
                  isLoading,
                  ref,
                }) => {
                  const allData = useMemo(
                    () =>
                      data?.pages && data?.pages?.length > 0
                        ? data.pages.map((page) => page.paginatedData).flat()
                        : [],
                    [data]
                  );

                  return (
                    <>
                      {allData?.map((val: CaseHistory, index: number) => (
                        <Tr key={val.id}>
                          <Td>
                            <p className="text-right font-light font-poppins text-lg">
                              {index + 1}
                            </p>
                          </Td>
                          <Td>
                            <p className="text-right font-light font-bukra text-md">
                              {val.situation}
                            </p>
                          </Td>
                          <Td>
                            <p className="text-right font-light font-poppins text-md">
                              {formatDateToDDMMYY(val.date.toLocaleString())}
                            </p>
                          </Td>
                          <Td>
                            <div className="w-full flex flex-row gap-2 justify-end">
                              <FormatMoney
                                className={`text-right font-light font-poppins text-md ${
                                  val.type == "revenue"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}>
                                {val.money}
                              </FormatMoney>
                              <p
                                className={`font-bold text-right font-poppins text-md ${
                                  val.type == "revenue"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}>
                                د.ع
                              </p>
                            </div>
                            <p></p>
                          </Td>
                        </Tr>
                      ))}

                      {!isFetchingNextPage && hasNextPage && (
                        <div className="h-[20px]" ref={ref}></div>
                      )}
                    </>
                  );
                }}
              </Pagination>
            </TBody>
          </Table>
        </div>
        {/* Case Chart */}
        <>
          {caseChart ? (
            <div dir="ltr">
              <PieChart
                colors={["red", "green"]}
                className="w-full md:w-1/2"
                series={[
                  {
                    data: caseChart,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -180,
                    endAngle: 180,
                    arcLabel: (item) => `%${item.value}`,
                    arcLabelMinAngle: 45,
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
                  },
                }}
                width={400}
                height={400}
              />
            </div>
          ) : (
            <NoData>
              <p>There is no data</p>
            </NoData>
          )}
        </>
      </div>
    </Container>
  );
};

export default Case;
