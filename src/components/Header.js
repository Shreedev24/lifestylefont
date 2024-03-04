import React,{useState,useEffect } from 'react';
import axios from 'axios';
import roomdata from '../roomdata.json';
import Card from 'react-bootstrap/Card';
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
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [setRoomType, setSelectedRoomType] = useState('');
  const [setProduct, setSelectedProduct] = useState('');
  const [setColor, setSelectedColor] = useState('');
  const [setAngle, setSelectedAngle] = useState('');
  const [setRoomLight, setSelectedRoomLight] = useState('');
  const [setTone, setSelectedTone] = useState('');
 

  // const handleclick = () => {
  //     axios.post(`https://data-7.onrender.com/api/lifestyle`)
  //     .then((response) => {
  //       console.log("response",response)
  //         setAPIData(response.data);    
  //     })
  // }

  const handleclick = () => {
    
    const dataToSend = {
      RoomType: setRoomType,
      Product: setProduct,
      Color: setColor,
      Angle: setAngle,
      RoomLight: setRoomLight,
      Tone: setTone
    };

   
  axios.post('https://data-7.onrender.com/api/lifestyle', dataToSend )
  .then(response => {
    console.log('API response:', response.data);
  })
  .catch(error => {
  console.error('Error:', error);
  });
  };

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => {
            setAPIData(response.data);
        })
  }, [])

  const searchItems = (searchValue) => {
    
  setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = APIData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        console.log("filteredData",filteredData)
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(APIData)
    }
  }

  return (
    <div className="container">
      <div className=' py-3 w-100'>
        <h1 className='text-center'>Lifestyle Rooms</h1>
        <p className='text-right'><Link to="/add">Add New</Link></p>
      </div>
   
      
        <div className="form-row align-items-end">
          <div className="form-group col-md-4">
            <label htmlFor="roomType">Room style</label>
            <select id="roomType" name="roomType" className="form-control" value={setRoomType} onChange={(e) => setSelectedRoomType(e.target.value)}>
              <option value="">Select Style</option>
              {renderDropdownOptions('roomType')}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="product">Product</label>
            <select id="product" name="product" className="form-control" value={setProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
              <option value="">Select Product</option>
              {renderDropdownOptions('product')}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="color">Color</label>
            <select id="color" name="color" className="form-control" value={setColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="">Select Color</option>
              {renderDropdownOptions('color')}
            </select>
          </div>
        </div>

        <div className="form-row align-items-end">
          <div className="form-group col-md-4">
            <label htmlFor="angle">Angle</label>
            <select id="angle" name="angle" className="form-control" value={setAngle} onChange={(e) => setSelectedAngle(e.target.value)}>
              <option value="">Select angle</option>
              {renderDropdownOptions('angle')}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="roomLight">Room light</label>
            <select id="roomLight" name="roomLight" className="form-control" value={setRoomLight} onChange={(e) => setSelectedRoomLight(e.target.value)}>
              <option value="">Select room light</option>
              {renderDropdownOptions('roomLight')}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="tone">Tone</label>
            <select id="tone" name="tone" className="form-control" value={setTone} onChange={(e) => setSelectedTone(e.target.value)}>
              <option value="">Select tone</option>
              {renderDropdownOptions('tone')}
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
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group col-md-2">
            <button type="submit" className="btn btn-primary btn-block" onClick={handleclick}>
              Search
            </button>
          </div>
        </div>
      </div>
  );
}

export default Header;
