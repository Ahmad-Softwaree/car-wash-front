import { cn } from "@/lib/utils";
import { FormatMoneyProps } from "@/types/global";

export function formatMoney(value: any): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const FormatMoney = ({ children, ...props }: FormatMoneyProps) => {
  return (
    <p {...props} className={cn(props.className, ["w-fit"])}>
      {formatMoney(children)}
    </p>
  );
};

export default FormatMoney;
