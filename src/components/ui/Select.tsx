import { cn } from "@/lib/utils";
import { SelectProps } from "@/types/global";
import { forwardRef } from "react";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...props }, ref) => {
    return (
      <select
        className={cn(props.className, "focus:outline-none")}
        ref={ref}
        {...props}>
        {children}
      </select>
    );
  }
);

export default Select;
