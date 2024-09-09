import { ConfigCardProps } from "@/types/config";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import MyButton from "../ui/MyButton";
import { useUpdateConfig } from "@/lib/react-query/query/config.query";
import { useState } from "react";

const ConfigCard = ({ id, item_less_from }: ConfigCardProps) => {
  const { mutateAsync, isPending } = useUpdateConfig<number>("item_less_from");
  const [less, setLess] = useState<number>(item_less_from);
  return (
    <article
      className="p-3 rounded-md  flex justify-between items-center shadow-md bg-white px-5 w-fit"
      id={id.toLocaleString()}>
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <p className="text-sm font-bold font-rabar007 text-nowrap">
          دیاریکردن موادی کەمبوو لە:
        </p>
        <div className="w-full flex flex-row justify-start items-center gap-3">
          <InputGroup className="w-[200px] md:w-[300px] text-input">
            <Input
              value={less}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLess(Number(e.target.value))
              }
              type="text"
              name="name"
              placeholder="دیاریکردنی موادی کەمبوو لە"
              className="w-full"
            />
          </InputGroup>

          <MyButton
            disabled={isPending}
            onClick={() => mutateAsync(less)}
            name="changeConfigButton"
            id="changeConfigButton"
            type="button"
            className="text-sm p-4 rounded-md bg-primary-500 text-white">
            گۆڕین
          </MyButton>
        </div>
      </div>
    </article>
  );
};

export default ConfigCard;
