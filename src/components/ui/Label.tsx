import { cn } from "@/lib/utils";
import { LabelProps } from "@/types/global";
import React, { forwardRef } from "react";

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <label
        className={cn(
          "cursor-pointer text-md text-nowrap md:text-lg font-bold font-rabar007",
          props.className
        )}
        {...props}>
        {children}
      </label>
    );
  }
);

export default Label;
