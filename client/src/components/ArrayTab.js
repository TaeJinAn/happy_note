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
          <Tab label={<i className="fa-solid fa-bars">&nbsp;전체</i>} />
          <Tab label={<i className="fa-regular fa-square-check">&nbsp;완료</i>} />
          <Tab label={<i className="fa-regular fa-square">&nbsp;미완료</i>} />
        </Tabs>
      </Box>
    </>
  );
}
