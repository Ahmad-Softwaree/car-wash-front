import { ExpenseCardProps } from "@/types/expense";

import { Td, Tr } from "../ui";

import Chip from "@mui/joy/Chip";

import { formatDateToDDMMYY } from "@/lib/functions";
import { formatMoney } from "../shared/FormatMoney";

const ExpenseReportCard = ({
  date,
  price,
  type_name,
  id,
  created_by,
  updated_by,
  index = -1,
  ...others
}: ExpenseCardProps) => {
  return (
    <>
      <Tr className={`default-border table-row-hover`} key={id}>
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <Chip variant="soft" color={"primary"}>
            <p className="!font-bukra text-right font-light  text-xs">
              {type_name}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {formatMoney(price)}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {formatDateToDDMMYY(date as string)}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {created_by}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {updated_by}
          </p>
        </Td>
      </Tr>
    </>
  );
};

export default ExpenseReportCard;
