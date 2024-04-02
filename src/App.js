import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
