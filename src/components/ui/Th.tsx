import { cn } from "@/lib/utils";
import { THProps } from "@/types/global";

const Th = ({ color, children, className }: THProps) => {
  return <th className={cn(className, ["p-2"])}>{children}</th>;
};

export default Th;
