import { useToast } from "@/components/ui/use-toast";
import {
  AddClientF,
  AddClientQ,
  DeleteClientQ,
  GetClientsQ,
  UpdateClientF,
  UpdateClientQ,
} from "@/types/client";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addClient,
  deleteClient,
  getClients,
  updateClient,
} from "../actions/client.action";
import { QUERY_KEYs } from "../key";
import { Id, NestError, Page, PaginationReturnType } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { ref, StorageReference } from "firebase/storage";
import { firebaseStorage } from "@/lib/config/firebase.config";
import { deleteImage, insertImage } from "../actions/firebase.action";

export const useGetClients = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.CLIENTS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetClientsQ>> =>
      getClients(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useAddClient = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: AddClientF): Promise<AddClientQ> => {
      let imageRef: StorageReference | null = null;

      try {
        const {
          image_url,
          image_name,
          imageRef: ref,
        } = await insertImage(
          form.image[0],
          ENUMs.CLIENT_BUCKET as string,
          toast
        );
        imageRef = ref;
        let { image, ...others } = form;
        let finalForm = { image_url, image_name, ...others };

        const result = await addClient(finalForm);

        return result;
      } catch (error: any) {
        if (imageRef) {
          await deleteImage(imageRef, toast);
        }
        throw error;
      }
    },
    onSuccess: (data: AddClientQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CLIENTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateClient = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateClientF): Promise<UpdateClientQ> => {
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
            ENUMs.CLIENT_BUCKET as string,
            toast
          );

          imageRef = ref;
          let { image, ...others } = form;
          let finalForm = { image_url, image_name, ...others };
          let { old_image_name, old_image_url, ...final } = finalForm;

          const result = await updateClient(final, id);

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

        return await updateClient(final, id);
      }
    },
    onSuccess: (data: UpdateClientQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CLIENTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteClient = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<DeleteClientQ> => deleteClient(id),
    onSuccess: (data: DeleteClientQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CLIENTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
