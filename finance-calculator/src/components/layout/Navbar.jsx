import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Finance Calculator India
        </Link>
        <div className="navbar-menu">
          <Link to="/emi-calculator" className="navbar-link">
            EMI
          </Link>
          <Link to="/gst-calculator" className="navbar-link">
            GST
          </Link>
          <Link to="/sip-calculator" className="navbar-link">
            SIP
          </Link>
          <Link to="/tax-calculator" className="navbar-link">
            Tax
          </Link>
          <Link to="/fd-calculator" className="navbar-link">
            FD
          </Link>
          <Link to="/ppf-calculator" className="navbar-link">
            PPF
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
