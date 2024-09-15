import { PsulaItemCardProps } from "@/types/items";
import Image from "../ui/Image";
import useScreenSize from "@/hooks/useScreenSize";
import Typography from "../shared/Typography";
import FormatMoney from "../shared/FormatMoney";

const PsulaItemCard = ({
  name,
  quantity,
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
}: PsulaItemCardProps) => {
  const { size } = useScreenSize();
  return (
    <article
      onClick={() => onClick(id)}
      className="dark-light !default-border w-full h-full flex flex-col justify-center items-center  text-center shadow-lg rounded-xl">
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
      </div>
    </article>
  );
};

export default PsulaItemCard;
