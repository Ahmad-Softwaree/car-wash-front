import Container from "@/components/ui/Container";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import { useState } from "react";

import SellReportList from "@/containers/SellReportList";
import { useGlobalContext } from "@/context/GlobalContext";
import ItemReportList from "@/containers/ItemReportList";
const SellReport = () => {
  const [index, setIndex] = useState(0);
  const {
    state: { theme },
  } = useGlobalContext();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start">
        <Tabs
          defaultValue={0}
          value={index}
          onChange={(event, value) => setIndex(value as number)}
          className="w-full !dark-light"
          aria-label="Flex auto tabs">
          <TabList
            sx={{
              gap: "10px",
            }}
            tabFlex="auto">
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
              }}>
              لیستی پسوڵەکان
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
              }}>
              لیستی کاڵا فرۆشراوەکان
            </Tab>
          </TabList>
        </Tabs>

        {index == 0 && <SellReportList />}
        {index == 1 && <ItemReportList />}
      </Container>
    </>
  );
};

export default SellReport;
