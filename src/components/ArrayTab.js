import { Box, Tab, Tabs } from "@mui/material";
import { useArrayTabState } from "../states";

export default function ArrayTab() {
  const arrayTabState = useArrayTabState();
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={arrayTabState.tabData.tab}
          onChange={arrayTabState.handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="전체" />
          <Tab label="완료" />
          <Tab label="미완료" />
        </Tabs>
      </Box>
    </>
  );
}
