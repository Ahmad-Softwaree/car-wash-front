import { PsulaItemCardProps } from "@/types/items";
import Image from "../ui/Image";
import Typography from "../shared/Typography";
import { Chip, Tooltip } from "@mui/joy";
import { useState } from "react";
import { CirclePlus, Info } from "lucide-react";
import Dialog from "../shared/Dialog";
import CustomClose from "../shared/CustomClose";
import ItemDetailCard from "./ItemDetailCard";

const PsulaItemCard = ({
  name,
  quantity,
  actual_quantity,
  image_name,
  image_url,
  barcode,
  type_name,
  type_id,
  item_purchase_price,
  item_sell_price,
  note,
  id,
  onClick,
  ...others
}: PsulaItemCardProps) => {
  const [detail, setDetail] = useState<boolean>(false);
  return (
    <>
      <article className="dark-light  w-full h-full flex flex-col justify-center items-center  text-center shadow-lg rounded-xl pb-3">
        <div
          onClick={() => onClick(id)}
          className="w-full flex flex-col justify-center items-center text-center h-[90%]"
        >
          <Image
            className="relative   rounded-t-xl"
            width={`100%`}
            height={`50%`}
            image={image_url}
            alt={image_name}
          />
          <div className="flex flex-col justify-start items-start gap-2  px-2 h-[50%] pt-2">
            <Typography className="text-center !text-sm " text={name}>
              <p>{name}</p>
            </Typography>
            <p className="text-center w-full">عدد : {actual_quantity}</p>
          </div>
        </div>
        <Tooltip placement="top" title="زانیاری" color="primary" variant="soft">
          <Chip
            sx={{
              minWidth: "90%",
            }}
            onClick={() => setDetail(true)}
            variant="soft"
            color="primary"
          >
            <Info className="w-7 h-7 p-1 mx-auto cursor-pointer" />
          </Chip>
        </Tooltip>
      </article>
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

export default PsulaItemCard;
