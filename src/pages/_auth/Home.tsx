import HomeCard from "@/components/cards/HomeCard";
import FormatMoney from "@/components/shared/FormatMoney";
import Container from "@/components/ui/Container";
import Loading from "@/components/ui/Loading";
import { useGetDashboardData } from "@/lib/react-query/query/dashboard.query";
import { Card, CardContent } from "@mui/joy";
import {
  Archive,
  BadgeDollarSign,
  Bolt,
  Box,
  CircleUserRound,
  FileBox,
  HandCoins,
  MapPin,
  ReceiptText,
  SquareUser,
  User,
  UserCog,
} from "lucide-react";
import { TailSpin } from "react-loader-spinner";

const Home = () => {
  const { data, isLoading } = useGetDashboardData();
  console.log(data);
  return (
    <Container as={`div`}>
      {isLoading ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : (
        <div className="w-full flex flex-row justify-start items-start gap-5 md:gap-10 flex-wrap">
          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="primary"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_users}
              icon={<UserCog />}
              text="بەکارهێنەران"
              data={data.all_users}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="warning"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_role_count}
              icon={<Bolt />}
              text="ڕۆڵەکان"
              data={data.role_count}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="warning"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_item_type_count}
              icon={<Bolt />}
              text="جۆرەکانی کاڵا"
              data={data.item_type_count}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="warning"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_car_type_count}
              icon={<Bolt />}
              text="جۆرەکانی ئۆتۆمبێل"
              data={data.car_type_count}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="warning"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_car_model_count}
              icon={<Bolt />}
              text="مۆدێلەکانی ئۆتۆمبێل"
              data={data.car_model_count}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="warning"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_service_count}
              icon={<Bolt />}
              text="جۆرەکانی خزمەتگوزاری"
              data={data.service_count}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="warning"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_colors_count}
              icon={<Bolt />}
              text="ڕەنگەکان"
              data={data.colors_count}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="warning"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_expense_type_count}
              icon={<Bolt />}
              text="جۆرەکانی خەرجی"
              data={data.expense_type_count}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="neutral"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_sell_count}
              icon={<ReceiptText />}
              text="وەصڵ"
              data={data.sell_count}
            />
          </Card>
          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="neutral"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_item_count}
              icon={<Box />}
              text="کاڵا"
              data={data.item_count}
            />
          </Card>
          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="success"
            invertedColors
          >
            <CardContent orientation="horizontal">
              <div className="flex flex-row justify-center items-center p-4 rounded-lg bg-black-500 bg-opacity-40 h-[70px] w-[70px]">
                <HandCoins />
              </div>
              <CardContent>
                <p className="!font-bukra">نۆرەکان</p>
                <p className="!font-bukra text-sm flex flex-row justify-start items-center gap-2 text-red-200">
                  کۆی نۆرەکان :{" "}
                  <FormatMoney className="text-2xl">
                    {Number(data.reservation_count)}
                  </FormatMoney>
                </p>
                <p className="!font-bukra text-sm flex flex-row justify-start items-center gap-2 text-red-200">
                  تەواوبوو :{" "}
                  <FormatMoney className="text-2xl">
                    {Number(data.completed_reservation_count)}
                  </FormatMoney>
                </p>
                <p className="!font-bukra text-sm flex flex-row justify-start items-center gap-2 text-red-200">
                  ماوە :{" "}
                  <FormatMoney className="text-2xl">
                    {Number(data.not_completed_reservation_count)}
                  </FormatMoney>
                </p>
              </CardContent>
            </CardContent>
          </Card>
          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="success"
            invertedColors
          >
            <CardContent orientation="horizontal">
              <div className="flex flex-row justify-center items-center p-4 rounded-lg bg-black-500 bg-opacity-40 h-[70px] w-[70px]">
                <HandCoins />
              </div>
              <CardContent>
                <p className="!font-bukra">خەرجی</p>
                <p className="!font-bukra text-sm flex flex-row justify-start items-center gap-2 text-red-200">
                  کۆی خەرجی :{" "}
                  <FormatMoney className="text-2xl">
                    {Number(data.expense_total)}
                  </FormatMoney>
                </p>
                <p className="!font-bukra text-sm flex flex-row justify-start items-center gap-2 text-red-200">
                  هەبوو :{" "}
                  <FormatMoney className="text-2xl">
                    {Number(data.total_expenses)}
                  </FormatMoney>
                </p>
                <p className="!font-bukra text-sm flex flex-row justify-start items-center gap-2 text-red-200">
                  سڕاوە :{" "}
                  <FormatMoney className="text-2xl">
                    {Number(data.deleted_expenses)}
                  </FormatMoney>
                </p>
              </CardContent>
            </CardContent>
          </Card>
          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="success"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_item_history_count}
              icon={<FileBox />}
              text="مامەڵەی کۆگا"
              data={data.item_history_count}
            />
          </Card>

          <Card
            sx={{ minWidth: "400px", minHeight: "fit" }}
            variant="solid"
            color="success"
            invertedColors
          >
            <HomeCard
              deleted={data.deleted_backup_count}
              icon={<Archive />}
              text="باکئەپ"
              data={data.backup_count}
            />
          </Card>
        </div>
      )}
    </Container>
  );
};

export default Home;
