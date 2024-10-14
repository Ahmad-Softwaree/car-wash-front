import { Td, Tr } from "../ui";
import { ItemKogaReportCardProps } from "@/types/items";
import FormatMoney from "../shared/FormatMoney";

const ItemLessReportCard = ({
  name,
  barcode,
  quantity,
  type_name,
  type_id,
  created_by,
  updated_by,
  id,
  index = -1,
  sell_quantity,
  created_at,
  item_less_from,
}: ItemKogaReportCardProps) => {
  return (
    <>
      <Tr className={`default-border table-row-hover `} key={id}>
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">{name}</p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">{barcode}</p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            {type_name}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            <FormatMoney>{quantity}</FormatMoney>
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            <FormatMoney>{sell_quantity}</FormatMoney>
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            <FormatMoney>{quantity - sell_quantity}</FormatMoney>
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-center font-light font-bukra text-sm">
            <FormatMoney>{item_less_from}</FormatMoney>
          </p>
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

export default ItemLessReportCard;
