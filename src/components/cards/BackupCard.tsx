import { BackupCardProps } from "@/types/backup";
import { Td, Tr } from "../ui";
import Chip from "@mui/joy/Chip";
import { formateDateToYMDHM, formatDateToDDMMYY } from "@/lib/functions";

const BackupCard = ({
  table,
  user_id,
  user_name,
  user_role,
  id,
  created_at,
  updated_at,
  index = -1,
  ...others
}: BackupCardProps) => {
  return (
    <>
      <Tr
        className={`default-border table-row-hover table-row-normal
        }`}
        key={id}
      >
        <Td className="!p-3">
          <p className="text-right font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">{table}</p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {user_name}
          </p>
        </Td>
        <Td className="!p-3">
          <Chip
            variant="soft"
            color={user_role == "سوپەر ئەدمین" ? "danger" : "neutral"}
          >
            <p className="!font-bukra text-right font-light  text-xs">
              {user_role}
            </p>
          </Chip>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {formatDateToDDMMYY(created_at?.toString() || "")}
          </p>
        </Td>
      </Tr>
    </>
  );
};

export default BackupCard;
