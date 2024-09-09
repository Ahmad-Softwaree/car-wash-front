import { StorageReference } from "firebase/storage";

export type FirebaseImageType = File;

export type Bucket = string;

export type FirebaseDownloadUrl = string;

export type InsertImageReturnType = {
  image_url: FirebaseDownloadUrl;
  image_name: string;
  imageRef: StorageReference;
};
