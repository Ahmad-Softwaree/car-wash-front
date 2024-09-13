import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import InputAddon from "../ui/InputAddon";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  return (
    <InputGroup className="text-input w-full max-w-[300px] dark-light">
      <Input
        onChange={(e) =>
          setSearchParam((prev) => {
            const params = new URLSearchParams(prev);
            params.set(ENUMs.SEARCH_PARAM as string, e.target.value);
            return params;
          })
        }
        value={searchParam.get(ENUMs.SEARCH_PARAM as string) || ""}
        placeholder="گەڕان"
        className="w-[85%] text-xs"
        type="input"
      />
      <InputAddon className="w-fit">
        <SearchIcon />
      </InputAddon>
    </InputGroup>
  );
};

export default Search;
