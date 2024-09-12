import { cn } from "@/lib/utils";
import { TrProps } from "@/types/global";
import { forwardRef } from "react";

const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  ({ color, children, ...props }, ref) => {
    return (
      <tr {...props} className={cn(props.className, [""])}>
        {children}
      </tr>
    );
  }
);

export default Tr;
