import { cn } from "@/lib/utils";
import { SelectProps } from "@/types";
import { forwardRef } from "react";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <select
        className={cn(className, "focus:outline-none")}
        ref={ref}
        {...props}>
        {children}
      </select>
    );
  }
);

export default Select;
