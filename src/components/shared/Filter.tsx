import Select, { SelectStaticProps } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { IconButton } from "@mui/joy";
import { Role } from "@/types/role";
import { Id } from "@/types/global";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import React from "react";
import { CircleX } from "lucide-react";

type OptionType = {
  value: Id;
  label: string;
};

const Filter = ({ options }: { options: OptionType[] }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const action: SelectStaticProps["action"] = React.useRef(null);
  let filter = searchParam.get(ENUMs.FILTER_PARAM as string);
  return (
    <Select
      action={action}
      value={filter}
      placeholder="فلتەر"
      className="!dark-light  !font-bukra !text-xs !default-border !border-4"
      onChange={(e, newValue) => {
        setSearchParam((prev) => {
          const params = new URLSearchParams(prev);
          if (newValue) params.set(ENUMs.FILTER_PARAM as string, newValue);
          return params;
        });
      }}
      {...(filter && {
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            className="dark-light"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onClick={() => {
              action.current?.focusVisible();
              setSearchParam((prev) => {
                const params = new URLSearchParams(prev);
                params.delete(ENUMs.FILTER_PARAM as string);
                return params;
              });
            }}>
            <CircleX />
          </IconButton>
        ),
        indicator: null,
      })}
      sx={{ minWidth: 160 }}>
      {options.map((val: OptionType, _index: number) => (
        <Option
          className="!dark-light !font-bukra !text-xs  !default-border"
          key={val.value}
          value={val.value}>
          {val.label}
        </Option>
      ))}
    </Select>
  );
};

export default Filter;
