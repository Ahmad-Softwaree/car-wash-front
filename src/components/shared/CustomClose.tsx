import { X } from "lucide-react";

const CustomClose = ({ onClick }: { onClick: () => void }) => {
  return (
    <X
      onClick={onClick}
      className="cursor-pointer p-1 w-8 h-8 border-2 border-solid border-primary-400 border-opacity-40 rounded-lg  transition-all duration-200 hover:bg-red-400"
    />
  );
};

export default CustomClose;
