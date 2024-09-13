import Container from "@/components/ui/Container";
import { lazy, useMemo, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));
const UserCard = lazy(() => import("@/components/cards/UserCard"));

import {
  useDeleteUser,
  useGetDeletedUsers,
  useGetUsers,
  useRestoreUser,
  useSearchDeletedUsers,
  useSearchUsers,
} from "@/lib/react-query/query/user.query";
import Pagination from "@/components/providers/Pagination";
import { User } from "@/types/auth";
import UserForm from "@/components/forms/UserForm";
import TBody from "@/components/ui/TBody";
import { Table, Td, Th, THead, Tr } from "@/components/ui";

import Input from "@/components/ui/Input";
import { InputGroup } from "@chakra-ui/react";

import { CONTEXT_TYPEs } from "@/context/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

import DeleteModal from "@/components/ui/DeleteModal";
import TFoot from "@/components/ui/TFoot";
import CustomClose from "@/components/shared/CustomClose";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import DeleteChip from "@/components/shared/DeleteChip";
import RestoreChip from "@/components/shared/RestoreChip";
import Search from "@/components/shared/Search";
import AddButton from "@/components/shared/AddButton";
import RestoreModal from "@/components/ui/RestoreModal";
import Filter from "@/components/shared/Filter";
import { Role } from "@/types/role";
import { useGetRoles } from "@/lib/react-query/query/role.query";

const Users = () => {
  const { deleted_page } = useCheckDeletedPage();
  const { mutateAsync, isPending } = useDeleteUser();
  const { mutateAsync: restore, isPending: restoreLoading } = useRestoreUser();

  const [searchParam, setSearchParam] = useSearchParams();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const { data: roles } = useGetRoles();
  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start">
        <div className="w-full gap-5 flex flex-row justify-between">
          <div className="w-full flex flex-row justify-start items-center gap-3">
            <Search />
            {roles && (
              <Filter<Role>
                options={roles.map((val: Role, _index: number) => {
                  return { value: val.id, label: val.name };
                })}
              />
            )}
          </div>
          {checked?.length > 0 && (
            <div className="flex flex-row justify-center items-center gap-2 dark-light">
              {deleted_page ? (
                <RestoreChip onClick={() => setIsRestore(true)} />
              ) : (
                <DeleteChip onClick={() => setIsDelete(true)} />
              )}
              <p dir="ltr">
                {checked.length} / {ENUMs.CHECK_LIMIT}
              </p>
            </div>
          )}
          {!deleted_page && <AddButton onClick={() => setIsAddOpen(true)} />}
        </div>
        <Pagination<User[]>
          queryFn={() =>
            deleted_page
              ? useGetDeletedUsers(
                  searchParam.get(ENUMs.FILTER_PARAM as string) || ""
                )
              : useGetUsers(searchParam.get(ENUMs.FILTER_PARAM as string) || "")
          }
          searchQueryFn={() =>
            deleted_page
              ? useSearchDeletedUsers(
                  searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                )
              : useSearchUsers(
                  searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                )
          }>
          {({
            isFetchingNextPage,
            hasNextPage,
            isLoading,
            ref,
            data,
            refetch,
            isSearched,
            searchData,
            searchRefetch,
            fetchNextPage,
          }) => {
            const allData = useMemo(
              () =>
                !isSearched
                  ? data?.pages && data?.pages?.length > 0
                    ? data.pages.map((page) => page.paginatedData).flat()
                    : []
                  : searchData && searchData.length > 0
                  ? searchData
                  : [],
              [data, searchData, isSearched]
            );

            return (
              <div className="w-full max-w-full overflow-x-auto">
                <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                  <THead className="sticky top-0   table-dark-light z-10 w-full  default-border">
                    <Tr>
                      <Th className="text-right text-sm !p-4 !min-w-[100px]">
                        <InputGroup className="checkbox-input">
                          <Input
                            onChange={() => {
                              if (checked.length == 0) {
                                dispatch({
                                  type: CONTEXT_TYPEs.CHECK,
                                  payload: allData
                                    .slice(0, 30)
                                    .map((val: User, _index: number) => val.id),
                                });
                              } else {
                                dispatch({
                                  type: CONTEXT_TYPEs.CHECK,
                                  payload: [],
                                });
                              }
                            }}
                            checked={check_type == "all"}
                            type="checkbox"
                            className="cursor-pointer"
                          />
                        </InputGroup>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-1">#</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">ناو</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">
                          ناوی بەکارهێنەر
                        </p>
                      </Th>{" "}
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">ژمارە تەلەفۆن</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">ڕۆڵ</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">کرادرەکان</p>
                      </Th>
                    </Tr>
                  </THead>
                  <TBody className="w-full ">
                    <>
                      {allData?.map((val: User, index: number) => (
                        <UserCard key={val.id} index={index} {...val} />
                      ))}

                      {!isFetchingNextPage && hasNextPage && !isSearched && (
                        <Tr role="button" className="h-[20px]" ref={ref}></Tr>
                      )}
                    </>
                  </TBody>
                  <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
                    <Tr>
                      <Td className="text-center" colSpan={9}>
                        ژمارەی داتا {allData.length}
                      </Td>
                    </Tr>
                  </TFoot>
                </Table>
              </div>
            );
          }}
        </Pagination>
      </Container>
      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}>
          <DeleteModal
            deleteFunction={() => mutateAsync(checked)}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
      {isRestore && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isRestore}
          onClose={() => setIsRestore(false)}>
          <RestoreModal
            deleteFunction={() => restore(checked)}
            loading={restoreLoading}
            onClose={() => setIsRestore(false)}
          />
        </Dialog>
      )}
      {isAddOpen && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={800}
          maxHeight={`90%`}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}>
          <CustomClose onClick={() => setIsAddOpen(false)} />
          <UserForm state="insert" onClose={() => setIsAddOpen(false)} />
        </Dialog>
      )}
    </>
  );
};

export default Users;
