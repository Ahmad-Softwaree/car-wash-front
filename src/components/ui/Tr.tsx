import { cn } from "@/lib/utils";
import { TrProps } from "@/types/global";
import React, { forwardRef } from "react";

const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  ({ color, className, children, ...props }, ref) => {
    return (
      <tr {...props} className={cn(className, [""])}>
        {children}
      </tr>
    );
  }
);

export default Tr;
