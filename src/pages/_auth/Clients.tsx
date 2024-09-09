import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";
import { lazy, useMemo, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));
const ClientCard = lazy(() => import("@/components/cards/ClientCard"));

import { TailSpin } from "react-loader-spinner";
import Loading from "@/components/ui/Loading";
import { useGetClients } from "@/lib/react-query/query/client.query";
import Pagination from "@/components/providers/Pagination";
import { Client } from "@/types/client";
import ClientForm from "@/components/forms/ClientForm";
const Clients = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start ">
        <div className="w-full flex flex-row justify-between">
          <Return>کڕیارەکان</Return>
          <button
            title="newSpend"
            type="button"
            onClick={openDialog}
            name="newSpend"
            className="flex flex-row gap-2 p-3 bg-black-500 text-white rounded-sm px-5">
            <CircleFadingPlus />
            <p>زیادکردن</p>
          </button>
        </div>
        <Pagination<Client[]> queryFn={() => useGetClients()}>
          {({ isFetchingNextPage, data, hasNextPage, isLoading, ref }) => {
            const allData = useMemo(
              () =>
                data?.pages && data?.pages?.length > 0
                  ? data.pages.map((page) => page.paginatedData).flat()
                  : [],
              [data]
            );

            if (isLoading) {
              return (
                <Loading screen>
                  <TailSpin />
                </Loading>
              );
            }
            return (
              <>
                <div className="w-full flex flex-row justify-start items-center gap-6 flex-wrap">
                  {allData.map((val: Client, _index: number) => (
                    <ClientCard key={val.id} {...val} />
                  ))}
                </div>

                {!isFetchingNextPage && hasNextPage && (
                  <div title="spendButton" id="spendButton" ref={ref}>
                    <Loading>
                      <TailSpin />
                    </Loading>
                  </div>
                )}
              </>
            );
          }}
        </Pagination>
      </Container>

      {isDialogOpen && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={800}
          maxHeight={`90%`}
          isOpen={isDialogOpen}
          onClose={() => closeDialog()}>
          <ClientForm state="insert" onClose={() => closeDialog()} />

          <button
            name="closeClientFormButton"
            onClick={() => closeDialog()}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-rabar007">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
    </>
  );
};

export default Clients;
