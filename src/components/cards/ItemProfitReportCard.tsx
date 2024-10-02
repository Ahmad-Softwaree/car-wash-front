import { useState } from "react";
import Dialog from "../shared/Dialog";

import { Td, Tr } from "../ui";

import Chip from "@mui/joy/Chip";
import { ItemProfitReportCardProps } from "@/types/items";
import FormatMoney from "../shared/FormatMoney";
import ItemDetailCard from "./ItemDetailCard";

import CustomClose from "../shared/CustomClose";
import { formatDateToDDMMYY } from "@/lib/functions";

const ItemProfitReportCard = ({
  name,
  quantity,
  image_name,
  image_url,
  barcode,
  type_name,
  type_id,
  item_purchase_price,
  item_sell_price,
  actual_quantity,
  note,
  created_by,
  updated_by,
  sell_id,
  id,
  index = -1,
  total_quantity,
  created_at,
  ...others
}: ItemProfitReportCardProps) => {
  const [detail, setDetail] = useState<boolean>(false);

  return (
    <>
      <Tr className={`default-border table-row-hover `} key={id}>
        <Td className="!p-3">
          <p className="text-right font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-poppins text-sm">
            {sell_id}
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{name}</p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{barcode}</p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {type_name}
          </p>
        </Td>

        <Td className="!p-3 flex flex-row justify-start items-center gap-1">
          <Chip
            variant="soft"
            color={Number(total_quantity) < 30 ? "danger" : "neutral"}
          >
            <p className="!font-bukra text-right font-light  text-xs">
              {Number(total_quantity)}
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
            <FormatMoney>{item_purchase_price}</FormatMoney>
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            <FormatMoney>{item_purchase_price - item_sell_price}</FormatMoney>
          </p>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            <FormatMoney>
              {(item_purchase_price - item_sell_price) * Number(total_quantity)}
            </FormatMoney>
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
      {detail && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={1000}
          maxHeight={`90%`}
          isOpen={detail}
          onClose={() => setDetail(false)}
        >
          <CustomClose onClick={() => setDetail(false)} />
          <ItemDetailCard
            id={id}
            name={name}
            created_by={created_by}
            updated_by={updated_by}
            quantity={quantity}
            actual_quantity={actual_quantity}
            barcode={barcode}
            type_name={type_name}
            type_id={type_id}
            item_purchase_price={item_purchase_price}
            item_sell_price={item_sell_price}
            image_url={image_url}
            image_name={image_name}
            note={note}
            {...others}
            onClose={() => setDetail(false)}
          />
        </Dialog>
      )}
    </>
  );
};

export default ItemProfitReportCard;
