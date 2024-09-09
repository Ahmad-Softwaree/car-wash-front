import { cn } from "@/lib/utils";
import { TypographyProps } from "@/types/global";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Typography = ({ text, children, ...props }: TypographyProps) => {
  const [font, setFont] = useState("font-rabar007");
  const location = useLocation();

  useEffect(() => {
    let extendedRegex = /^[a-zA-Z0-9 ,._-à-žÀ-Ž]*$/;
    if (extendedRegex.test(text)) setFont("font-poppins");
  }, [children, location]);

  return (
    <div {...props} className={cn(`!${font}`, props.className)}>
      {children}
    </div>
  );
};

export default Typography;
