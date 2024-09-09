import PsulaProductCard from "@/components/cards/PsulaProductCard";
import Pagination from "@/components/providers/Pagination";
import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import InputAddon from "@/components/ui/InputAddon";
import InputGroup from "@/components/ui/InputGroup";
import Loading from "@/components/ui/Loading";
import MyButton from "@/components/ui/MyButton";
import {
  useGetProductById,
  useGetProducts,
} from "@/lib/react-query/query/product.query";
import { Product, ProductCard } from "@/types/products";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const CreatePsula = () => {
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState<ProductCard | null>(null);
  const {
    data: product,
    isLoading: productLoading,
    refetch,
  } = useGetProductById(active?.id || null);

  useEffect(() => {
    if (active) refetch();
  }, [active]);
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start ">
        <div className="w-full flex flex-row justify-between">
          <Return>دروستکردنی پسولە</Return>
        </div>

        <div className="w-full grid grid-cols-8 gap-5 min-h-screen">
          <div className="col-span-full lg:col-span-2 flex flex-col justify-start items-start gap-5 border-t-2 lg:border-t-0 lg:border-l-2 border-solid border-gray-500 px-0 lg:px-5">
            <InputGroup className="w-full text-input">
              <Input
                className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:font-rabar007 text-sm md:text-lg"
                name="search"
                id="search"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
              <InputAddon className="w-[20%] md:w-[10%]">
                {" "}
                <Search />
              </InputAddon>
            </InputGroup>

            <div className="w-full flex flex-row justify-between items-center gap-5">
              <p className="font-bold text-sm">جۆری مامەڵە</p>

              <div className="flex flex-row justify-end items-center gap-2">
                <p className="font-bold text-sm">نرخی جوملە پاکەت</p>
                <ChevronDown className="cursor-pointer" />
              </div>
            </div>

            <Pagination<Product[]> queryFn={() => useGetProducts()}>
              {({ isFetchingNextPage, data, hasNextPage, isLoading, ref }) => {
                const allData = useMemo(
                  () =>
                    data?.pages && data?.pages?.length > 0
                      ? data.pages.map((page) => page.paginatedData).flat()
                      : [],
                  [data]
                );
                return (
                  <>
                    {isLoading ? (
                      <Loading>
                        <TailSpin />
                      </Loading>
                    ) : (
                      <div className="tableDiv w-full flex flex-row justify-start items-start gap-5   flex-wrap h-full content-start overflow-y-scroll max-h-[700px]">
                        {allData.length > 0 &&
                          allData.map((val: ProductCard, _index: number) => (
                            <article
                              key={val.id}
                              className={`w-full h-[130px] rounded-xl border-[3px] border-solid cursor-pointer ${
                                active?.id === val.id
                                  ? "border-yellow-500"
                                  : "border-white"
                              }`}>
                              <PsulaProductCard
                                onClick={() => setActive(val)}
                                {...val}
                              />
                            </article>
                          ))}

                        {!isFetchingNextPage && hasNextPage && (
                          <div title="test" className="block w-full" ref={ref}>
                            <Loading>
                              <TailSpin />
                            </Loading>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                );
              }}
            </Pagination>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreatePsula;
