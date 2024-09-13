import { cn } from "@/lib/utils";
import { TFootProps } from "@/types/global";

const TFoot = ({ children, ...props }: TFootProps) => {
  return (
    <tfoot {...props} className={cn(props.className, ["p-4", "w-full"])}>
      {children}
    </tfoot>
  );
};

export default TFoot;
