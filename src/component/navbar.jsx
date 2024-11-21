import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../pictures/logo.png';
function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToHeight = () => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  };

  const scrollToAbout = () => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  const scrollToContact = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <nav>
      <div className="left">
        <a href="/">
          <img src={Logo} alt="Logo" className="logo"/>
        </a>
        <a href="/" onClick={scrollToHeight}>
          Home
        </a>
        <a href="/" onClick={scrollToAbout}>
          About
        </a>
        <Link to="/Appartements">Appartements</Link>
      </div>
      <div className="right">
        <Link to="/login">Sign in</Link>
        <Link to="/signup" className="register">
          Signup
        </Link>
        <div className="menuIcon">
          <img src="/menu.png" alt="Menu Icon" onClick={() => setOpen(!open)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/" onClick={scrollToHeight}>
            Home
          </a>
          <a href="/" onClick={scrollToAbout}>
            About
          </a>
          <Link to="/Appartements">Appartements</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
