import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  Dispatch,
  ElementType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { FieldError, FieldValues, SubmitHandler } from "react-hook-form";
import { ChangeProfileQ, GetAuthQ, GetUsersQ, User } from "./auth";
import { Item, ItemCard, ItemInformation, ItemQuantityHistory } from "./items";
import { Expense } from "./expense";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Employee } from "./employee";
import { Toast, ToasterToast } from "@/components/ui/use-toast";
import { Customer } from "./customer";
import { Role } from "./role";
import { ExpenseType } from "./expense-type";
import { CarType } from "./car-type";
import { CarModel } from "./car-model";
import { ItemType } from "./item-type";
import { Color } from "./color";
import { Service } from "./service";
import { Sell, SellItem } from "./sell";
import { Reservation } from "./reservation";
import { Backup } from "./backup";

export type GlobalFormProps = {
  state?: "update" | "insert";
};

export type TypographyProps = PropsWithChildren<{ text: string }> &
  ComponentPropsWithoutRef<"div">;
export type FormatMoneyProps = PropsWithChildren<{}> &
  ComponentPropsWithRef<"div">;

export type NoDataProps = PropsWithChildren<{}> &
  ComponentPropsWithoutRef<"div">;
export type ComponentGridProps = PropsWithChildren<{}> &
  ComponentPropsWithoutRef<"div">;
export type PaginationObject<T extends DataTypes> = {
  paginatedData: T;
  meta: {
    nextPageUrl: string;
    total: number;
  };
};
export type Status = 400 | 401 | 402 | 403 | 404 | 500;

export type PaginationReturnType<T extends DataTypes> = InfiniteData<
  PaginationObject<T>
>;
export type LastPagePaginationType<T extends DataTypes> = PaginationObject<T>;

export type QueryResult<T extends DataTypes> = {
  isFetchingNextPage: boolean;
  data: PaginationReturnType<T> | undefined;
  hasNextPage: boolean;
  isLoading: boolean;
  refetch: (options?: RefetchOptions) => void;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult>;
};
export type DataTypes =
  | Item[]
  | Expense[]
  | GetAuthQ
  | ChangeProfileQ
  | GetUsersQ
  | User[]
  | ItemCard[]
  | Item[]
  | ItemInformation[]
  | Customer[]
  | Role[]
  | ExpenseType[]
  | CarType[]
  | CarModel[]
  | ItemType[]
  | Color[]
  | Service[]
  | Sell[]
  | SellItem[]
  | Reservation[]
  | Backup[]
  | ItemQuantityHistory[]
  | CaseReport[];

export type PaginationChildrenProps<T extends DataTypes> = {
  isFetchingNextPage: boolean;
  data: PaginationReturnType<T> | undefined;
  hasNextPage: boolean;
  isLoading: boolean;
  searchLoading: boolean;
  ref: (node?: Element | null) => void;
  refetch: (options?: RefetchOptions) => void;
  isSearched: boolean;
  searchData: T | undefined;
  searchRefetch: (options?: RefetchOptions) => void;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult>;
};

export type PaginationPages = "items" | "expenses";

export type PaginationProps<T extends DataTypes> = {
  page?: PaginationPages;
  children: (props: PaginationChildrenProps<T>) => ReactNode;
  queryFn: any;
  searchQueryFn?: any;
  type?: string | number;
};

export type Page = undefined | number;
export type Limit = undefined | number;
export type Search = undefined | string;
export type Filter = undefined | string;
export type From = undefined | string;
export type To = undefined | string;

export type SearchString = string | number;

export type DeleteModalProps = {
  onClose: () => void;
  finalOperator?: () => void;
  deleteFunction: any;
  loading: boolean;
};

export type CalculatorProps = {
  money: number;
};
export type PrintModalProps = {
  onClose: () => void;
  id?: Id;
  printFn: any;
};
export type RestoreModalProps = {
  onClose: () => void;
  finalOperator?: () => void;
  deleteFunction: any;
  loading: boolean;
};
export type CompleteModalProps = {
  onClose: () => void;
  finalOperator?: () => void;
  deleteFunction: any;
  loading: boolean;
};
export type DialogProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
}> &
  ComponentPropsWithoutRef<"dialog">;
export type ReturnProps = PropsWithChildren<{
  link?: string;
}>;
export type ContainerProps<T extends ElementType> = PropsWithChildren<
  {
    as?: T;
  } & ComponentPropsWithoutRef<T>
>;
export type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
} & ComponentPropsWithoutRef<"form">;
export type FormHandle = {
  clear: () => void;
};
export type InputProps = {} & ComponentPropsWithRef<"input">;
export type InputAddonProps = PropsWithChildren<
  {} & ComponentPropsWithRef<"div">
>;

export type InputGroupProps = PropsWithChildren<
  {
    error?: FieldError;
  } & ComponentPropsWithRef<"div">
>;

export type Id = number;
export type LoadingProps = PropsWithChildren<{
  screen?: boolean;
}> &
  ComponentPropsWithoutRef<"div">;
export type LabelProps = PropsWithChildren<{} & ComponentPropsWithRef<"label">>;

export type SelectProps = PropsWithChildren<
  {} & ComponentPropsWithRef<"select">
>;

export type OptionProps = PropsWithChildren<
  {} & ComponentPropsWithRef<"option">
>;
export type ImageProps = {
  image: any;
  preview?: string;
  divClassName?: string;
} & ComponentPropsWithoutRef<"img">;

export type TextareaProps = {} & ComponentPropsWithRef<"textarea">;
export type MyButtonProps = PropsWithChildren<
  { loading?: boolean } & ComponentPropsWithRef<"button">
>;
export type QueryProviderType = PropsWithChildren<{}>;

export type SideLink = {
  id: string;
  icon: ReactElement;
  name: string;
  link: string;
  type: "general" | "manage" | "report" | "setting" | "deleted" | "backup";
};
export type HeaderItem = {
  id: Id;
  icon: string;
  text: string;
};
export type DropDownItem = {
  id: Id;
  icon: ReactElement;
  text: string;
  color?: string;
  onClick?: () => void;
  loading?: boolean;
};

export type NestErrorMessage = string;

export type NestError<T = unknown, N = any> = AxiosError<T, N>;
export type Token = string;
export type RouterProviderType = {
  Component: ElementType;
};
export type ChakraUIProviderType = PropsWithChildren<{}>;

export type InfoTypeProps = PropsWithChildren<{
  title: string;
  body: string | number;
}>;

export type ImageTypeInForm = {
  image: FileList;
};

export type ImageTypeInDatabase = {
  image_url: string;
  image_name: string;
};
export type MaybeImageTypeInDatabase = {
  image_url?: string;
  image_name?: string;
};
export type ComboboxExtendTypes = Employee;

export type ReactSetterExtendTypes = string;

export type ReactSetter<T extends ReactSetterExtendTypes> = React.Dispatch<
  React.SetStateAction<T>
>;

export type ComboboxProps<T extends ComboboxExtendTypes> = {
  onSelect: (id: Id, setHolder: ReactSetter<string>, one: T) => void;
  data: T[] | undefined;
};

export type GlobalStateType = {
  oldData: any;
  checked: any;
  check_type: "all" | "one";
  theme: "dark" | "light";
};
export type GlobalPayload<T> = {
  oldData: T;
};

export type GlobalContextType = {
  state: GlobalStateType;
  dispatch: Dispatch<any>;
};

export type GlobalActionType = {
  type: string;
  payload?: any;
};

export type CreditCardProps = PropsWithChildren<{
  title: string;
  color?: "green" | "purple" | "pink" | "gray";
  type?: "big" | "small";
}> &
  ComponentPropsWithRef<"article">;

export type TableProps = PropsWithChildren<{}> & ComponentPropsWithRef<"table">;

export type THeadProps = PropsWithChildren<{}> & ComponentPropsWithRef<"thead">;

export type TFootProps = PropsWithChildren<{}> & ComponentPropsWithRef<"tfoot">;
export type THProps = PropsWithChildren<{}> & ComponentPropsWithRef<"th">;

export type TBodyProps = PropsWithChildren<{}> & ComponentPropsWithRef<"tbody">;

export type TrProps = PropsWithChildren<{}> & ComponentPropsWithRef<"tr">;

export type TdProps = PropsWithChildren<{}> & ComponentPropsWithRef<"td">;
export type ScreenSizes = "sm" | "md" | "lg" | "xl" | "xs";
export type Cookie = {
  name: string;
  token?: Token | null;
};

export type FormFinalOperation = {
  onClose?: () => void;
};

export type ToastType = ({ ...props }: Toast) => {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};

export type CatchError = NestError | AxiosError;

export type CaseReport = {
  id: number;
  created_by: string;
  user_id: number;
  sold: number | string;
  sold_price: number | string;
};

export type CaseReportCardProps = CaseReport & { index?: number };

export type GetCasesQ = CaseReport[];
