import { Chip } from "@mui/joy";
import { Printer } from "lucide-react";
import { PrintModalProps } from "@/types/global";
import Loading from "./Loading";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";

export default function POSModal({ onClose, id, printFn }: PrintModalProps) {
  const { isLoading, isPending } = printFn();

  // Effect to close the modal when loading is complete
  useEffect(() => {
    if (!isLoading && !isPending) {
      onClose(); // Call the onClose function to unmount the modal
    }
  }, [isLoading, isPending, onClose]);

  // Render the modal only when loading
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

  // If not loading, return null to unmount the component
  return null;
}
