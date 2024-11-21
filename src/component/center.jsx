import React from 'react';
import "./center.scss";
import bizerte from 'H:/my projects/booking app/booking-app/src/pictures/bizerte.jpg';
import manar from 'H:/my projects/booking app/booking-app/src/pictures/manar.png';
import medenine from 'H:/my projects/booking app/booking-app/src/pictures/medenine.jpg';
import monastir from 'H:/my projects/booking app/booking-app/src/pictures/monastir.jpg';
import sousse from 'H:/my projects/booking app/booking-app/src/pictures/sousse.jpg';
import tunis from 'H:/my projects/booking app/booking-app/src/pictures/tunis.jpg';
import { Link } from 'react-router-dom';
const Center = () => {
  return (
    <div>
     
    <div className='P1'>
    <Link to="/Appartements"> 
      <img src={bizerte} alt="Bizerte" />
      </Link>        <a href='/'><img src={manar}/></a>
        <a href='/'><img src={medenine}/></a>
       <a href='/'><img src={monastir}/></a>
        <a href='/'><img src={sousse}/></a>
        <a href='/'><img src={tunis}/></a>
    </div>
    </div>
  )
}

export default Center;