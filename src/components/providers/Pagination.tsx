import { ENUMs } from "@/lib/enum";
import { DataTypes, PaginationProps } from "@/types/global";

import { useEffect, useRef } from "react";
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
  let item_type = searchParam.get(ENUMs.ITEM_TYPE_PARAM as string);
  let expense_type = searchParam.get(ENUMs.EXPENSE_TYPE_PARAM as string);
  let table_name = searchParam.get(ENUMs.TABLE_NAME_PARAM as string);
  let user_param = searchParam.get(ENUMs.USER_PARAM as string);

  let filter = searchParam.get(ENUMs.FILTER_PARAM as string);
  let role = searchParam.get(ENUMs.ROLE_FILTER_PARAM as string);

  let from = searchParam.get(ENUMs.FROM_PARAM as string);
  let to = searchParam.get(ENUMs.TO_PARAM as string);

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

  useEffect(() => {
    refetch();
  }, [
    filter,
    item_type,
    expense_type,
    table_name,
    user_param,
    from,
    role,
    to,
    refetch,
  ]);
  const {
    data: searchData,
    isLoading: searchLoading,
    refetch: searchRefetch,
  } = searchQueryFn
    ? searchQueryFn()
    : { data: null, isLoading: false, refetch: () => {} };
  useEffect(() => {
    if (search && search !== "") searchRefetch();
  }, [search, searchRefetch]);

  const isSearched = Boolean(search);

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
    searchLoading,
  });
};

export default Pagination;
