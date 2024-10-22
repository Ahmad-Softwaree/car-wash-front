import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import InputAddon from "@/components/ui/InputAddon";
import InputGroup from "@/components/ui/InputGroup";
import Label from "@/components/ui/Label";
import MyButton from "@/components/ui/MyButton";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetConfigs,
  useUpdateConfig,
} from "@/lib/react-query/query/config.query";
import { Banknote, CircleDollarSign, Hash } from "lucide-react";
import { useEffect, useState } from "react";

const Config = () => {
  const { toast } = useToast();
  const { data, isLoading } = useGetConfigs();
  const [value, setValue] = useState<string>(
    data?.item_less_from?.toLocaleString() || ""
  );
  const [money, setMoney] = useState<string>(
    data?.initial_money?.toLocaleString() || ""
  );

  useEffect(() => {
    if (data) {
      setValue(data.item_less_from.toLocaleString());
      setMoney(data.initial_money.toLocaleString());
    }
  }, [data]);

  const { mutateAsync, isPending } = useUpdateConfig<string | boolean>();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-5 flex flex-col justify-start items-start"
      >
        <div className="flex flex-col justify-start items-start gap-3">
          <Label className="text-sm">دیاریکردنی مەوادی کەمبوو لە</Label>
          <div className="w-full flex flex-row justify-start items-center gap-3">
            <InputGroup className="text-input">
              <InputAddon>
                <Hash />
              </InputAddon>
              <Input
                value={value}
                name="valueToCase"
                placeholder="ژمارە"
                onChange={(e: any) => setValue(e.target.value)}
                type="text"
              />
            </InputGroup>
            <MyButton
              onClick={async () => {
                if (!value || value == "") {
                  toast({
                    alertType: "error",
                    title: "هەڵە",
                    description: "تکایە ژمارە دیاری بکە",
                  });
                }
                await mutateAsync({ key: "item_less_from", body: value });
                setValue(data?.item_less_from.toLocaleString() || "");
              }}
              type="button"
              disabled={isPending}
              className="!font-bukra text-sm bg-green-500 text-white rounded-md cursor-pointer p-2 px-4"
            >
              دیاریکردن
            </MyButton>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <Label className="text-sm">
            بڕی سەرەتایی ناو قاصە (پارەی ئەوەلی)
          </Label>
          <div className="w-full flex flex-row justify-start items-center gap-3">
            <InputGroup className="text-input">
              <InputAddon>
                <Banknote />
              </InputAddon>
              <Input
                value={money}
                name="caseMoney"
                placeholder="ژمارە"
                onChange={(e: any) => setMoney(e.target.value)}
                type="text"
              />
            </InputGroup>
            <MyButton
              onClick={async () => {
                if (!money || money == "") {
                  toast({
                    alertType: "error",
                    title: "هەڵە",
                    description: "تکایە ژمارە دیاری بکە",
                  });
                }
                await mutateAsync({ key: "initial_money", body: money });
                setMoney(data?.initial_money.toLocaleString() || "");
              }}
              type="button"
              disabled={isPending}
              className="!font-bukra text-sm bg-green-500 text-white rounded-md cursor-pointer p-2 px-4"
            >
              دیاریکردن
            </MyButton>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Config;
