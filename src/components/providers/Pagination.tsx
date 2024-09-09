import useDebounce from "@/hooks/useDebounce";
import { ENUMs } from "@/lib/enum";
import { DataTypes, PaginationProps } from "@/types/global";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";

const Pagination = <T extends DataTypes>({
  children,
  page,
  queryFn,
  searchQueryFn,
  type,
}: PaginationProps<T>) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 100px 0px",
  });
  const [searchParam] = useSearchParams();
  let search = searchParam.get(ENUMs.SEARCH_PARAM as string);
  const {
    isFetchingNextPage,
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    refetch,
  } = queryFn();
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  const debounceValue = useDebounce(search, ENUMs.DEBOUNCE as number);
  const {
    data: searchData,
    isLoading: searchLoading,
    refetch: searchRefetch,
  } = searchQueryFn
    ? searchQueryFn()
    : { data: null, isLoading: false, refetch: () => {} };
  useEffect(() => {
    if (debounceValue && debounceValue !== "") searchRefetch();
  }, [debounceValue, searchRefetch]);

  const isSearched = Boolean(debounceValue);

  return children({
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
  });
};

export default Pagination;
