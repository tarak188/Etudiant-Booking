import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import Lmao from 'H:/my projects/booking app/booking-app/src/pictures/lmao.jpg';
import bizerte from 'H:/my projects/booking app/booking-app/src/pictures/bizerte.jpg';
import sousse from 'H:/my projects/booking app/booking-app/src/pictures/sousse.jpg';

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '620px',
    backgroundSize: 'cover',
    marginTop: '10px',
    borderRadius: '20px'
};

const slideImages = [
    { url: Lmao },
    { url: bizerte },
    { url: sousse }
];

const Imageslider1 = () => {
    return (
        <div className="slide-container">
            <Fade>
                {slideImages.map((image, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, backgroundImage: `url(${image.url})` }}>
                        </div>
                    </div>
                ))}
            </Fade>
        </div>
    );
};

export default Imageslider1;
