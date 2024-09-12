import { cn } from "@/lib/utils";
import { THeadProps } from "@/types/global";

const THead = ({ color, children, ...props }: THeadProps) => {
  let bgColor = color === "gray" ? "#ECF1F6" : "null";

  return (
    <thead
      {...props}
      style={{ backgroundColor: bgColor }}
      className={cn(props.className, ["p-4", "w-full"])}>
      {children}
    </thead>
  );
};

export default THead;
