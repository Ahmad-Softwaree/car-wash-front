import FormatMoney from "@/components/shared/FormatMoney";
import Container from "@/components/ui/Container";
import Loading from "@/components/ui/Loading";
import { useGetDashboardData } from "@/lib/react-query/query/dashboard.query";
import { Card, CardContent } from "@mui/joy";
import { TailSpin } from "react-loader-spinner";

const Home = () => {
  const { data, isLoading } = useGetDashboardData();
  return (
    <Container as={`div`}>
      {isLoading ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : (
        <div className="w-full flex flex-row justify-start items-center gap-5 md:gap-10 flex-wrap">
          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="primary"
            invertedColors>
            <CardContent orientation="horizontal">
              <div className="flex flex-row justify-center items-center p-4 rounded-lg bg-black-500 bg-opacity-40 h-[70px] w-[70px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-cash-banknote">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 5a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3zm-7 4a3 3 0 0 0 -2.996 2.85l-.004 .15a3 3 0 1 0 3 -3m6.01 2h-.01a1 1 0 0 0 0 2h.01a1 1 0 0 0 0 -2m-12 0h-.01a1 1 0 1 0 .01 2a1 1 0 0 0 0 -2" />
                </svg>
              </div>
              <CardContent>
                <p className="!font-bukra">کۆی خەرجی</p>
                <p className="!font-bukra text-2xl">
                  <FormatMoney>{Number(data.expense_total)}</FormatMoney>
                </p>
              </CardContent>
            </CardContent>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default Home;
