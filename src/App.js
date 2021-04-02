import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Play from './components/main/Play'

// FIXME: set up context to keep track of current frame
// thought process is to increment after each completed frame without needing to pass down
// through DisplayGame and Frame

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Play/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
