import { cn } from "@/lib/utils";
import { THeadProps } from "@/types/global";

const THead = ({ children, ...props }: THeadProps) => {
  return (
    <thead {...props} className={cn(props.className, ["p-4", "w-full"])}>
      {children}
    </thead>
  );
};

export default THead;
