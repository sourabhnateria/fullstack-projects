import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/emi-calculator", label: "EMI", icon: "💳" },
    { path: "/tax-calculator", label: "Tax", icon: "💰", hot: true },
    { path: "/gst-calculator", label: "GST", icon: "🧮" },
    { path: "/sip-calculator", label: "SIP", icon: "📈" },
    { path: "/fd-calculator", label: "FD", icon: "🏦" },
    { path: "/ppf-calculator", label: "PPF", icon: "🎯" },
  ];

  return (
    <nav
      style={{
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "3px solid",
        borderImage: "linear-gradient(to right, #667eea, #764ba2, #ec4899) 1",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>💰</span>
          <span
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Finance Teller
          </span>
        </Link>

        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: "8px 16px",
                color: location.pathname === item.path ? "white" : "#64748b",
                background:
                  location.pathname === item.path
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "transparent",
                textDecoration: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = "#f1f5f9";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.hot && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "white",
                    fontSize: "9px",
                    padding: "2px 6px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  HOT
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
          }}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
