import Select, { SelectStaticProps } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Box, Chip, IconButton } from "@mui/joy";
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

const Filter = <T extends Role>({ options }: { options: OptionType[] }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [value, setValue] = React.useState<string | null>("dog");
  const action: SelectStaticProps["action"] = React.useRef(null);
  return (
    <Select
      action={action}
      value={value}
      placeholder="فلتەر"
      className="dark-light  !font-bukra !text-xs !default-border"
      onChange={(e, newValue) => {
        setValue(newValue);
        setSearchParam((prev) => {
          const params = new URLSearchParams(prev);
          if (newValue) params.set(ENUMs.FILTER_PARAM as string, newValue);
          return params;
        });
      }}
      {...(value && {
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onClick={() => {
              setValue(null);
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
          className="dark-light !font-bukra !text-xs !default-border"
          key={val.value}
          value={val.value}>
          {val.label}
        </Option>
      ))}
    </Select>
  );
};

export default Filter;
