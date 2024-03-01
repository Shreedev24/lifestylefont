import React,{useState,useEffect } from 'react';
import axios from 'axios';
import roomdata from './roomdata.json';
import Card from 'react-bootstrap/Card';

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
  const [selectedRoomType] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedAngle, setSelectedAngle] = useState('');
  const [selectedRoomLight, setSelectedRoomLight] = useState('');
  const [selectedTone, setSelectedTone] = useState('');


  const handleclick = async () => {
   console.log("handleclick")
      axios.get(`https://data-7.onrender.com/api/lifestyle`)
      .then((response) => {
        console.log("response",response)
          setAPIData(response.data);    
      })
    }

    
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
      <div className='text-center py-3'>
        <h1>Lifestyle Rooms</h1>
      </div>
   
      
        <div className="form-row align-items-end">
          <div className="form-group col-md-4">
            <label htmlFor="dropdown1">Room style</label>
            <select id="dropdown1" name="dropdown1" className="form-control">
              <option value="">Select Style</option>
              {renderDropdownOptions('roomType')}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="dropdown2">Product</label>
            <select id="dropdown2" name="dropdown2" className="form-control">
              <option value="">Select Product</option>
              {renderDropdownOptions('product')}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="dropdown3">Color</label>
            <select id="dropdown3" name="dropdown3" className="form-control">
              <option value="">Select Color</option>
              {renderDropdownOptions('color')}
            </select>
          </div>
        </div>

        <div className="form-row align-items-end">
          <div className="form-group col-md-4">
            <label htmlFor="dropdown4">Angle</label>
            <select id="dropdown4" name="dropdown4" className="form-control">
              <option value="">Select angle</option>
              {renderDropdownOptions('angle')}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="dropdown5">Room light</label>
            <select id="dropdown5" name="dropdown5" className="form-control">
              <option value="">Select room light</option>
              {renderDropdownOptions('roomlight')}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="dropdown6">Tone</label>
            <select id="dropdown6" name="dropdown6" className="form-control">
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
        {/* <div>
        <input className='album_id' required="required" placeholder='Enter an ID' value={id} onChange={e => setId(e.target.value)} />
        </div> */}


        <Card itemsPerRow={3} style={{ marginTop: 20 }}>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card key={item.id}>
                                <Card.Body>
                                    <Card.Header>{item.name}</Card.Header>
                                    <Card.Text>
                                        {item.email}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                            <Card key={item.id}>
                                 <Card.Body>
                                    <Card.Header>{item.name}</Card.Header>
                                    <Card.Text>
                                        {item.email}
                                    </Card.Text>
                                 </Card.Body>
                            </Card>
                        )
                    })
                )}
            </Card>
        
      </div>
  );
}

export default Header;
