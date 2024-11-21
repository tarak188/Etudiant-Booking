import React, { useState } from 'react';
import Appartements1 from './appartements'; 
import './search.scss';
import Map1 from './map';

const Search1 = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className='search'>
      <div className='appartements-container'>
        <Appartements1 setSelectedLocation={setSelectedLocation} />
      </div>
      {/* 
      <div className='map-container'>
        <Map1 location={selectedLocation} />
      </div>*/}
      
    </div>
  );
}

export default Search1;
