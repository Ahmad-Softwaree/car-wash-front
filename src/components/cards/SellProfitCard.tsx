import { SellCardProps } from "@/types/sell";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import { useGetSellPrint } from "@/lib/react-query/query/sell.query";
import { useGlobalContext } from "@/context/GlobalContext";
import { Td, Tr } from "../ui";

import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

import { formatDateToDDMMYY } from "@/lib/functions";
import PrintModal from "../ui/PrintModal";
import { formatMoney } from "../shared/FormatMoney";

const SellProfitCard = ({
  discount,
  date,
  id,
  created_by,
  updated_by,
  index = -1,
  total_item_sell_price,
  total_item_purchase_price,
  ...others
}: SellCardProps) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const {
    dispatch,
    state: { checked },
  } = useGlobalContext();
  let sell_id_param = searchParam.get(ENUMs.SELL_PARAM as string);
  return (
    <>
      <Tr
        className={`default-border table-row-hover  ${
          checked?.includes(id) ? "table-row-include" : "table-row-normal"
        }`}
        key={id}
      >
        <Td className="!p-3">
          <p className="text-right font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{id}</p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {formatDateToDDMMYY(date.toLocaleString())}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {formatMoney(total_item_sell_price)}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {formatMoney(discount)}
          </p>
        </Td>
        {total_item_sell_price && (
          <Td className="!p-3">
            <p className="text-right font-light font-bukra text-sm">
              {formatMoney(total_item_sell_price - discount)}
            </p>
          </Td>
        )}
        {total_item_sell_price && total_item_purchase_price && (
          <Td className="!p-3">
            <p className="text-right font-light font-bukra text-sm">
              {formatMoney(
                total_item_sell_price - discount - total_item_purchase_price
              )}
            </p>
          </Td>
        )}
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {created_by}
          </p>
        </Td>{" "}
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {updated_by}
          </p>
        </Td>
      </Tr>
      {isPrint && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isPrint}
          onClose={() => setIsPrint(false)}
        >
          <PrintModal
            printFn={() => useGetSellPrint(Number(sell_id_param) || id || 0)}
            onClose={() => setIsPrint(false)}
          />
        </Dialog>
      )}
    </>
  );
};

export default SellProfitCard;
