import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";
import { useMemo } from "react";
import { TailSpin } from "react-loader-spinner";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/providers/Pagination";
import { ProductLess } from "@/types/products";
import { useGetLessProducts } from "@/lib/react-query/query/product.query";
import LessProductCard from "@/components/cards/LessProductCard";
import { useGetConfigs } from "@/lib/react-query/query/config.query";

const Less = () => {
  const { data } = useGetConfigs();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start ">
        <div className="w-full flex flex-row justify-between items-start">
          <Return>موادی کەمبوو</Return>
          <div className="flex flex-row justify-end items-center gap-3 flex-wrap">
            <p className="font-bold text-md text-nowrap">
              دیاریکردنی کەمبوونی مواد لە
            </p>
            <div className="p-2 px-4 rounded-md border-2 border-primary-500 text-primary-500 font-bold font-md font-poppins">
              {data?.item_less_from || "?"}
            </div>
          </div>
        </div>
        <Pagination<ProductLess[]> queryFn={() => useGetLessProducts()}>
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
                  {allData.map((val: ProductLess, _index: number) => (
                    <LessProductCard key={val.id} {...val} />
                  ))}
                </div>

                {!isFetchingNextPage && hasNextPage && (
                  <div title="productButton" id="productButton" ref={ref}>
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
    </>
  );
};

export default Less;
