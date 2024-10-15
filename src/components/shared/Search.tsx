import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import InputAddon from "../ui/InputAddon";
import { Search as SearchIcon } from "lucide-react";
import CustomClose from "./CustomClose";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  let search = searchParam.get(ENUMs.SEARCH_PARAM as string) || "";

  return (
    <InputGroup
      parentDivClass="w-fit"
      className="text-input w-[200px] md:w-[300px] dark-light"
    >
      <Input
        onChange={(e) =>
          setSearchParam((prev) => {
            const params = new URLSearchParams(prev);
            params.set(ENUMs.SEARCH_PARAM as string, e.target.value);
            params.delete(ENUMs.ITEM_TYPE_PARAM as string);
            params.delete(ENUMs.EXPENSE_TYPE_PARAM as string);
            params.delete(ENUMs.COLOR_FILTER_PARAM as string);
            params.delete(ENUMs.CAR_MODEL_FILTER_PARAM as string);
            params.delete(ENUMs.CAR_TYPE_FILTER_PARAM as string);
            params.delete(ENUMs.USER_FILTER_PARAM as string);
            params.delete(ENUMs.SERVICE_FILTER_PARAM as string);
            params.delete(ENUMs.ROLE_FILTER_PARAM as string);
            params.delete(ENUMs.TABLE_NAME_PARAM as string);

            params.delete(ENUMs.FILTER_PARAM as string);

            params.delete(ENUMs.TO_PARAM as string);
            params.delete(ENUMs.FROM_PARAM as string);

            return params;
          })
        }
        value={search}
        placeholder={placeholder ? placeholder : "گەڕان"}
        className="w-[85%] text-xs"
        type="input"
      />
      {search == "" ? (
        <InputAddon className="w-fit">
          <SearchIcon />
        </InputAddon>
      ) : (
        <CustomClose
          onClick={() => {
            setSearchParam((prev) => {
              const params = new URLSearchParams(prev);
              params.delete(ENUMs.SEARCH_PARAM as string);
              return params;
            });
          }}
        />
      )}
    </InputGroup>
  );
};

export default Search;
