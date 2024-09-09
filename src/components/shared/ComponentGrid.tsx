import { cn } from "@/lib/utils";
import { ComponentGridProps } from "@/types/global";

const ComponentGrid = ({
  className,
  children,
  ...props
}: ComponentGridProps) => {
  return (
    <div {...props} className={cn("", className)}>
      {children}
    </div>
  );
};

export default ComponentGrid;
