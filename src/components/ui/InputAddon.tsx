import { cn } from "@/lib/utils";
import { InputAddonProps } from "@/types/global";

const InputAddon = ({ children, ...props }: InputAddonProps) => {
  return (
    <div {...props} className={cn("", props.className)}>
      {children}
    </div>
  );
};

export default InputAddon;
