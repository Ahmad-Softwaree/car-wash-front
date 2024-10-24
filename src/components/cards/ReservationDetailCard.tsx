import { ReservationCardProps } from "@/types/reservation";
import { FormFinalOperation } from "@/types/global";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import {
  Banknote,
  Calendar,
  Car,
  Fingerprint,
  HandPlatter,
  Key,
  PaintbrushVertical,
  Phone,
  User,
} from "lucide-react";
import InputGroup from "../ui/InputGroup";
import InputAddon from "../ui/InputAddon";
import Label from "../ui/Label";
import Input from "../ui/Input";
import { formateDateToYMDHM } from "@/lib/functions";
import Textarea from "../ui/Textarea";

const ReservationDetailCard = ({
  customer_name,
  color_name,
  car_number,
  car_model_name,
  car_type_name,
  service_name,
  price,
  note,
  date_time,
  id,
  onClose,
}: FormFinalOperation & ReservationCardProps) => {
  return (
    <div className="space-y-4  dark-light  rounded-lg default-border bg-transparent py-2 w-full  shadow-4xl mt-2">
      <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
        <p className="text-sm">زانیاری سەرە</p>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>نرخ</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Banknote />
            </InputAddon>

            <Input
              value={price}
              name="price"
              disabled
              type="text"
              dir="ltr"
              placeholder="ناو"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>ژمارەی ئۆتۆمبێل</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Car />
            </InputAddon>

            <Input
              value={car_number}
              name="car_number"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>ناوی موشتەری</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <User />
            </InputAddon>

            <Input
              value={customer_name}
              name="customer_name"
              disabled
              type="text"
              dir="ltr"
              placeholder="ناو"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>بەروار و کاتی سەرە</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Calendar />
            </InputAddon>

            <Input
              value={formateDateToYMDHM(date_time as string)}
              name="date"
              disabled
              type="text"
              dir="ltr"
              placeholder="ژمارە تەلەفۆن"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>

      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>جۆری خزمەتگوزاری</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <HandPlatter />
            </InputAddon>

            <Input
              value={service_name}
              name="service_name"
              disabled
              type="text"
              dir="ltr"
              placeholder="ناوی بەکارهێنەر"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>ڕەنگ</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <PaintbrushVertical />
            </InputAddon>

            <Input
              value={color_name}
              name="color_name"
              disabled
              type="text"
              dir="ltr"
              placeholder="ڕەنگ"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>جۆری ئۆتۆمبێل</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Car />
            </InputAddon>

            <Input
              value={car_type_name}
              name="car_type_name"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>مۆدێلی ئۆتۆمبێڵ</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Car />
            </InputAddon>

            <Input
              value={car_model_name}
              name="car_model_name"
              disabled
              type="text"
              dir="ltr"
              placeholder="مۆدێلی ئۆتۆمبێڵ"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full  flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>تێبینی</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <Textarea
              value={note || ""}
              name="note"
              disabled
              dir="ltr"
              rows={12}
              placeholder="ناو"
              className="placeholder:text-right w-full bg-transparent font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailCard;
