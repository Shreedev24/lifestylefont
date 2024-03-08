import React, { useState, useEffect } from "react";
import axios from "axios";
import roomdata from "../roomdata.json";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

function EditForm(id) {
  console.log("eduit called", id);
  const renderDropdownOptions = (key) => {
    return roomdata[key].map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ));
  };

  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [setroomType, setSelectedroomType] = useState([]);
  const [setProduct, setSelectedProduct] = useState([]);
  const [setColor, setSelectedColor] = useState([]);
  const [setAngle, setSelectedAngle] = useState([]);
  const [setRoomLight, setSelectedRoomLight] = useState([]);
  const [setTone, setSelectedTone] = useState([]);
  const [setImage, setSelectedImage] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    const dataToSend = {
      image: setImage,
      roomType: setroomType,
      product: setProduct,
      color: setColor,
      angle: setAngle,
      roomLight: setRoomLight,
      tone: setTone,
    };

    // Make a PUT request for edit
    axios
      .put(`https://data-7.onrender.com/api/updateLifestyle/123`, dataToSend)
      .then((response) => {
        console.log("Edit response", response);
        // Handle other logic if needed
      })
      .catch((error) => {
        console.error("Edit Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="text-center py-3">
        <h1>Edit Room</h1>
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
            value={setroomType}
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
            {renderDropdownOptions("product")}
          </select>
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="color">Color</label>
          <select
            id="color"
            name="color"
            className="form-control"
            value={setColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">Select Color</option>
            {renderDropdownOptions("color")}
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
            {renderDropdownOptions("angle")}
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
            {renderDropdownOptions("tone")}
          </select>
        </div>
      </div>

      <div className="form-row align-items-end">
        <div className="form-group col-md-12">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSave}
          >
            Save Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
