import { PsulaProductCardProps } from "@/types/products";
import Image from "../ui/Image";
import useScreenSize from "@/hooks/useScreenSize";
import Typography from "../shared/Typography";
import FormatMoney from "../shared/FormatMoney";

const PsulaProductCard = ({
  id,
  image_url,
  image_name,
  title,
  cost,
  frosh,
  onClick,
}: PsulaProductCardProps) => {
  const { size } = useScreenSize();
  return (
    <article
      onClick={() => onClick(id)}
      className="w-full h-full flex flex-row justify-start items-center  bg-white shadow-lg rounded-xl">
      <Image
        className="relative   rounded-r-xl"
        width={
          size == "xl" || size == "lg"
            ? "120px"
            : size == "md"
            ? "110px"
            : "80px"
        }
        height={`100%`}
        image={image_url}
        alt={image_name}
      />
      <div className="flex flex-col justify-start items-start gap-2  px-2">
        <Typography className="text-right !text-sm " text={title}>
          <p>{title}</p>
        </Typography>
        <div className="w-full flex flex-row gap-1 justify-start">
          <p className="text-center  text-sm font-light text-opacity-50 opacity-50">
            بڕی تێچوو:
          </p>
          <p className="font-poppins  text-opacity-50 opacity-50">$</p>
          <FormatMoney className="text-center text-sm font-light text-opacity-50 opacity-50 font-poppins">
            {cost}
          </FormatMoney>
        </div>
        <div className="w-full flex flex-row gap-1 justify-start">
          <p className="text-center  text-md font-bold font-poppins">$</p>
          <FormatMoney className="text-center  text-md font-bold font-poppins">
            {frosh}
          </FormatMoney>
        </div>
      </div>
    </article>
  );
};

export default PsulaProductCard;
