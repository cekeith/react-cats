import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CatAdd from './components/CatAdd.js'
import CatIndex from './components/CatIndex.js'

class App extends Component {

  render() {
    return (
      <div>
      <div id='heading'>
        <h1 id='headingtext'>Welcome to Cat Tinder... MEOW!</h1>
      </div>
      <div>
        <Router>
          <div>
            <Route exact path="/" component={CatIndex}/>
            <Route exact path="/add" component={CatAdd}/>
          </div>
        </Router>
      </div>
      </div>
    )
  }
}

export default App;
