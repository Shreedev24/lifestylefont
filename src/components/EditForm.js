import React, { useState, useEffect } from "react";
import axios from "axios";
import roomdata from "../roomdata.json";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';


function Form() {
  console.log("definitions",roomdata["productType"]["options"])
  const navigate = useNavigate( );
  const renderDropdownOptions = (key) => {
      if (roomdata.hasOwnProperty(key) && Array.isArray(roomdata[key]["options"])) {
      return roomdata[key]["options"].map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ));
    } else {
      console.error(`Invalid key or data for ${key}`);
      return null; 
    }
  };
  const [showToast, setShowToast] = useState(false);
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [setRoomType, setSelectedroomType] = useState([]);
  const [setProduct, setSelectedProduct] = useState([]);
  const [setProductColor, setSelectedProductColor] = useState([]);
  const [setRoomColor, setSelectedRoomColor] = useState([]);
  const [setAngle, setSelectedAngle] = useState([]);
  const [setRoomLight, setSelectedRoomLight] = useState([]);
  const [setTone, setSelectedTone] = useState([]);
  const [setImage, setSelectedImage] = useState([]);

  // const handleclick = () => {
  //     axios.post(`https://data-7.onrender.com/api/lifestyle`)
  //     .then((response) => {
  //       console.log("response",response)
  //         setAPIData(response.data);
  //     })
  // }

  const handleclick = () => {
    const dataToSend = {
      image: setImage,
      roomType: setRoomType,
      product: setProduct,
      productColor: setProductColor,
      roomColor: setRoomColor,
      angle: setAngle,
      roomLight: setRoomLight,
      tone: setTone,
    };

    axios
    .post(`https://data-7.onrender.com/api/saveLifestyle`, dataToSend)
    .then((response) => {
      console.log("response", response);
      navigate(-1); 
      setShowToast(true); 
      setTimeout(() => setShowToast(false), 3000); 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

  return (
    <div className="container">
      <div className="text-center py-3">
        <h1>Add New Room</h1>
      </div>

      <div className="form-row align-items-end">
        <div className="form-group col-md-12">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            className="form-control"
            placeholder="Enter Image"
            onChange={(e) => setSelectedImage(e.target.value)}
          />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="roomType">Room style</label>
          <select
            id="roomType"
            name="roomType"
            className="form-control"
            value={setRoomType}
            onChange={(e) => setSelectedroomType(e.target.value)}
          >
            <option value="">Select Style</option>
            {renderDropdownOptions("roomType")}
          </select>
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="product">Product</label>
          <select
            id="product"
            name="product"
            className="form-control"
            value={setProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Select Product</option>
            {renderDropdownOptions("productType")}
          </select>
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="productcolor">Product Color</label>
          <select
            id="productcolor"
            name="productcolor"
            className="form-control"
            value={setProductColor}
            onChange={(e) => setSelectedProductColor(e.target.value)}
          >
            <option value="">Select Color</option>
            {renderDropdownOptions("productColorType")}
          </select>
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="roomcolor">Room Color</label>
          <select
            id="roomcolor"
            name="roomcolor"
            className="form-control"
            value={setRoomColor}
            onChange={(e) => setSelectedRoomColor(e.target.value)}
          >
            <option value="">Select Color</option>
            {renderDropdownOptions("roomColorType")}
          </select>
        </div>
      </div>

      <div className="form-row align-items-end">
        <div className="form-group col-md-12">
          <label htmlFor="angle">Angle</label>
          <select
            id="angle"
            name="angle"
            className="form-control"
            value={setAngle}
            onChange={(e) => setSelectedAngle(e.target.value)}
          >
            <option value="">Select Angle</option>
            {renderDropdownOptions("productAngle")}
          </select>
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="roomLight">Room light</label>
          <select
            id="roomLight"
            name="roomLight"
            className="form-control"
            value={setRoomLight}
            onChange={(e) => setSelectedRoomLight(e.target.value)}
          >
            <option value="">Select Room Light</option>
            {renderDropdownOptions("roomLight")}
          </select>
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="tone">Tone</label>
          <select
            id="tone"
            name="tone"
            className="form-control"
            value={setTone}
            onChange={(e) => setSelectedTone(e.target.value)}
          >
            <option value="">Select tone</option>
            {renderDropdownOptions("roomTone")}
          </select>
        </div>
      </div>

      <div className="form-row align-items-end">
        <div className="form-group col-md-12">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleclick}
          >
            Save Room
          </button>
        </div>
      </div>

      {/* Bootstrap toast component */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        delay={1000} 
        autohide
      >
        <Toast.Body>Item Added</Toast.Body>
      </Toast>
    </div>
  );
}

export default Form;