import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/add" element={<Add/>}/>
    </Routes>
    
  </Router>
    )
  }
}

export default App;
