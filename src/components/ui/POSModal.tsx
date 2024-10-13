import { Chip } from "@mui/joy";
import { Printer } from "lucide-react";
import { PrintModalProps } from "@/types/global";
import Loading from "./Loading";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";

export default function POSModal({ onClose, id, printFn }: PrintModalProps) {
  const { isLoading, isPending } = printFn();

  useEffect(() => {
    if (!isLoading && !isPending) {
      onClose();
    }
  }, [isLoading, isPending, onClose]);

  if (isLoading || isPending) {
    return (
      <div className="w-full h-full flex flex-col justify-center bg-transparent items-center gap-2">
        <Chip variant="soft" color="warning">
          <Printer className="w-11 h-11 p-2 cursor-pointer" />
        </Chip>
        <Loading>
          <TailSpin />
        </Loading>
      </div>
    );
  }
  return null;
}
