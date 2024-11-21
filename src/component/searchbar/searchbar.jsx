import React, { useState, useEffect } from 'react';
import './searchbar.css';

const SearchBar = ({ onSelectUniversity, onShowDistance }) => {
  const [universities, setUniversities] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      const response = await fetch("https://tarak188.github.io/lastapi/my-api.json");
      const data = await response.json();
      const universityData = data.universities.map(university => ({
        nom: university.nom,
        adresse: university.adresse,
        isVisible: true
      }));
      setUniversities(universityData);
    };

    fetchUniversities();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    setUniversities(universities.map(university => ({
      ...university,
      isVisible: university.nom.toLowerCase().includes(value)
    })));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleClick = (university) => {
    setSearchValue(university.nom);
    setSelectedUniversity(university);
    onSelectUniversity(university.adresse);
  };

  const handleShowClick = () => {
    if (selectedUniversity) {
      onShowDistance(selectedUniversity.adresse);
    }
  };

  return (
    <div className='searchbar1'>
      <div className="search-wrapper">
        <label htmlFor="search">
          <button onClick={handleShowClick}>Show</button>
        </label>
        <input 
          type="search" 
          id="search" 
          placeholder="Search Universities..."
          data-search 
          value={searchValue}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ backgroundColor: isFocused ? '#fff' : '#f5f5f5' }} 
        />
      </div>
      {isFocused && (
        <div className="university-cards" data-university-cards-container>
          {universities.filter(university => university.isVisible).map((university, index) => (
            <div 
              key={index} 
              className="card"
              onClick={() => handleClick(university)}
            >
              <div className="header" data-header>{university.nom}</div>
              <div className="body" data-body>{university.adresse}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
