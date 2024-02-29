import React from 'react';
import roomdata from './roomdata.json';

function Header() {
  const renderDropdownOptions = (key) => {
    return roomdata[key].map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ));
  };

  return (
    <div>
      <div className='text-center py-3'>
        <h1>Lifestyle Rooms</h1>
      </div>
   
      <form className="container">
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
              />
            </div>
          </div>

          <div className="form-group col-md-2">
            <button type="submit" className="btn btn-primary btn-block">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Header;
