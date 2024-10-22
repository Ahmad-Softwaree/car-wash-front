import { SellCardProps } from "@/types/sell";

import { useGlobalContext } from "@/context/GlobalContext";
import { Td, Tr } from "../ui";

import { formatDateToDDMMYY } from "@/lib/functions";
import { formatMoney } from "../shared/FormatMoney";

const SellProfitCard = ({
  discount,
  date,
  id,
  created_by,
  updated_by,
  index = -1,
  total_sell_price,
  total_purchase_price,
}: SellCardProps) => {
  const {
    state: { checked },
  } = useGlobalContext();

  return (
    <>
      <Tr
        className={`default-border table-row-hover  ${
          checked?.includes(id) ? "table-row-include" : "table-row-normal"
        }`}
        key={id}
      >
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">{id}</p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {formatDateToDDMMYY(date.toLocaleString())}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {formatMoney(total_sell_price)}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {formatMoney(discount)}
          </p>
        </Td>
        {total_sell_price && (
          <Td className="!p-3">
            <p className="text-center font-light font-bukra text-sm">
              {formatMoney(total_sell_price - discount)}
            </p>
          </Td>
        )}
        {total_purchase_price && (
          <Td className="!p-3">
            <p className="text-center font-light font-bukra text-sm">
              {formatMoney(total_purchase_price)}
            </p>
          </Td>
        )}
        {total_sell_price && total_purchase_price && (
          <Td className="!p-3">
            <p className="text-center font-light font-bukra text-sm">
              {formatMoney(total_sell_price - discount - total_purchase_price)}
            </p>
          </Td>
        )}
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {created_by}
          </p>
        </Td>{" "}
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {updated_by}
          </p>
        </Td>
      </Tr>
    </>
  );
};

export default SellProfitCard;
