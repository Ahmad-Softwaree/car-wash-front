import { cn } from "@/lib/utils";
import { TBodyProps } from "@/types/global";

const TBody = ({ color, className, children, ...props }: TBodyProps) => {
  return (
    <tbody {...props} className={cn(className, "")}>
      {children}
    </tbody>
  );
};

export default TBody;
