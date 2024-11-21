import React from "react";
import "./auth.scss"; 
import Center from "../component/center.jsx";
import Imageslider1 from "../component/imageSlider.jsx";
import shield from "../pictures/shield.gif";
import property from "../pictures/property.gif";
import friends from "../pictures/three-friends.gif";
import friendship from "../pictures/friendship.gif";
import Footer from "../component/footer.jsx";
import Navbaruser from "./usernavbar.jsx";

function UserHome1() {
  return (
    <div className="layout">
      {/* Navbar */}
      <Navbaruser />

      {/* Image Slider */}
      <Imageslider1 />

      {/* Info Section */}
      <div className="rect">
        <div className="item">
          <img src={shield} alt="Shield" />
          <p>
            <strong>Trusted by 1m+ students</strong>
            <span>Every year, we help over a million students find their ideal place.</span>
          </p>
        </div>
        <div className="item">
          <img src={property} alt="Property" />
          <p>
            <strong>The widest choice</strong>
            <span>Browse high-quality, affordable accommodation near university.</span>
          </p>
        </div>
        <div className="item">
          <img src={friends} alt="Friends" />
          <p>
            <strong>We’re here to help</strong>
            <span>Reach out to our friendly team of experts who are always on hand.</span>
          </p>
        </div>
        <div className="item">
          <img src={friendship} alt="Friendship" />
          <p>
            <strong>Only trusted providers</strong>
            <span>We only list properties from verified accommodation providers.</span>
          </p>
        </div>
      </div>

      <Center />

      <Footer />
    </div>
  );
}

export default UserHome1;
