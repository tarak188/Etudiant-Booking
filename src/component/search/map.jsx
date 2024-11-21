import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map1 = ({ selectedLocation }) => {
  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 36.806389,
    lng: 10.181667
  };

  const mapCenter = selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : defaultCenter;

  return (
    <LoadScript googleMapsApiKey="AIzaSyCLZMGB2iJ8O34EmmEFWsf1B3I0mleTWnM">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={mapCenter}
      >
        {selectedLocation && (
          <Marker position={mapCenter} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map1;
