import { cn } from "@/lib/utils";
import { OptionProps } from "@/types/global";
import { forwardRef } from "react";

const Option = forwardRef<HTMLOptionElement, OptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <option
        className={cn(props.className, [
          "p-2",
          "flex",
          "flex-row",
          "justify-center",
          "items-center",
          "gap-3",
          "focus:outline-none",
          "bg-transparent",
        ])}
        ref={ref}
        {...props}>
        {children}
      </option>
    );
  }
);

export default Option;
