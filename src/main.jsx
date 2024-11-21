import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import routing components
import App from './App'; // Import your main App component
import Appartements1 from './component/search/appartements'; // Import other components
import Login from './auth/login';
import Register from './auth/register';
import UserHome1 from './auth/Home';
import Feed from './auth/UserFeed';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {/* Default route for Home */}
        <Route path="/Appartements" element={<Appartements1 />} />
        <Route path="/login" element={<Login />} />
          <Route path="/home" element={<UserHome1 />} />
          <Route path="/signup" element={<Register />} /> 
          <Route path="/myFeed" element={<Feed />} /> 


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
