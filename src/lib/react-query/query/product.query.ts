import { useToast } from "@/components/ui/use-toast";
import {
  AddProductF,
  AddProductQ,
  CountProductF,
  CountProductQ,
  DeleteProductQ,
  GetProductByIdQ,
  GetProductsInAddQ,
  GetProductsLessQ,
  GetProductsQ,
  UpdateProductF,
  UpdateProductQ,
} from "@/types/products";
import { Id, NestError, Page, PaginationReturnType } from "@/types/global";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import {
  addProduct,
  countProduct,
  deleteProduct,
  getLessProducts,
  getProductById,
  getProducts,
  getProductsInAdd,
  updateProduct,
} from "../actions/product.action";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { deleteImage, insertImage } from "../actions/firebase.action";
import { ref, StorageReference } from "firebase/storage";
import { firebaseStorage } from "@/lib/config/firebase.config";

export const useGetProductsInAdd = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.PRODUCTS_IN_ADD],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetProductsInAddQ>> =>
      getProductsInAdd(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetLessProducts = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.LESS_PRODUCTS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetProductsLessQ>> =>
      getLessProducts(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetProducts = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.PRODUCTS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetProductsQ>> =>
      getProducts(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useGetProductById = (id: Id | null) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.PRODUCT_BY_ID, id],
    queryFn: (): Promise<GetProductByIdQ> => getProductById(toast, id),
    retry: 0,
    enabled: !!id,
  });
};

export const useAddProduct = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: async (form: AddProductF): Promise<AddProductQ> => {
      let imageRef: StorageReference | null = null;

      try {
        const {
          image_url,
          image_name,
          imageRef: ref,
        } = await insertImage(
          form.image[0],
          ENUMs.PRODUCT_BUCKET as string,
          toast
        );
        imageRef = ref;
        let { image, ...others } = form;
        let finalForm = { image_url, image_name, ...others };

        const result = await addProduct(finalForm);

        return result;
      } catch (error: any) {
        if (imageRef) {
          await deleteImage(imageRef, toast);
        }
        throw error;
      }
    },
    onSuccess: (data: AddProductQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.PRODUCTS_IN_ADD],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
export const useUpdateProduct = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateProductF): Promise<UpdateProductQ> => {
      let imageRef: StorageReference | null = null;
      let oldImageRef: StorageReference | null = null;

      //if new image uploaded -> delete old -> upload new
      if (form.image && form.image[0]) {
        if (form.old_image_url != "") {
          oldImageRef = ref(firebaseStorage, form.old_image_url);
          await deleteImage(oldImageRef, toast);
        }
        try {
          const {
            image_url,
            image_name,
            imageRef: ref,
          } = await insertImage(
            form.image[0],
            ENUMs.PRODUCT_BUCKET as string,
            toast
          );

          imageRef = ref;
          let { image, ...others } = form;
          let finalForm = { image_url, image_name, ...others };
          let { old_image_name, old_image_url, ...final } = finalForm;

          const result = await updateProduct(final, id);

          return result;
        } catch (error: any) {
          if (imageRef) {
            await deleteImage(imageRef, toast);
          }
          throw error;
        }
      } else {
        let image_url = form.old_image_url;
        let image_name = form.old_image_name;
        let finalForm = { image_url, image_name, ...form };
        let { old_image_name, old_image_url, ...final } = finalForm;

        return await updateProduct(final, id);
      }
    },
    onSuccess: (data: UpdateProductQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.PRODUCT_BY_ID, id],
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.PRODUCTS_IN_ADD],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
export const useCountProduct = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: async (form: CountProductF): Promise<CountProductQ> =>
      countProduct(form, id),
    onSuccess: (data: CountProductQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.LESS_PRODUCTS],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
export const useDeleteProduct = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<DeleteProductQ> => deleteProduct(id),
    onSuccess: (data: DeleteProductQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.PRODUCT_BY_ID, id],
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.PRODUCTS_IN_ADD],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
