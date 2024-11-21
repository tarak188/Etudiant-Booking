import React, { useEffect, useState } from 'react';
import './appart.css';
import SearchBar from '../searchbar/searchbar';
import Map1 from './map';
import { setKey, setDefaults, geocode, RequestType } from 'react-geocode';

const Appartements1 = () => {
  const [apartments, setApartments] = useState([]);
  const [displayedApartments, setDisplayedApartments] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedApartmentLocation, setSelectedApartmentLocation] = useState(null);
  const [universityAddress, setUniversityAddress] = useState(null);
  const [distance, setDistance] = useState(null);
  const [maxDistance, setMaxDistance] = useState(10); // Default to 10 km
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const batchSize = 20;

  useEffect(() => {
    fetchApartments();
    setKey('AIzaSyA0qjLK11r_ONfubUYIirYkT5AIjnLDyZA');
    setDefaults({ language: 'en', region: 'es' });
  }, []);

  const fetchApartments = () => {
    fetch('/apartments.json')
      .then(response => response.json())
      .then(data => {
        setApartments(data);
        setDisplayedApartments(data.slice(0, batchSize));
      })
      .catch(error => {
        console.error('Error fetching apartments:', error);
      });
  };

  const handleShowMore = () => {
    const newStartIndex = startIndex + batchSize;
    const newDisplayedApartments = apartments.slice(0, newStartIndex + batchSize);
    setDisplayedApartments(newDisplayedApartments);
    setStartIndex(newStartIndex);
  };

  const handleApartmentMarker = (location) => {
    geocode(RequestType.ADDRESS, location)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setSelectedApartmentLocation({ lat, lng });
      })
      .catch(error => {
        console.error('Error geocoding location:', error);
      });
  };

  const handleSelectUniversity = (address) => {
    console.log('University address selected:', address); // Debug line
    setUniversityAddress(address);
  };

  const handleShowDistance = (facultyAddress) => {
    if (!selectedApartmentLocation) {
      console.error('Select an apartment first');
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    const origin = new window.google.maps.LatLng(selectedApartmentLocation.lat, selectedApartmentLocation.lng);

    geocode(RequestType.ADDRESS, facultyAddress)
      .then(({ results }) => {
        const destination = new window.google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng);

        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
          },
          (response, status) => {
            if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
              setDistance(response.rows[0].elements[0].distance.text);
            } else {
              console.error('Error calculating distance:', status);
            }
          }
        );
      })
      .catch(error => {
        console.error('Error geocoding faculty address:', error);
      });
  };

  const filterApartmentsByDistance = () => {
    if (!universityAddress) {
      alert('Select a university first');
      return;
    }

    setIsLoading(true); // Start loading
    const service = new window.google.maps.DistanceMatrixService();
    const filteredApartments = [];

    geocode(RequestType.ADDRESS, universityAddress)
      .then(({ results }) => {
        const universityLocation = new window.google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng);

        const requests = apartments.map(apartment => {
          return new Promise((resolve, reject) => {
            geocode(RequestType.ADDRESS, apartment.location)
              .then(({ results }) => {
                const apartmentLocation = new window.google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng);

                service.getDistanceMatrix(
                  {
                    origins: [universityLocation],
                    destinations: [apartmentLocation],
                    travelMode: 'DRIVING',
                  },
                  (response, status) => {
                    if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                      const distanceValue = response.rows[0].elements[0].distance.value / 1000; // distance in km
                      if (distanceValue <= maxDistance) {
                        filteredApartments.push(apartment);
                      }
                      resolve();
                    } else {
                      console.error('Error calculating distance:', status);
                      resolve();
                    }
                  }
                );
              })
              .catch(error => {
                console.error('Error geocoding apartment location:', error);
                resolve();
              });
          });
        });

        Promise.all(requests).then(() => {
          setDisplayedApartments(filteredApartments.slice(0, batchSize));
          setIsLoading(false); // End loading
        });
      })
      .catch(error => {
        console.error('Error geocoding university address:', error);
        setIsLoading(false); // End loading
      });
  };

  return (
    <div className='search'>
      <div className="appartements-container">
        <h1>Appartements</h1>
        <div className="apartment-list">
          <SearchBar 
            onSelectUniversity={handleSelectUniversity} 
            onShowDistance={handleShowDistance} 
          />
          <div className="distance-filter">
            <label htmlFor="maxDistance">Max Distance (km): </label>
            <input 
              type="number" 
              id="maxDistance" 
              value={maxDistance} 
              onChange={(e) => setMaxDistance(Number(e.target.value))} 
              className='filterbut'
            />
            <button onClick={filterApartmentsByDistance}>Filter</button>
          </div>
          {isLoading ? (
            <div className="loading-animation">Loading...</div>
          ) : (
            displayedApartments.map((apartment, index) => (
              <div key={index} className="apartment-item">
                <img src={apartment.picture} alt={apartment.title} />
                <h2>{apartment.title}</h2>
                <p>{apartment.description}</p>
                <p><strong>Date:</strong> {apartment.date}</p>
                <p><strong>Location:</strong> {apartment.location}</p>
                <button onClick={() => handleApartmentMarker(apartment.location)} className='butn'>Show on Map</button>
                <button
                  className='butn'
                  style={{ marginLeft: "80px", backgroundColor: "blue" }}
                  onClick={() => window.open(apartment.link, '_blank')} // This opens the link in a new tab
                >
                  Take Me There
                </button>
              </div>
            ))
          )}
        </div>
        {startIndex + batchSize < apartments.length && (
          <button onClick={handleShowMore} className='butn'>Show More</button>
        )}
        {distance && (
          <div className="distance-info">
            <p>Distance from selected apartment to university: {distance}</p>
          </div>
        )}
      </div>
      <div className="map-container">
        <Map1 selectedLocation={selectedApartmentLocation} />
      </div>
    </div>
  );
};

export default Appartements1;
