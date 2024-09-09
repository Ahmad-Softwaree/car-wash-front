import { cn } from "@/lib/utils";
import { ImageProps } from "@/types/global";

const Image = ({
  loading = "lazy",
  image,
  preview,
  divClassName,
  ...props
}: ImageProps) => {
  if (!image || image == "")
    return (
      <div
        style={{ height: props.height, width: props.width }}
        className={cn(
          "object-cover  relative bg-gray-500 bg-opacity-10 flex flex-row justify-center items-center",
          props.className,
          divClassName
        )}>
        {preview}
      </div>
    );
  return (
    <img
      {...props}
      loading={loading}
      style={{ height: props.height, width: props.width }}
      className={cn("object-cover   relative", props.className)}
      src={typeof image == "object" ? URL.createObjectURL(image) : image}
    />
  );
};

export default Image;
