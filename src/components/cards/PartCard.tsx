import { PartCardProps } from "@/types/part";

const PartCard = ({ id, name }: PartCardProps) => {
  return (
    <article
      className="p-3 rounded-md cursor-pointer flex justify-between items-center shadow-md bg-white px-5 w-fit"
      id={id.toLocaleString()}>
      <p className="text-sm font-bold font-rabar007">{name}</p>
    </article>
  );
};

export default PartCard;
