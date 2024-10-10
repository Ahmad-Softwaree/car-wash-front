import { VultrBackupCardProps } from "@/types/backup";
import { Td, Tr } from "../ui";
import Chip from "@mui/joy/Chip";
import { formateDateToYMDHM, formatDateToDDMMYY } from "@/lib/functions";

const VultrBackupCard = ({
  id,
  date_created,
  description,
  size,
  status,
  index = -1,
}: VultrBackupCardProps) => {
  return (
    <>
      <Tr
        className={`default-border table-row-hover table-row-normal
        }`}
        key={id}
      >
        <Td className="!p-3">
          <p className="text-center font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {description}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{size}</p>
        </Td>
        <Td className="!p-3">
          <Chip
            variant="soft"
            color={status != "completed" ? "danger" : "neutral"}
          >
            <p className="!font-bukra text-right font-light  text-xs">
              {status}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {formatDateToDDMMYY(date_created?.toString() || "")}
          </p>
        </Td>
      </Tr>
    </>
  );
};

export default VultrBackupCard;
