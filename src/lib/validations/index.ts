import { Id } from "@/types/global";
import { string } from "@/types/part";
import { string } from "@/types/role";
import * as yup from "yup";

export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
];
export const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

const isBlobOrMediaSource = (value: any) => {
  return value instanceof Blob || value instanceof MediaSource;
};
const fileSchema = yup
  .mixed()
  .required("File is required")
  .test(
    "is-blob-or-mediasource",
    "File must be a Blob or MediaSource",
    isBlobOrMediaSource
  );

export const addItemSchema = yup
  .object({
    item_image: yup.object().required(),
    barcode: yup.string().required(),
    withoutBarcode: yup.boolean().required(),
    name: yup.string().required(),
    cartoonSum: yup.number().positive().integer().required(),
    oneSum: yup.number().positive().integer().required(),
    oneDollarPrice: yup.number().positive().integer().required(),
    cartoonSellPrice: yup.number().positive().integer().required(),
    oneSellPrice: yup.number().positive().integer().required(),
    cartoonJumlaPrice: yup.number().positive().integer().required(),
    oneJumlaPrice: yup.number().positive().integer().required(),
    cost: yup.number().positive().integer().required(),
    note: yup.string(),
  })
  .required();

const roleSchema = yup.object({
  name: yup.mixed<string>().oneOf(["accountant", "cashier"]).required(),
  id: yup.mixed<Id>().required(),
});

const partSchema = yup.object({
  name: yup
    .mixed<string>()
    .oneOf([
      "selling",
      "koga",
      "add",
      "psula",
      "create_psula",
      "dept",
      "less",
      "mandub",
      "employee",
      "users",
      "customers",
      "expense",
      "report",
      "case",
      "setting",
    ])
    .required(),
  id: yup.mixed<Id>().required(),
});

export const addUserSchema = yup
  .object({
    name: yup.string().required(),
    role: roleSchema.required(),
    image: fileSchema.required(),
    parts: yup.array(partSchema).required(),
  })
  .required();
