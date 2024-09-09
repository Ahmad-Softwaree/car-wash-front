import { cn } from "@/lib/utils";
import { THeadProps } from "@/types/global";

const THead = ({ color, type, children, className, ...props }: THeadProps) => {
  let bgColor = color === "gray" ? "#ECF1F6" : "null";
  let tableHeader =
    type === "simple" ? (
      <thead
        {...props}
        style={{ backgroundColor: bgColor }}
        className={cn(className, ["p-4", "w-full"])}>
        {children}
      </thead>
    ) : null;
  return tableHeader;
};

export default THead;
