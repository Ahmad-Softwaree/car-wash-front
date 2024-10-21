import { FormFinalOperation } from "@/types/global";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import { BadgePercent, Barcode, FolderPen, Hash, User } from "lucide-react";
import InputGroup from "../ui/InputGroup";
import InputAddon from "../ui/InputAddon";
import Label from "../ui/Label";
import Input from "../ui/Input";
import { ItemCardProps } from "@/types/items";
import Textarea from "../ui/Textarea";
import Image from "../ui/Image";

const ItemDetailCard = ({
  name,
  quantity,
  actual_quantity,
  image_name,
  image_url,
  item_less_from,
  barcode,
  type_name,
  type_id,
  created_by,
  updated_by,
  item_purchase_price,
  item_sell_price,
  note,
  id,
  onClose,
}: FormFinalOperation & ItemCardProps) => {
  return (
    <div className="space-y-4  dark-light   rounded-lg default-border bg-transparent py-2 w-full shadow-4xl mt-2">
      <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
        <p className="text-sm">زانیاری مەواد</p>
      </div>
      <Divider>
        <Chip
          className="!font-bukra my-5"
          variant="soft"
          color="neutral"
          size="sm"
        >
          زانیاری گشتی
        </Chip>
      </Divider>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>ناو</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <FolderPen />
            </InputAddon>

            <Input
              value={name}
              name="name"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>بارکۆد</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Barcode />
            </InputAddon>

            <Input
              value={barcode}
              name="name"
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
            <p>جۆر</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <Input
              value={type_name}
              name="type_name"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-full font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>نرخی کڕین</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <BadgePercent />
            </InputAddon>

            <Input
              value={item_purchase_price}
              name="item_purchase_price"
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
            <p>نرخی فڕۆشتن</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <BadgePercent />
            </InputAddon>

            <Input
              value={item_sell_price}
              name="item_sell_price"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>کەمترین عددی مەواد</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <BadgePercent />
            </InputAddon>

            <Input
              value={item_less_from}
              name="item_less_from"
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
            <p>دانەی کڕاو</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Hash />
            </InputAddon>

            <Input
              value={quantity}
              name="quantity"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>دانەی فرۆشراو</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Hash />
            </InputAddon>

            <Input
              value={quantity - actual_quantity}
              name="quantity"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>دانەی کۆگا</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Hash />
            </InputAddon>

            <Input
              value={actual_quantity}
              name="actual_quantity"
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
            <p>داغڵکراوە لەلایەن</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <User />
            </InputAddon>

            <Input
              value={created_by}
              name="created_by"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>چاککراوە لەلایەن</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <User />
            </InputAddon>

            <Input
              value={updated_by}
              name="updated_by"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 px-3">
        <Label className="w-full text-sm  flex flex-row gap-2">
          <p>تێبینی</p>
        </Label>
        <InputGroup className="w-full text-input 0">
          <Textarea
            rows={6}
            value={note}
            name="note"
            disabled
            dir="ltr"
            className="placeholder:text-right w-full font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm !bg-transparent"
          />
        </InputGroup>
      </div>
      {image_url && image_url != "" && (
        <div className="w-full flex flex-col gap-2 px-3">
          <p>وێنە</p>
          <Image
            className="w-full max-w-xl h-[400px] object-cover"
            image={image_url}
          />
        </div>
      )}
    </div>
  );
};

export default ItemDetailCard;
