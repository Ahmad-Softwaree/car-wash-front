import { CreditCardProps } from "@/types";

const CreditCard = ({
  type = "big",
  title,
  children,
  color,
}: CreditCardProps) => {
  let bgColor =
    color === "green"
      ? "#E9FBE9"
      : color === "pink"
      ? "#FBE9E9"
      : color === "purple"
      ? "#E9EBFB"
      : "#F3F3F3";

  return type === "big" ? (
    <article
      style={{ backgroundColor: bgColor }}
      className={`w-[330px] h-[140px] rounded-lg flex flex-col justify-between items-center gap-5 p-5`}>
      <p className="w-full text-right font-bold font-bukra text-md">{title}</p>

      <p className="w-full text-left font-bold font-sans text-lg">{children}</p>
    </article>
  ) : (
    <article
      style={{ backgroundColor: bgColor }}
      className={`w-[330px] h-[70px] rounded-lg flex flex-row justify-between items-center gap-5 p-5`}>
      <p className="text-right font-bold font-bukra text-md">{title}</p>

      <p className="text-left font-bold font-poppins text-md">{children}</p>
    </article>
  );
};

export default CreditCard;
