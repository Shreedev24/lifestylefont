import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import roomdata from "../roomdata.json";
import { useNavigate } from "react-router-dom";


function EditForm() {
  let { id } = useParams();
  const navigate = useNavigate( );
  const renderDropdownOptions = (key) => {
    if (
      roomdata.hasOwnProperty(key) &&
      Array.isArray(roomdata[key]["options"])
    ) {
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

  const [APIData, setAPIData] = useState({});
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [selectedRoomColor, setSelectedRoomColor] = useState("");
  const [selectedAngle, setSelectedAngle] = useState("");
  const [selectedRoomLight, setSelectedRoomLight] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios
      .get(`https://data-7.onrender.com/api/getLifestyle/${id}`)
      .then((res) => {
        const data = res.data;
        setSelectedImage(data.image);
        setSelectedRoomType(data.roomType);
        setSelectedProduct(data.product);
        setSelectedProductColor(data.productColor);
        setSelectedRoomColor(data.roomColor);
        setSelectedAngle(data.angle);
        setSelectedRoomLight(data.roomLight);
        setSelectedTone(data.tone);
        setAPIData(data); // Update state with the received data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleSave = () => {
    const dataToSend = {
      image: selectedImage,
      roomType: selectedRoomType,
      product: selectedProduct,
      productColor: selectedProductColor,
      roomColor: selectedRoomColor,
      angle: selectedAngle,
      roomLight: selectedRoomLight,
      tone: selectedTone,
    };

    axios
      .put(`https://data-7.onrender.com/api/updateLifestyle/` + id, dataToSend)
      .then((response) => {
        console.log("Edit response", response);
        window.history.back();
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
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
          />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="roomType">Room style</label>
          <select
            id="roomType"
            name="roomType"
            className="form-control"
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
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
            value={selectedProduct}
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
            value={selectedProductColor}
            onChange={(e) => setSelectedProductColor(e.target.value)}
          >
            <option value="">Select Color</option>
            {renderDropdownOptions("productColorType")}
          </select>
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="roomcolor">Room Color</label>
          <select
            id="roomColor"
            name="roomColor"
            className="form-control"
            value={selectedRoomColor}
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
            value={selectedAngle}
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
            value={selectedRoomLight}
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
            value={selectedTone}
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