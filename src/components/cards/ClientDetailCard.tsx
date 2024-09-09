import { ClientCardProps } from "@/types/client";
import { FormFinalOperation } from "@/types/global";
import Image from "../ui/Image";
import { Fingerprint } from "lucide-react";

const ClientDetailCard = ({
  image_name,
  image_url,
  first_name,
  last_name,
  city_name,
  id,
  street,
  phone,
  phone1,
}: FormFinalOperation & ClientCardProps) => {
  return (
    <div
      id={id.toLocaleString()}
      className="w-full  overflow-hidden bg-white rounded-lg  ">
      <Image
        className="object-cover object-center w-full h-56"
        image={image_url}
        preview={first_name.charAt(0)}
        alt={image_name || ""}
      />

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
          <h1 className="text-md font-semibold text-gray-800 ">شار:</h1>
          <p className="text-sm font-poppins">{city_name}</p>
        </div>
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1 className="text-md font-semibold text-gray-800 ">جادە:</h1>
          <p className="text-sm font-poppins">{street}</p>
        </div>
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1 className="text-md font-semibold text-gray-800 ">
            ژمارە تەلەفۆن:
          </h1>
          <p className="text-sm font-poppins">{phone}</p>
        </div>
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1 className="text-md font-semibold text-gray-800 ">
            ژمارە تەلەفۆن:
          </h1>
          <p className="text-sm font-poppins">{phone1}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailCard;
