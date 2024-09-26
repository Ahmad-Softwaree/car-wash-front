import { Chip } from "@mui/joy";
import { Printer } from "lucide-react";
import MyButton from "./MyButton";
import { PrintModalProps } from "@/types/global";
import Loading from "./Loading";
import { TailSpin } from "react-loader-spinner";
import PDFViewer from "../shared/PDFViewer";

export default function PrintModal({ onClose, id, printFn }: PrintModalProps) {
  const { data, isLoading, isPending } = printFn();
  return (
    <div className="w-full  h-full flex flex-col justify-center bg-transparent items-center gap-5">
      <Chip variant="soft" color="warning">
        <Printer className="w-11 h-11 p-2 cursor-pointer" />
      </Chip>
      <p className="w-full text-center text-md text-black">
        دڵنیای لە پرنتکردنی ئەم وەصڵە
      </p>
      {isLoading || isPending ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : data ? (
        <PDFViewer data={data} />
      ) : null}
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <MyButton
          name="closeDeleteModal"
          onClick={onClose}
          type="button"
          className="my-2 bg-red-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
          <p className="font-light text-sm font-bukra">نەخێر</p>
        </MyButton>

        <MyButton
          name="closeDeleteModal"
          onClick={() => {
            let objFra = document.getElementById(
              "myFrame"
            ) as HTMLIFrameElement;
            objFra?.contentWindow?.focus();
            objFra?.contentWindow?.print();
          }}
          disabled={isLoading}
          type="button"
          className="my-2 bg-green-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
          <p className="font-light text-sm font-bukra">بەڵێ</p>
        </MyButton>
      </div>
    </div>
  );
}
