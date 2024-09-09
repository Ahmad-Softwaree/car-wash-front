import { MyButtonProps } from "@/types/global";
import { TailSpin } from "react-loader-spinner";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ loading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "flex justify-center items-center flex-row mx-auto",
          props.className
        )}
        {...props}>
        {loading || props.disabled ? (
          <TailSpin
            visible={true}
            height="30"
            width="30"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="w-fit"
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

export default MyButton;
