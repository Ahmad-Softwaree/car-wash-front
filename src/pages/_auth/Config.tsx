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
        <div className="text-xl text-right mt-5">
          پرنتکردنی وەصڵ لە بەشی وەصڵەکان :
        </div>
        <div className="flex flex-row justify-start items-center gap-10 flex-wrap w-full mb-5">
          <div className="flex flex-row justify-start items-center gap-3">
            <InputGroup className="checkbox-input">
              <Input
                checked={data?.items_print_modal}
                name="items_print_modal"
                onChange={() => {
                  mutateAsync({
                    key: "items_print_modal",
                    body: true,
                  });
                }}
                type="radio"
              />
            </InputGroup>
            <Label className="text-sm text-nowrap">پیشاندان پێش پرنتکردن</Label>
          </div>
          <div className="flex flex-row justify-start items-center gap-3">
            <InputGroup className="checkbox-input">
              <Input
                checked={!data?.items_print_modal}
                name="items_print_modal"
                onChange={() => {
                  mutateAsync({
                    key: "items_print_modal",
                    body: false,
                  });
                }}
                type="radio"
              />
            </InputGroup>
            <Label className="text-sm text-nowrap">پرنتکردنی ڕاستەوخۆ</Label>
          </div>
        </div>
        <div className="text-xl text-right mt-5">
          پرنتکردنی وەصڵ لە بەشی فرۆشتن :
        </div>
        <div className="flex flex-row justify-start items-center gap-10 flex-wrap w-full mb-5">
          <div className="flex flex-row justify-start items-center gap-3">
            <InputGroup className="checkbox-input">
              <Input
                checked={data?.pos_print_modal}
                name="pos_print_modal"
                onChange={() => {
                  mutateAsync({
                    key: "pos_print_modal",
                    body: true,
                  });
                }}
                type="radio"
              />
            </InputGroup>
            <Label className="text-sm text-nowrap">پیشاندان پێش پرنتکردن</Label>
          </div>
          <div className="flex flex-row justify-start items-center gap-3">
            <InputGroup className="checkbox-input">
              <Input
                checked={!data?.pos_print_modal}
                name="pos_print_modal"
                onChange={() => {
                  mutateAsync({
                    key: "pos_print_modal",
                    body: false,
                  });
                }}
                type="radio"
              />
            </InputGroup>
            <Label className="text-sm text-nowrap">پرنتکردنی ڕاستەوخۆ</Label>
          </div>
        </div>
        <div className="text-xl text-right mt-5">
          پرنتکردنی وەصڵ لە بەشی ڕاپۆرت :
        </div>
        <div className="flex flex-row justify-start items-center gap-10 flex-wrap w-full mb-5">
          <div className="flex flex-row justify-start items-center gap-3">
            <InputGroup className="checkbox-input">
              <Input
                checked={data?.report_print_modal}
                name="report_print_modal"
                onChange={() => {
                  mutateAsync({
                    key: "report_print_modal",
                    body: true,
                  });
                }}
                type="radio"
              />
            </InputGroup>
            <Label className="text-sm text-nowrap">پیشاندان پێش پرنتکردن</Label>
          </div>
          <div className="flex flex-row justify-start items-center gap-3">
            <InputGroup className="checkbox-input">
              <Input
                checked={!data?.report_print_modal}
                name="report_print_modal"
                onChange={() => {
                  mutateAsync({
                    key: "report_print_modal",
                    body: false,
                  });
                }}
                type="radio"
              />
            </InputGroup>
            <Label className="text-sm text-nowrap">پرنتکردنی ڕاستەوخۆ</Label>
          </div>
        </div>{" "}
      </Container>
    </>
  );
};

export default Config;
