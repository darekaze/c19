import React from 'react'
import './App.css'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import HealthForm from './healthForm'

function App () {
  return (
    <div className="App">
      <Container maxWidth='sm'>
        <Paper>
          <HealthForm />
        </Paper>
      </Container>
    </div>
  )
}

export default App
