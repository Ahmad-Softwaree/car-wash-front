import { Td, Tr } from "../ui";

import { formatMoney } from "../shared/FormatMoney";
import { CaseReportCardProps } from "@/types/report";

const CaseReportCard = ({
  sold,
  sold_price,
  id,
  created_by,
  user_id,
  index = -1,
  ...others
}: CaseReportCardProps) => {
  return (
    <>
      <Tr className={`default-border table-row-hover  `} key={id}>
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">{user_id}</p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {created_by}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">{sold}</p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {formatMoney(sold_price)}
          </p>
        </Td>{" "}
      </Tr>
    </>
  );
};

export default CaseReportCard;
