import { Td, Tr } from "../ui";

import { ItemMovementProps } from "@/types/items";
import FormatMoney from "../shared/FormatMoney";
import { formatDateToDDMMYY } from "@/lib/functions";

const ItemMovementCard = ({
  item_name,
  quantity,
  item_barcode,
  type_name,
  item_purchase_price,
  created_by,
  id,
  index = -1,
  created_at,
}: ItemMovementProps) => {
  return (
    <>
      <Tr className={`default-border table-row-hover `} key={id}>
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {item_name}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {item_barcode}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {type_name}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            <FormatMoney>{item_purchase_price}</FormatMoney>
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            <FormatMoney>{quantity}</FormatMoney>
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            <FormatMoney>{item_purchase_price * quantity}</FormatMoney>
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {created_by}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {formatDateToDDMMYY(created_at.toString())}
          </p>
        </Td>
      </Tr>
    </>
  );
};

export default ItemMovementCard;
