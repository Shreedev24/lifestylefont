import React, { Component, useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Header from './Header';
import ImageGrid from './ImageGrid';
import './App.css';

class App extends Component {
  render() {
    return (
   <div>
   <Header/>
   <ImageGrid/>
   </div>
    )
  }
}

export default App;
