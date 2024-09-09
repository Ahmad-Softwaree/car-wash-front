import { ContainerProps } from "@/types/global";
import { ElementType } from "react";

const Container = <T extends ElementType>({
  as,
  children,
  ...props
}: ContainerProps<T>) => {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
};

export default Container;
