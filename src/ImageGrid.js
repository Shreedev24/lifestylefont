import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function ImageGrid() {
  return (
    <div className="container mt-3 pt-2">
    <div className="row">
      <div className="col-md-4">
        <img
          src="https://placekitten.com/300/200" 
          alt="Image 1"
          className="img-fluid"
        />
      </div>

      <div className="col-md-4">
        <img
          src="https://placekitten.com/300/201" 
          alt="Image 2"
          className="img-fluid"
        />
      </div>

      <div className="col-md-4">
        <img
          src="https://placekitten.com/300/202" 
          alt="Image 3"
          className="img-fluid"
        />
      </div>
    </div>
  </div>
  );
}

export default ImageGrid;
