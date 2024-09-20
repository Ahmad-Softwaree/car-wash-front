import { AddItemCardProps } from "@/types/items";
import Image from "../ui/Image";
import useScreenSize from "@/hooks/useScreenSize";
import Typography from "../shared/Typography";

const AddItemCard = ({
  id,
  image_url,
  image_name,
  title,
  onClick,
}: AddItemCardProps) => {
  const { size } = useScreenSize();
  return (
    <article
      onClick={() => onClick(id)}
      className="w-full h-full grid grid-cols-1 grid-rows-4 bg-secondary-100 shadow-lg rounded-xl items-center">
      <Image
        className="relative row-span-2 md:row-span-3 col-span-full rounded-t-xl w-full h-full"
        height={
          size == "xl" || size == "lg"
            ? "145px"
            : size == "md"
            ? "140px"
            : "100px"
        }
        width={`100%`}
        image={image_url}
        alt={image_name}
      />
      <Typography
        className="!text-xs md:!text-sm text-center w-full text-md font-bold  row-span-2 md:row-span-1 col-span-full p-2"
        text={title}>
        <p>{title}</p>
      </Typography>
    </article>
  );
};

export default AddItemCard;
