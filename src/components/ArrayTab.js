import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function ArrayTab() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
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
