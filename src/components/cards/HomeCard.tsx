import useScreenSize from "@/hooks/useScreenSize";
import { HomeBox } from "@/types/global";
import { Link } from "react-router-dom";
import Image from "../ui/Image";

const HomeCard = ({ link, image, name }: HomeBox) => {
  const { size } = useScreenSize();

  return (
    <Link
      to={link}
      className="p-3 w-[100px] md:w-[150px] h-[100px] md:h-[150px] rounded-md border-2 border-solid border-gray-400 flex flex-col justify-center items-center gap-2 md:gap-4 shadow-md">
      <Image
        height={size === "sm" || size === "xs" ? 30 : 60}
        width={size === "sm" || size === "xs" ? 30 : 60}
        loading="lazy"
        image={image}
        alt={image}
        className="object-cover relative"
      />

      <p className="font-bold text-center text-sm md:text-lg">{name}</p>
    </Link>
  );
};

export default HomeCard;
