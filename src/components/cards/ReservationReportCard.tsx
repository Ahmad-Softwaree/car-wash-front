import { ReservationCardProps } from "@/types/reservation";

import { Td, Tr } from "../ui";

import Chip from "@mui/joy/Chip";

import { formateDateToYMDHM } from "@/lib/functions";
import FormatMoney from "../shared/FormatMoney";

const ReservationReportCard = ({
  customer_name,
  color_name,
  car_model_name,
  car_type_name,
  service_name,
  price,
  note,
  date_time,
  created_by,
  updated_by,
  id,
  completed,
  index = -1,
  ...others
}: ReservationCardProps) => {
  return (
    <>
      <Tr className={`default-border table-row-hover`} key={id}>
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>{" "}
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm flex flex-row gap-1">
            <FormatMoney>{price}</FormatMoney> IQD
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {customer_name}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {formateDateToYMDHM(date_time as string)}
          </p>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {service_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {car_type_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {car_model_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"neutral"}>
            <p className="!font-bukra text-center font-light  text-xs">
              {color_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {created_by}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {updated_by}
          </p>
        </Td>
      </Tr>
    </>
  );
};

export default ReservationReportCard;
