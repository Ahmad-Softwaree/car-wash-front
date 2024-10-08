import { Id } from "./global";

export type GetPrintersQ = Printer[];

export type Printer = {
  name: string;
  active: boolean;
  id: Id;
};

export type PrinterCardProps = Printer & { index?: number };

export type AddPrinterInputs = {
  name: string;
};

export type AddPrinterF = AddPrinterInputs;

export type UpdatePrinterF = AddPrinterInputs;
export type AddPrinterQ = Printer;

export type UpdatePrinterQ = Printer;

export type DeletePrinterQ = Id[];
