import { Td, Tr } from "../ui";
import Chip from "@mui/joy/Chip";
import { ItemSellReportCardProps } from "@/types/items";
import FormatMoney from "../shared/FormatMoney";
import { formatDateToDDMMYY } from "@/lib/functions";

const ItemSellReportCard = ({
  item_name,
  item_barcode,
  type_name,
  item_sell_price,
  created_by,
  updated_by,
  sell_id,
  id,
  index = -1,
  quantity,
  created_at,
}: ItemSellReportCardProps) => {
  return (
    <>
      <Tr className={`default-border table-row-hover `} key={id}>
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {sell_id}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {item_name}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {item_barcode}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {type_name}
          </p>
        </Td>

        <Td className="!p-3 flex flex-row justify-start items-center gap-1">
          <Chip
            variant="soft"
            color={Number(quantity) < 30 ? "danger" : "neutral"}
          >
            <p className="!font-bukra text-right font-light  text-xs">
              {Number(quantity)}
            </p>
          </Chip>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            <FormatMoney>{item_sell_price}</FormatMoney>
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            <FormatMoney>{item_sell_price * Number(quantity)}</FormatMoney>
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

        {created_at && (
          <Td className="!p-3">
            <p className="text-right font-light font-bukra text-sm">
              {formatDateToDDMMYY(created_at.toString())}
            </p>
          </Td>
        )}
      </Tr>
    </>
  );
};

export default ItemSellReportCard;
