import { cn } from "@/lib/utils";
import { InputGroupProps } from "@/types/global";

const InputGroup = ({ children, error, ...props }: InputGroupProps) => {
  return (
    <>
      <div {...props} className={cn("", props.className)}>
        {children}
      </div>{" "}
      {error && (
        <span role="alert" className="input_error">
          تکایە ئەم بەشە پڕکەرەوە
        </span>
      )}
    </>
  );
};

export default InputGroup;
