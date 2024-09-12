import { cn } from "@/lib/utils";
import { THProps } from "@/types/global";

const Th = ({ color, children, ...props }: THProps) => {
  return <th className={cn(props.className, ["p-2"])}>{children}</th>;
};

export default Th;
