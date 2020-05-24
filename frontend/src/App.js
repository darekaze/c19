import React from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import HealthForm from './healthForm'
import HealthSummary from './healthSummary'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

function App () {
  const [value, setValue] = React.useState('/');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Container maxWidth='sm'>
        <Paper>
          <Router>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Health Form" value="/" component={Link} to="/" />
              <Tab label="Summary" value="/summary" component={Link} to="/summary" />
            </Tabs>
            <Switch>
              <Route path="/">
                <HealthForm />
              </Route>
              <Route path="/summary">
                <HealthSummary />
              </Route>
            </Switch>
          </Router>
        </Paper>
      </Container>
    </div>
  )
}

export default App
