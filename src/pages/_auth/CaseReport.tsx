import Container from "@/components/ui/Container";
import CaseReportList from "@/containers/CaseReportList";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import CaseGlobalData from "@/containers/CaseGlobalData";
const CaseReport = () => {
  const [index, setIndex] = useState(0);
  const {
    state: { theme },
  } = useGlobalContext();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start"
      >
        <Tabs
          defaultValue={0}
          value={index}
          onChange={(event, value) => setIndex(value as number)}
          className="w-full !dark-light"
          aria-label="Flex auto tabs"
        >
          <TabList
            sx={{
              gap: "10px",
            }}
            tabFlex="auto"
          >
            <Tab
              sx={{
                borderColor: "gray",
                width: "40%",
                transition: "color 300ms ease", // Adding transition for color change
                fontFamily: "bukra",
                borderRadius: "10px",
                color: theme == "dark" ? "white" : "black",
                "&.Mui-selected": {
                  color: theme === "dark" ? "black" : "black", // Active text color
                },
              }}
            >
              صندوق بەپێی بەکارهێنەر
            </Tab>
            <Tab
              sx={{
                borderColor: "gray",
                width: "40%",
                transition: "color 300ms ease", // Adding transition for color change
                fontFamily: "bukra",
                borderRadius: "10px",
                color: theme == "dark" ? "white" : "black",
                "&.Mui-selected": {
                  color: theme === "dark" ? "black" : "black", // Active text color
                },
              }}
            >
              صندوقی گشتی
            </Tab>
          </TabList>
        </Tabs>
        {index == 0 && <CaseReportList />}
        {index == 1 && <CaseGlobalData />}
      </Container>
    </>
  );
};

export default CaseReport;
