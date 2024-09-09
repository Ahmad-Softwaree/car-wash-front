import { useToast } from "@/components/ui/use-toast";
import {
  AddUserF,
  AddUserQ,
  DeleteUserQ,
  GetUsersQ,
  UpdateUserF,
  UpdateUserQ,
} from "@/types/auth";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../actions/user.action";
import { QUERY_KEYs } from "../key";
import { Id, NestError, Page, PaginationReturnType } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { ref, StorageReference } from "firebase/storage";
import { firebaseStorage } from "@/lib/config/firebase.config";
import { deleteImage, insertImage } from "../actions/firebase.action";

export const useGetUsers = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.USERS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetUsersQ>> =>
      getUsers(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useAddUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddUserF): Promise<AddUserQ> => addUser(form),
    onSuccess: (data: AddUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateUser = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateUserF): Promise<UpdateUserQ> => {
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
            ENUMs.USER_BUCKET as string,
            toast
          );

          imageRef = ref;
          let { image, ...others } = form;
          let finalForm = { image_url, image_name, ...others };
          let { old_image_name, old_image_url, ...final } = finalForm;

          const result = await updateUser(final, id);

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

        return await updateUser(final, id);
      }
    },
    onSuccess: (data: UpdateUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteUser = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<DeleteUserQ> => deleteUser(id),
    onSuccess: (data: DeleteUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
