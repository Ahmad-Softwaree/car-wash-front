import {
  Id,
  ImageTypeInDatabase,
  ImageTypeInForm,
  MaybeImageTypeInDatabase,
} from "./global";

export type ProductCard = {
  id: Id;
  image_url: string;
  image_name: string;
  title: string;
  count?: number;
};
export type ProductInformation = {
  barcode: string;
  cartoonSum: number;
  withoutBarcode?: boolean;
  oneSum: number;
  oneDollarPrice: number;
  cost: number;
  cartoonSellPrice: number;
  oneSellPrice: number;
  cartoonJumlaPrice: number;
  oneJumlaPrice: number;
  note: string;
  sold?: number;
  frosh?: Id;
};

export type ProductLess = ProductCard & {
  cost?: number;
};
export type LessProductCardProps = ProductCard & {
  cost?: number;
  frosh?: Id;
};

export type PsulaProductCardProps = ProductCard & {
  onClick: (id: Id) => void;
  cost?: number;
  frosh?: Id;
};
export type Product = ProductCard & ProductInformation;

export type AddProductCardProps = ProductCard & {
  onClick: (id: Id) => void;
};

export type MostProductCardProps = Product;
export type AddProductInputs = {
  title: string;
  barcode: string;
  withoutBarcode: boolean;
  cartoonSum: number;
  oneSum: number;
  oneDollarPrice: number;
  cost: number;
  cartoonSellPrice: number;
  oneSellPrice: number;
  cartoonJumlaPrice: number;
  oneJumlaPrice: number;
  note: string;
};

export type AddProductF = AddProductInputs & ImageTypeInForm;

export type AddProductWithFirebaseImage = AddProductInputs &
  ImageTypeInDatabase;
export type UpdateProductWithFirebaseImage = AddProductInputs &
  MaybeImageTypeInDatabase;

export type CountProductF = {
  count: number;
};
export type UpdateProductF = AddProductInputs &
  ImageTypeInForm & {
    old_image_url?: string;
    old_image_name?: string;
  };

export type GetProductsQ = Product[];

export type AddProductQ = Product;
export type UpdateProductQ = Product;

export type CountProductQ = Product;
export type DeleteProductQ = Id;

export type GetProductByIdQ = Product | null | undefined;

export type GetProductsInAddQ = ProductInformation[];
export type GetProductsLessQ = ProductLess[];
