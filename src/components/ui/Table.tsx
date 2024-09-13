import { cn } from "@/lib/utils";
import { TableProps } from "@/types/global";

const Table = ({ children, ...props }: TableProps) => {
  return (
    <table {...props} className={cn(props.className, ["w-full", "p-5"])}>
      {children}
    </table>
  );
};

export default Table;
