import React, { useState, useEffect } from "react";
import axios from "axios";
import roomdata from "../roomdata.json";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Header() {
  const renderDropdownOptions = (key) => {
    return roomdata[key].map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ));
  };

  const [APIData, setAPIData] = useState([]);
  const [setRoomType, setSelectedRoomType] = useState("");
  const [setProduct, setSelectedProduct] = useState("");
  const [setProductColor, setSelectedProductColor] = useState("");
  const [setRoomColor, setSelectedRoomColor] = useState("");
  const [setAngle, setSelectedAngle] = useState("");
  const [setRoomLight, setSelectedRoomLight] = useState("");
  const [setTone, setSelectedTone] = useState("");
  const [setSearchBar, setSelectedSearchBar] = useState("");

  var dataToSend = {};

  const listImages = () => {
    dataToSend = {
      roomType: setRoomType,
      product: setProduct,
      productcolor: setProductColor,
      roomcolor: setRoomColor,
      angle: setAngle,
      roomLight: setRoomLight,
      tone: setTone,
      searchBar: setSearchBar,
    };

    console.log(dataToSend);
    axios
      .post("https://data-7.onrender.com/api/lifestyle", dataToSend)
      .then((response) => {
        console.log("API response:", response.data);
        setAPIData(response.data); // Update state with the received data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log("APIData", APIData.length);

  useEffect(() => {
    // listImages();
  }, [dataToSend]);

  if (!APIData.length) listImages();
  const handleclick = () => {
    listImages();
  };

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className=" py-3 w-100">
          <h1 className="text-center">Lifestyle Rooms</h1>
          <p className="text-right">
            <Link to="/add">Add New</Link>
          </p>
        </div>

        <div className="form-row align-items-end">
          <div className="form-group col-md-3">
            <label htmlFor="roomType">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              className="form-control"
              value={setRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
            >
              <option value="">Select Type</option>
              {renderDropdownOptions("roomType")}
            </select>
          </div>

          <div className="form-group col-md-3">
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

          <div className="form-group col-md-3">
            <label htmlFor="productcolor">Product Color</label>
            <select
              id="productcolor"
              name="productcolor"
              className="form-control"
              value={setProductColor}
              onChange={(e) => setSelectedProductColor(e.target.value)}
            >
              <option value="">Select Color</option>
              {renderDropdownOptions("productcolor")}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="roomcolor">Room Color</label>
            <select
              id="roomcolor"
              name="roomcolor"
              className="form-control"
              value={setRoomColor}
              onChange={(e) => setSelectedRoomColor(e.target.value)}
            >
              <option value="">Select Color</option>
              {renderDropdownOptions("roomcolor")}
            </select>
          </div>
        </div>

        <div className="form-row align-items-end">
          <div className="form-group col-md-4">
            <label htmlFor="angle">Angle</label>
            <select
              id="angle"
              name="angle"
              className="form-control"
              value={setAngle}
              onChange={(e) => setSelectedAngle(e.target.value)}
            >
              <option value="">Select angle</option>
              {renderDropdownOptions("angle")}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="roomLight">Room light</label>
            <select
              id="roomLight"
              name="roomLight"
              className="form-control"
              value={setRoomLight}
              onChange={(e) => setSelectedRoomLight(e.target.value)}
            >
              <option value="">Select room light</option>
              {renderDropdownOptions("roomLight")}
            </select>
          </div>

          <div className="form-group col-md-4">
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
          <div className="form-group col-md-10">
            <label htmlFor="searchBar">Search</label>
            <div className="input-group">
              <input
                type="text"
                id="searchBar"
                name="searchBar"
                className="form-control"
                placeholder="Enter your search term"
                onBlur={(e) => setSelectedSearchBar(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group col-md-2">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleclick}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 py-3">
            <div className="pl-3">Results: {APIData.length}</div>
          </div>
        </div>

        <div className="row">
          {APIData &&
            APIData.map((data, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    src={`https://backendlifestyle.netlify.app/images/${data.image}`}
                    alt={`Image ${index + 1}`}
                    className="card-img-top img-fluid"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.product}</h5>
                    <p className="card-text">Room Type: {data.roomType}</p>
                    <p className="card-text">Color: {data.color}</p>
                    <p className="card-text">Room Light: {data.roomLight}</p>
                    <p className="card-text">Angle: {data.angle}</p>
                    <p className="card-text">Tone: {data.tone}</p>
                    <Link to={`Edit/${data._id}`}>Edit</Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* <ImageGrid APIData={APIData} /> */}
    </>
  );
}

export default Header;
