import { cn } from "@/lib/utils";
import { TextareaProps } from "@/types";
import { forwardRef } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return <textarea className={cn("", className)} ref={ref} {...props} />;
  }
);

export default Textarea;
