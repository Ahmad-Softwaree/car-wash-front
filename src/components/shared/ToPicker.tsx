import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import { parseDateToTimestamp } from "@/lib/functions";
import dayjs, { Dayjs } from "dayjs";
import { useGlobalContext } from "@/context/GlobalContext";
import { Box } from "@mui/joy";
import useScreenSize from "@/hooks/useScreenSize";
const FromPicker = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { size } = useScreenSize();
  const {
    state: { theme },
  } = useGlobalContext();
  const dateString = searchParam.get(ENUMs.TO_PARAM as string);
  const dateValue: Dayjs | null = dateString
    ? dayjs(parseInt(dateString, 10))
    : null;
  return (
    <Box
      sx={{
        direction: "ltr",
        width: size == "xs" || size == "sm" || size == "md" ? "200px" : "300px",
      }}>
      <MUIDatePicker
        value={dateValue?.isValid() ? dateValue : null}
        onChange={(newValue) => {
          if (newValue)
            setSearchParam((prev) => {
              const params = new URLSearchParams(prev);
              params.set(
                ENUMs.TO_PARAM as string,
                parseDateToTimestamp(newValue.toISOString())
              );
              return params;
            });
        }}
        sx={{
          "& .MuiInputBase-root": {
            // Input root styles

            backgroundColor: theme === "light" ? "#fff" : "#000", // Light or dark background
            color: theme === "light" ? "#000" : "#fff", // Text color based on theme
            padding: "2px",
            paddingRight: "16px",
            width:
              size == "xs" || size == "sm" || size == "md" ? "200px" : "300px",
            borderRadius: "5px",
            boxSizing: "border-box",
            "&:focus": {
              outline: "none", // Remove focus outline
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            // Border color based on theme
            borderColor: "#000",
          },
          "& .MuiSvgIcon-root": {
            // Style the calendar icon
            color: theme === "light" ? "#000" : "#fff", // Icon color based on theme
          },
          "& .MuiInputBase-input": {
            // Input text color
            padding: "10px",
            color: theme === "light" ? "#000" : "#fff",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            // Remove the border when focused
            border: "none",
          },

          // Styles for the calendar dropdown (Popper)
          "& .MuiPaper-root": {
            // Calendar dropdown background and text color
            backgroundColor: theme === "light" ? "#fff" : "#000",
            color: theme === "light" ? "#000" : "#fff",
            borderRadius: "5px",
          },
          "& .MuiPickersDay-root": {
            // Calendar day button styles
            color: theme === "light" ? "#000" : "#fff",
          },
          "& .MuiIconButton-root": {
            // Calendar navigation button styles (left/right arrows)
            color: theme === "light" ? "#000" : "#fff",
          },
          "& .MuiPickersDay-root.Mui-selected": {
            // Selected day background and text color
            backgroundColor: theme === "light" ? "#000" : "#fff",
            color: theme === "light" ? "#fff" : "#000",
          },
        }}
        // Customize the DatePicker box (calendar)
        slotProps={{
          popper: {
            sx: {
              direction: "ltr", // DatePicker box (calendar) direction
            },
          },
        }}
      />
    </Box>
  );
};

export default FromPicker;
