import React from 'react';

function ImageGrid() {
  return (
    <div className="container mt-3">
      <hr />
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3 d-flex justify-content-center">
          <img
            src="https://placekitten.com/300/200"
            alt="Image 1"
            className="img-fluid"
          />
        </div>

        <div className="col-md-4 mb-3 d-flex justify-content-center">
          <img
            src="https://placekitten.com/300/201"
            alt="Image 2"
            className="img-fluid"
          />
        </div>

        <div className="col-md-4 mb-3 d-flex justify-content-center">
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
