import { CustomerCardProps } from "@/types/customer";
import { FormFinalOperation } from "@/types/global";
import { Fingerprint } from "lucide-react";

const CustomerDetailCard = ({
  first_name,
  last_name,
  id,
  phone,
}: FormFinalOperation & CustomerCardProps) => {
  return (
    <div
      id={id.toLocaleString()}
      className="w-full  overflow-hidden bg-white rounded-lg  ">
      <div className="flex items-center px-3 py-1 bg-gray-900">
        <Fingerprint className="text-white text-md" />
        <h1 className="mx-3 text-md font-semibold text-white">کڕیار</h1>
      </div>

      <div className="px-6 py-4 space-y-2">
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1 className="text-md font-semibold text-gray-800 ">ناو:</h1>
          <p className="text-sm font-poppins">
            {first_name} {last_name}
          </p>
        </div>

        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1 className="text-md font-semibold text-gray-800 ">
            ژمارە تەلەفۆن:
          </h1>
          <p className="text-sm font-poppins">{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailCard;
