import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Logo from '../pictures/logo.png';
function Navbaruser() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(location.state?.userName || "User");
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email.split("@")[0]);
      setPhotoURL(user.photoURL);
    }
  }, []);

  const [open, setOpen] = useState(false);

  const scrollToSection = (section) => {
    const positions = {
      top: 10,
      about: 1000,
      contact: document.body.scrollHeight,
    };
    window.scrollTo({ top: positions[section], behavior: "smooth" });
  };

  const handleDisconnect = async () => {
    try {
      await auth.signOut(); // Log out the user from Firebase Auth
      navigate("/login", { replace: true }); // Navigate to login and replace history
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav>
      <div className="left">
        <a href="/">
          <img src={Logo} alt="Logo" className="logo"/>
        </a>
        <a href="/" onClick={() => scrollToSection("top")}>
          Home
        </a>
        <a href="/" onClick={() => scrollToSection("about")}>
          About
        </a>
        <Link to="/Appartements">Appartements</Link>
      </div>

      <div className="right">
        {/* Profile Picture */}
        {photoURL ? (
          <img
            src={photoURL}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        ) : (
          <div
            className="placeholder-profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#ccc",
            }}
          ></div>
        )}

        <Link to="/myFeed" className="register">
          Your Feeds
        </Link>
        <button onClick={handleDisconnect} className="register">
          Disconnect
        </button>

        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu Icon"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/" onClick={() => scrollToSection("top")}>
            Home
          </a>
          <a href="/" onClick={() => scrollToSection("about")}>
            About
          </a>
          <Link to="/Appartements">Appartements</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbaruser;
