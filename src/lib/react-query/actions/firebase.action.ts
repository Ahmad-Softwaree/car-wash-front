import {
  deleteObject,
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
import { ToastType } from "@/types/global";
import {
  Bucket,
  FirebaseDownloadUrl,
  FirebaseImageType,
  InsertImageReturnType,
} from "@/types/firebase";
import { firebaseStorage } from "@/lib/config/firebase.config";

export const deleteImage = async (
  imageRef: StorageReference,
  toast: ToastType
): Promise<void> => {
  try {
    await deleteObject(imageRef);
    toast({
      title: "Success",
      description: "وێنە بەسەرکەوتووی سڕایەوە",
    });
  } catch (error: any) {
    throw error;
  }
};

export const insertImage = async (
  image: FirebaseImageType,
  bucket: Bucket,
  toast: ToastType
): Promise<InsertImageReturnType> => {
  try {
    if (image && image !== null) {
      const imageRef: StorageReference = ref(
        firebaseStorage,
        `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}/${bucket}/${
          image.name + Date.now()
        }`
      );
      const data: UploadResult = await uploadBytes(imageRef, image);
      const image_url: FirebaseDownloadUrl = await getDownloadURL(data.ref);
      toast({
        title: "Success",
        description: "Image Uploaded Successfully",
      });
      return { image_url, image_name: data.metadata.name, imageRef };
    } else {
      throw new Error("تکایە وێنە داخڵ بکە");
    }
  } catch (error: any) {
    throw error;
  }
};
