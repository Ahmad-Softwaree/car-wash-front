import { cn } from "@/lib/utils";
import { TBodyProps } from "@/types/global";

const TBody = ({ children, ...props }: TBodyProps) => {
  return (
    <tbody {...props} className={cn(props.className, "")}>
      {children}
    </tbody>
  );
};

export default TBody;
