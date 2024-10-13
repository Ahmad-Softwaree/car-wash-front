import BackupFilter from "./BackupFilter";
import ExpenseFilter from "./ExpenseFilter";
import GlobalCaseFilter from "./GlobalCaseFilter";
import ItemFilter from "./ItemFilter";
import ItemReportFilter from "./ItemReportFilter";
import KogaMovementReportFilter from "./KogaMovementReportFilter";
import KogaReportFilter from "./KogaReportFilter";
import SellFilter from "./SellFilter";
import SellReportFilter from "./SellReportFilter";
import UserFilter from "./UserFilter";

const FilterModal = ({
  type,
  onClose,
}: {
  type:
    | "item"
    | "sell"
    | "user"
    | "expense"
    | "backup"
    | "sell_report"
    | "item_report"
    | "koga_report"
    | "koga_report_movement"
    | "global_case";
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
  ) : type == "sell_report" ? (
    <SellReportFilter onClose={onClose} />
  ) : type == "item_report" ? (
    <ItemReportFilter onClose={onClose} />
  ) : type == "koga_report" ? (
    <KogaReportFilter onClose={onClose} />
  ) : type == "koga_report_movement" ? (
    <KogaMovementReportFilter onClose={onClose} />
  ) : type == "global_case" ? (
    <GlobalCaseFilter onClose={onClose} />
  ) : null;
};

export default FilterModal;
