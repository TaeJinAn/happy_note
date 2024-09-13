import { Box, Tab, Tabs } from "@mui/material";
import { useArraySubTabState } from "../states";

export default function ArraySubTab() {
  const arraySubTabState = useArraySubTabState();
  return <>
  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={arraySubTabState.subTabData.tab}
          onChange={arraySubTabState.handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={<i className="fa-regular fa-clock">&nbsp;급해요 ▲</i>}/>
          <Tab label={<i className="fa-regular fa-clock">&nbsp;널널해요 ▼</i>}/>
          <Tab label={<i className="fa-solid fa-pen">&nbsp;작성순 ▲</i>}/>
          <Tab label={<i className="fa-solid fa-pen">&nbsp;작성순 ▼</i>}/>
        </Tabs>
      </Box>
  </>
}