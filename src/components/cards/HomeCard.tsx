import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CircularProgress from "@mui/joy/CircularProgress";
import SvgIcon from "@mui/joy/SvgIcon";
import { ReactElement } from "react";

const HomeCard = ({
  Icon,
  title,
  body,
}: {
  Icon: ReactElement;
  title: string;
  body: number;
}) => {
  return (
    <div className="w-[300px]">
      <Card variant="solid" color="primary" invertedColors>
        <CardContent orientation="horizontal">
          <CircularProgress size="lg" determinate value={20}>
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor">
                {Icon}
              </svg>
            </SvgIcon>
          </CircularProgress>
          <CardContent>
            <p className="!font-bukra">{title}</p>
            <p className="!font-bukra text-2xl">{body}</p>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeCard;
