import { cn } from "@/lib/utils";
import { InputGroupProps } from "@/types/global";

const InputGroup = ({
  children,
  error,
  parentDivClass,
  ...props
}: InputGroupProps) => {
  return (
    <div className={cn("flex flex-col w-full gap-2", parentDivClass)}>
      <div {...props} className={cn("", props.className)}>
        {children}
      </div>{" "}
      {error && (
        <span role="alert" className="input_error !text-xs">
          تکایە ئەم بەشە پڕکەرەوە
        </span>
      )}
    </div>
  );
};

export default InputGroup;
