import BackupFilter from "./BackupFilter";
import ExpenseFilter from "./ExpenseFilter";
import ItemFilter from "./ItemFilter";
import SellFilter from "./SellFilter";
import UserFilter from "./UserFilter";

const FilterModal = ({
  type,
  onClose,
}: {
  type: "item" | "sell" | "user" | "expense" | "backup";
  onClose: () => void;
}) => {
  return type == "item" ? (
    <ItemFilter onClose={onClose} />
  ) : type == "sell" ? (
    <SellFilter onClose={onClose} />
  ) : type == "user" ? (
    <UserFilter onClose={onClose} />
  ) : type == "expense" ? (
    <ExpenseFilter onClose={onClose} />
  ) : type == "backup" ? (
    <BackupFilter onClose={onClose} />
  ) : null;
};

export default FilterModal;
