import Container from "@/components/ui/Container";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import { useState } from "react";

import KogaAllReportList from "@/containers/KogaAllReportList";
import { useGlobalContext } from "@/context/GlobalContext";
import KogaNullReportList from "@/containers/KogaNullReportList";
import KogaMovementReportList from "@/containers/KogaMovementReportList";
import KogaLessReportList from "@/containers/KogaLessReportList";
const KogaReport = () => {
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
              جەردی کاڵا - کۆگا
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
              جەردی کاڵا - تەواوبوو
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
              جەردی کاڵا - کەمبوو
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
              جوڵەی کاڵا - بەپێی بەروار
            </Tab>
          </TabList>
        </Tabs>

        {index == 0 && <KogaAllReportList />}
        {index == 1 && <KogaNullReportList />}
        {index == 2 && <KogaLessReportList />}
        {index == 3 && <KogaMovementReportList />}
      </Container>
    </>
  );
};

export default KogaReport;
