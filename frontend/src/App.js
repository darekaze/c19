import React, { useState } from "react";
import { Container, Paper, AppBar, Tabs, Tab, Box } from "@material-ui/core";

import HealthForm from "./healthForm";
import HealthSummary from "./healthSummary";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Paper>
        <AppBar position="sticky">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Health Form" href="/form" {...a11yProps(0)} />
            <LinkTab label="Summary" href="/summary" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <HealthForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HealthSummary />
        </TabPanel>
      </Paper>
    </Container>
  );
}
