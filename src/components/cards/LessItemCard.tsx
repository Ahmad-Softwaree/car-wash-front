import { LessItemCardProps } from "@/types/items";
import Image from "../ui/Image";
import useScreenSize from "@/hooks/useScreenSize";
import { BadgeMinus, BadgePlus } from "lucide-react";
import Input from "../ui/Input";
import InputGroup from "../ui/InputGroup";
import { useState } from "react";
import MyButton from "../ui/MyButton";
import { useCountItem } from "@/lib/react-query/query/item.query";
import Typography from "../shared/Typography";
import FormatMoney from "../shared/FormatMoney";

const LessItemCard = ({
  id,
  image_url,
  image_name,
  title,
  cost,
  count,
  frosh,
}: LessItemCardProps) => {
  const { size } = useScreenSize();
  const [theCount, setTheCount] = useState<number>(0);
  const { mutateAsync, isPending } = useCountItem(id);
  return (
    <article className="w-[200px] h-full grid grid-cols-1 grid-rows-4 bg-white shadow-lg rounded-xl items-center pb-5">
      <Image
        className="relative row-span-3 col-span-full rounded-t-xl w-full h-full"
        height={size == "xl" || size == "lg" ? "145px" : "100px"}
        width={`100%`}
        image={image_url}
        alt={image_name}
      />

      <Typography text={title}>
        <p className="!text-xs md:!text-sm text-center w-full text-md font-bold font-bukra row-span-1 col-span-full p-2">
          {title}
        </p>
      </Typography>
      <div className="w-full flex flex-row gap-1 justify-center">
        <p className="text-center  text-md font-light text-opacity-50 opacity-50 my-1">
          بڕی تێچوو:
        </p>
        <p className="font-poppins  text-opacity-50 opacity-50 my-1">$</p>
        <FormatMoney className="text-center text-md font-light text-opacity-50 opacity-50 my-1 font-poppins">
          {cost}
        </FormatMoney>
      </div>
      <div className="w-full flex flex-row gap-1 justify-center">
        <p className="text-center  text-lg font-bold font-poppins my-1">$</p>
        <FormatMoney className="text-center  text-lg font-bold font-poppins my-1">
          {frosh}
        </FormatMoney>
      </div>
      <p className="text-center w-full text-md font-bold text-red-700  pt-5">
        {count} دانە ماوە
      </p>

      <div className="pt-3 w-full flex flex-row justify-center gap-4">
        <BadgePlus
          width={40}
          height={40}
          className="cursor-pointer text-green-500"
          onClick={() => setTheCount(theCount + 1)}
        />
        <InputGroup className="w-[50px]">
          <Input
            className="w-full text-center font-bold text-poppins text-lg text-input"
            value={theCount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTheCount(Number(e.target.value))
            }
            name="count"
            type="text"
          />
        </InputGroup>
        <BadgeMinus
          width={40}
          height={40}
          className="cursor-pointer text-red-500"
          onClick={() => setTheCount(theCount - 1)}
        />
      </div>
      <MyButton
        disabled={isPending}
        onClick={async () => {
          await mutateAsync({ count: theCount });
          setTheCount(0);
        }}
        type="button"
        className="p-2 px-4 w-fit mx-auto mt-5 bg-primary-500 rounded-md text-white"
        name="addCount"
        id="addCount">
        ئەنجامدان
      </MyButton>
    </article>
  );
};

export default LessItemCard;
