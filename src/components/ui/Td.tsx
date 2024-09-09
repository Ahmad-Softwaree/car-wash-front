import { cn } from "@/lib/utils";
import { TdProps } from "@/types/global";

const Td = ({ color, className, children }: TdProps) => {
  return <td className={cn(className, ["p-2"])}>{children}</td>;
};

export default Td;
