// export default ImageGrid;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ImageGrid() {
  const [imageNames, setImageNames] = useState([]);

   useEffect(() => {
        axios.post(`https://data-7.onrender.com/api/lifestyle`)
            .then((response) => {
                setImageNames(response.data || []);
            })
    }, [])

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <hr />
        </div>
      </div>
        <div className="row">
          <div className="col-md-12 py-3">
              <div className='pl-3'>Results: {imageNames.length}</div>
          </div>
        </div>

      
      <div className="row justify-content-left">
        {(
          imageNames.map((data, index) => (
            <div key={index} className="col-md-4 mb-3 flex-container column justify-content-center">
               <div className='d-block'> <img
                src={`https://backendlifestyle.netlify.app/images/${data.image}`} 
                alt={`Image ${index + 1}`}
                className="img-fluid"
              /></div>
              <div className=''>{data.product}</div>
              <div className=''>{data.roomtype}</div>
              <div className=''>{data.color}</div>
              <div className=''>{data.roomLight}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}