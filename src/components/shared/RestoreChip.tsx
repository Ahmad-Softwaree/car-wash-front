import Chip from "@mui/joy/Chip";
import Tooltip from "@mui/joy/Tooltip";
import { RotateCcw } from "lucide-react";

const RestoreChip = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Tooltip placement="top" title="گێڕانەوە" color="warning" variant="soft">
      <Chip onClick={onClick} variant="soft" color="warning">
        <RotateCcw className="w-7 h-7 p-1 cursor-pointer" />{" "}
      </Chip>
    </Tooltip>
  );
};

export default RestoreChip;
