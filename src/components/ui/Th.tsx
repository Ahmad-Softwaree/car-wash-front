import { cn } from "@/lib/utils";
import { THProps } from "@/types/global";

const Th = ({ children, ...props }: THProps) => {
  return (
    <th {...props} className={cn(props.className, ["p-2 text-nowrap"])}>
      {children}
    </th>
  );
};

export default Th;
