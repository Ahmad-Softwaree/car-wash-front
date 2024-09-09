import { cn } from "@/lib/utils";
import { InputProps } from "@/types/global";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  if (props.type === "file")
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md  border-input bg-background  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer  border-2 border-solid border-gray-200  p-3  flex-row justify-center items-center gap-3",
          [props.className]
        )}
        ref={ref}
        {...props}
      />
    );
  return <input className={cn("", props.className)} ref={ref} {...props} />;
});

export default Input;
