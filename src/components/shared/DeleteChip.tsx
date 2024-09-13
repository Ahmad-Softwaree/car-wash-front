import Chip from "@mui/joy/Chip";
import Tooltip from "@mui/joy/Tooltip";
import { Trash2 } from "lucide-react";

const DeleteChip = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Tooltip placement="top" title="سڕینەوە" color="danger" variant="soft">
      <Chip onClick={onClick} variant="soft" color="danger">
        <Trash2 className="w-7 h-7 p-1 cursor-pointer" />
      </Chip>
    </Tooltip>
  );
};

export default DeleteChip;
