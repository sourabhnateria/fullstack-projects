import { Link } from "react-router-dom";
import { RatesDisclaimer } from "./common/RatesDisclaimer";

function HomePage() {
  const calculators = [
    {
      id: "emi",
      icon: "🏠",
      title: "EMI Calculator",
      description:
        "Calculate your monthly EMI for home, car, or personal loans",
      path: "/emi-calculator",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
      popular: true,
    },
    {
      id: "tax",
      icon: "💰",
      title: "Income Tax Calculator",
      description: "Calculate income tax for FY 2024-25 (New & Old Regime)",
      path: "/tax-calculator",
      bgColor: "bg-gradient-to-br from-red-500 to-orange-500",
      popular: true,
    },
    {
      id: "gst",
      icon: "🧮",
      title: "GST Calculator",
      description: "Calculate GST inclusive/exclusive amounts instantly",
      path: "/gst-calculator",
      bgColor: "bg-gradient-to-br from-green-500 to-teal-500",
    },
    {
      id: "sip",
      icon: "📈",
      title: "SIP Calculator",
      description: "Plan your mutual fund SIP investments and returns",
      path: "/sip-calculator",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      id: "fd",
      icon: "🏦",
      title: "FD Calculator",
      description: "Calculate fixed deposit maturity amount and interest",
      path: "/fd-calculator",
      bgColor: "bg-gradient-to-br from-indigo-500 to-purple-500",
    },
    {
      id: "ppf",
      icon: "🎯",
      title: "PPF Calculator",
      description: "Calculate Public Provident Fund returns (15 years)",
      path: "/ppf-calculator",
      bgColor: "bg-gradient-to-br from-yellow-500 to-red-500",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #266293 0%, #764ba2 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Trust Badges */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              ⭐ Rated 4.9/5
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              🔒 100% Secure
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              ⚡ Instant Results
            </span>
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Smart Financial Calculators
            <span
              style={{
                display: "block",
                background: "linear-gradient(to right, #fbbf24, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginTop: "10px",
              }}
            >
              for India
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              opacity: 0.95,
              marginBottom: "40px",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Save taxes, plan investments, and make smarter financial decisions
            with our free calculators
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/tax-calculator"
              style={{
                padding: "16px 32px",
                background: "white",
                color: "#667eea",
                borderRadius: "30px",
                fontWeight: "bold",
                fontSize: "18px",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                display: "inline-block",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Calculate Tax Savings →
            </Link>
            <Link
              to="/emi-calculator"
              style={{
                padding: "16px 32px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                borderRadius: "30px",
                fontWeight: "bold",
                fontSize: "18px",
                textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.5)",
                display: "inline-block",
              }}
            >
              Calculate EMI
            </Link>
          </div>

          {/* Key Features - Real Benefits */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px",
              marginTop: "60px",
              maxWidth: "800px",
              margin: "60px auto 0",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>100%</div>
              <div style={{ opacity: 0.9 }}>Accurate</div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>Free</div>
              <div style={{ opacity: 0.9 }}>Forever</div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>2024</div>
              <div style={{ opacity: 0.9 }}>Tax Rules</div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>Safe</div>
              <div style={{ opacity: 0.9 }}>& Private</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div
        style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            color: "#1e293b",
          }}
        >
          Choose Your Calculator
        </h2>
        <p
          style={{
            fontSize: "18px",
            textAlign: "center",
            color: "#64748b",
            marginBottom: "50px",
          }}
        >
          Professional tools trusted by 1 Lakh+ Indians for financial planning
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
          }}
        >
          {calculators.map((calc) => (
            <Link
              key={calc.id}
              to={calc.path}
              style={{
                display: "block",
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                textDecoration: "none",
                transition: "transform 0.3s, box-shadow 0.3s",
                position: "relative",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              {calc.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "linear-gradient(to right, #fbbf24, #f59e0b)",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    zIndex: 1,
                  }}
                >
                  POPULAR
                </div>
              )}

              <div
                style={{
                  height: "4px",
                  background:
                    calc.bgColor
                      .replace("bg-gradient-to-br ", "linear-gradient(135deg, ")
                      .replace(" to-", ", ")
                      .replace("from-", "")
                      .replace(/500/g, "") + ")",
                }}
              ></div>

              <div style={{ padding: "30px" }}>
                <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                  {calc.icon}
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1e293b",
                    marginBottom: "10px",
                  }}
                >
                  {calc.title}
                </h3>
                <p style={{ color: "#64748b", marginBottom: "20px" }}>
                  {calc.description}
                </p>
                <div style={{ color: "#667eea", fontWeight: "600" }}>
                  Calculate Now →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ background: "#f8fafc", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "50px",
              color: "#1e293b",
            }}
          >
            Why Choose Our Calculators?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>🎯</div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                100% Accurate
              </h3>
              <p style={{ color: "#64748b" }}>
                Latest tax rates and calculation methods updated for 2024-25
              </p>
            </div>

            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>⚡</div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Instant Results
              </h3>
              <p style={{ color: "#64748b" }}>
                Get calculations in real-time without any page refresh
              </p>
            </div>

            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔒</div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                100% Private
              </h3>
              <p style={{ color: "#64748b" }}>
                All calculations happen in your browser, no data stored
              </p>
            </div>
          </div>

          {/* Add Rates Disclaimer */}
          <RatesDisclaimer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
