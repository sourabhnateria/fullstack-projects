import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Popular Calculators</h3>
            <ul>
              <li>
                <a href="/emi-calculator">Home Loan EMI Calculator</a>
              </li>
              <li>
                <a href="/gst-calculator">GST Calculator 2024</a>
              </li>
              <li>
                <a href="/sip-calculator">SIP Return Calculator</a>
              </li>
              <li>
                <a href="/tax-calculator">Income Tax Calculator</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="#">Tax Saving Tips</a>
              </li>
              <li>
                <a href="#">Investment Guide</a>
              </li>
              <li>
                <a href="#">Loan Comparison</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <p>
              Free financial calculators for Indian users. Calculate EMI, Tax,
              GST, and plan your investments smartly.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Finance Teller. All rights reserved.</p>
          <div style={{ marginTop: "10px" }}>
            <a
              href="/privacy-policy"
              style={{ color: "#94a3b8", marginRight: "20px" }}
            >
              Privacy Policy
            </a>
            <a href="/terms" style={{ color: "#94a3b8" }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
