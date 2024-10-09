import Container from "@/components/ui/Container";
import TBody from "@/components/ui/TBody";
import { Table, Th, THead, Tr } from "@/components/ui";
import { Backup, VultrBackup } from "@/types/backup";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";
import { useGetVultrBackups } from "@/lib/react-query/query/backup.query";
import VultrBackupCard from "@/components/cards/VultrBackupCard";

const VultrBackups = () => {
  const { data, isLoading } = useGetVultrBackups();

  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start"
      >
        {isLoading ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : data ? (
          <>
            <div className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll">
              <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                  <Tr>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-1">#</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">زانیاری</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">قەبارەی باکئەپ</p>
                    </Th>{" "}
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">دۆخ</p>
                    </Th>{" "}
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">بەرواری باکئەپ</p>
                    </Th>
                  </Tr>
                </THead>
                <TBody className="w-full ">
                  {data?.map((val: VultrBackup, index: number) => (
                    <VultrBackupCard key={val.id} {...val} />
                  ))}
                </TBody>
              </Table>
            </div>
            <div className="w-full flex flex-row justify-center items-center z-[100]  table-dark-light   default-border p-2 ">
              <p className="text-center">ژمارەی داتا {data.length}</p>
            </div>
          </>
        ) : null}
      </Container>
    </>
  );
};

export default VultrBackups;
