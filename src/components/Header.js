import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import roomdata from "../roomdata.json";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Optional: smooth scrolling animation
  });
};

function Pagination({ currentPage, totalPages, onPageChange }) {

  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      scrollToTop();
    }
  };

  

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
        <button className="page-link" onClick={() => onPageChange(i)}>
          {i}
        </button>
      </li>
    );
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePreviousPage}>
            Previous
          </button>
        </li>
        {pages}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleNextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

function Header() {
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

  const [showToast, setShowToast] = useState(false);
  const [APIData, setAPIData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [setRoomType, setSelectedRoomType] = useState("");
  const [setProduct, setSelectedProduct] = useState("");
  const [setProductColor, setSelectedProductColor] = useState("");
  const [setRoomColor, setSelectedRoomColor] = useState("");
  const [setAngle, setSelectedAngle] = useState("");
  const [setRoomLight, setSelectedRoomLight] = useState("");
  const [setTone, setSelectedTone] = useState("");
  const [setSearchBar, setSelectedSearchBar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchBtnClick, setSearchBtnClick] = useState(false);
  const itemsPerPage = 9;

  var dataToSend = {};

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    scrollToTop();
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (isConfirmed) {
      axios
        .delete(`https://data-7.onrender.com/api/deleteLifestyle/${id}`)
        .then((response) => {
          console.log("Delete response:", response.data);

          btnSearchClick();
        })
        .catch((error) => {
          console.error("Delete Error:", error);
        });
    }
  };

  useEffect(() => {
    dataToSend = {
      roomType: setRoomType,
      product: setProduct,
      productColor: setProductColor,
      roomColor: setRoomColor,
      angle: setAngle,
      roomLight: setRoomLight,
      tone: setTone,
      searchBar: setSearchBar,
    };

    setIsLoading(true);
    axios
      .post("https://data-7.onrender.com/api/lifestyle", dataToSend)
      .then((response) => {
        console.log("API response:", response.data);
        // Sort the data by createdAt property in descending order
        const sortedData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAPIData(sortedData); // Update state with the sorted data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [isSearchBtnClick]);

  const btnSearchClick = () => {
    if (isSearchBtnClick) setSearchBtnClick(false);
    else setSearchBtnClick(true);
  };

  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const renderTooltip = (type, text) => (
    <Tooltip id="tooltip">
      <strong>{roomdata[type]["definitions"][text]}</strong>
    </Tooltip>
  );

  return (
    <>
    
      <div className="container">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-relative"
        style={{ minHeight: '40px' }}
      >
      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 1,width: "max-content" }}>
      <Toast>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">Sucess</strong>
        {/* <small>11 mins ago</small> */}
      </Toast.Header>
      <Toast.Body>Item Saved!</Toast.Body>
    </Toast>
    </ToastContainer>
    </div>

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
            <label htmlFor="tone">Room Tone</label>
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

          <div className="form-group col-md-3">
            <label htmlFor="roomColor">Room Color</label>
            <select
              id="roomColor"
              name="roomColor"
              className="form-control"
              value={setRoomColor}
              onChange={(e) => setSelectedRoomColor(e.target.value)}
            >
              <option value="">Select Color</option>
              {renderDropdownOptions("roomColorType")}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="roomLight">Room Light</label>
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

          <div className="form-group col-md-3">
            <label htmlFor="product">Product Type</label>
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

          <div className="form-group col-md-3">
            <label htmlFor="productColor">Product Color</label>
            <select
              id="productColor"
              name="productColor"
              className="form-control"
              value={setProductColor}
              onChange={(e) => setSelectedProductColor(e.target.value)}
            >
              <option value="">Select Color</option>
              {renderDropdownOptions("productColorType")}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="angle">Product Angle</label>
            <select
              id="angle"
              name="angle"
              className="form-control"
              value={setAngle}
              onChange={(e) => setSelectedAngle(e.target.value)}
            >
              <option value="">Select angle</option>
              {renderDropdownOptions("productAngle")}
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
              onClick={(e) => btnSearchClick()}
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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="row">
              <div className="col-md-12 py-3">
                <div className="pl-3">Results: {APIData.length}</div>
              </div>
            </div>

            <div className="row">
              {APIData &&
                APIData.slice(
                  (page - 1) * itemsPerPage,
                  page * itemsPerPage
                ).map((data, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <div className="card">
                      <img
                        src={`https://backendlifestyle.netlify.app/images/${data.image}`}
                        // alt={`Image ${index + 1}`}
                        alt=""
                        className="card-img-top img-fluid object-fit-contain"
                        style={{
                          minHeight: "348px",
                          objectFit: "contain",
                          background: "#f8f8f8",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                          e.target.style.background = "#f8f8f8";
                        }}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{data.product}</h5>

                        <p className="card-text">
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip("roomType", data.roomType)}
                          >
                            <span>Room Type: {data.roomType}</span>
                          </OverlayTrigger>
                        </p>
                        <p className="card-text">
                          Room Color: {data.roomColor}
                        </p>

                        <p className="card-text">
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip("roomLight", data.roomLight)}
                          >
                            <span>Room Light: {data.roomLight}</span>
                          </OverlayTrigger>
                        </p>
                        <p className="card-text">
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip("roomTone", data.tone)}
                          >
                            <span>Room Tone: {data.tone}</span>
                          </OverlayTrigger>
                        </p>
                        <p className="card-text">
                          Product Color: {data.productColor}
                        </p>
                        <p className="card-text">Product Angle: {data.angle}</p>
                        <p
                          className="card-text"
                          style={{ textAlign: "left", float: "left" }}
                        >
                          <Link
                            className="text-secondary"
                            onClick={() =>
                              downloadImage(
                                `https://backendlifestyle.netlify.app/images/${data.image}`
                              )
                            }
                          >
                            Download
                          </Link>
                        </p>

                        <p className="card-text text-right">
                          <Link to={`Edit/${data._id}`}>Edit</Link>{" "}
                          <span className="px-2">|</span>{" "}
                          <Link
                            className="text-danger"
                            onClick={() => handleDelete(data._id)}
                          >
                            Delete
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(APIData.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      {/* <ImageGrid APIData={APIData} /> */}
    </>
  );
}

export default Header;
