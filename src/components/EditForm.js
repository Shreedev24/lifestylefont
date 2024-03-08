import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import roomdata from "../roomdata.json";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

function EditForm() {
  let { id } = useParams();
  console.log("eduit called", id);

  const renderDropdownOptions = (key) => {
    // Check if the key exists in roomdata and it is an array
    if (
      roomdata.hasOwnProperty(key) &&
      Array.isArray(roomdata[key]["options"])
    ) {
      // Map over the array and generate dropdown options
      return roomdata[key]["options"].map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ));
    } else {
      // Log an error if the key does not exist or it is not an array
      console.error(`Invalid key or data for ${key}`);
      return null; // or you can return default options as per your requirement
    }
  };

  //const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [setroomType, setSelectedroomType] = useState([]);
  const [setProduct, setSelectedProduct] = useState([]);
  const [setColor, setSelectedColor] = useState([]);
  const [setAngle, setSelectedAngle] = useState([]);
  const [setRoomLight, setSelectedRoomLight] = useState([]);
  const [setTone, setSelectedTone] = useState([]);
  const [setImage, setSelectedImage] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setSelectedImage("arpit");
    axios
      .get("https://data-7.onrender.com/api/getLifestyle/" + id)
      .then((res) => {
        console.log("API response:", res.data);
        setSelectedImage(res.data["image"]);
        //setAPIData(res.data); // Update state with the received data
      })
      .catch((error) => {
        console.error("123 Error:", setImage);
      });
  }, []);

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
      .put(`https://data-7.onrender.com/api/updateLifestyle/` + id, dataToSend)
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
            value={setImage}
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
            {renderDropdownOptions("productType")}
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
            {renderDropdownOptions("productColorType")}
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
