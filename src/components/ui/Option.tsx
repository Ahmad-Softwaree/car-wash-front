import { cn } from "@/lib/utils";
import { OptionProps } from "@/types";
import { forwardRef } from "react";

const Option = forwardRef<HTMLOptionElement, OptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <option
        className={cn(className, [
          "p-2",
          "flex",
          "flex-row",
          "justify-center",
          "items-center",
          "gap-3",
          "focus:outline-none",
        ])}
        ref={ref}
        {...props}>
        {children}
      </option>
    );
  }
);

export default Option;
