import { cn } from "@/lib/utils";
import { TextareaProps } from "@/types/global";
import { forwardRef } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...props }, ref) => {
    return (
      <textarea className={cn("", props.className)} ref={ref} {...props} />
    );
  }
);

export default Textarea;
