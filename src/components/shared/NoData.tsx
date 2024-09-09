import { cn } from "@/lib/utils";
import { NoDataProps } from "@/types/global";

export default function NoData({ children, className, ...props }: NoDataProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-full text-center flex flex-row justify-center items-center gap-10 flex-wrap-reverse p-10",
        className
      )}>
      {children}
    </div>
  );
}
