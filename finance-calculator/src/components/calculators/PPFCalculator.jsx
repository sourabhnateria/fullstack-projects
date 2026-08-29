import { useState } from "react";
import { calculatePPF, formatCurrency } from "../../utils/calculations";
import {
  ModernForm,
  ModernInput,
  ModernButton,
} from "../ui/ModernFormComponents";
import { styles } from "../ui/PremiumStyles";

function PPFCalculator() {
  const [values, setValues] = useState({
    amount: 150000,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const calcResult = calculatePPF(values.amount);
      setResult(calcResult);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    let value = parseFloat(e.target.value) || 0;
    if (value > 150000) value = 150000;
    setValues({ amount: value });
  };

  // PPF Features
  const ppfFeatures = [
    { feature: "Lock-in Period", value: "15 Years" },
    { feature: "Current Rate", value: "7.1% p.a." },
    { feature: "Tax Benefit", value: "80C Deduction" },
    { feature: "Returns", value: "Tax Free" },
    { feature: "Min Investment", value: "₹500/year" },
    { feature: "Max Investment", value: "₹1.5L/year" },
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div
        style={{
          ...styles.calculatorHeader,
          background: "linear-gradient(135deg, #680596 0%, #786104 100%)",
        }}
      >
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>🎯 PPF Calculator</h1>
        <p style={styles.subtitle}>
          Public Provident Fund - Government backed, tax-free returns
        </p>

        {/* Trust Indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            position: "relative",
            zIndex: 1,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "white",
            }}
          >
            ✓ 7.1% Interest
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "white",
            }}
          >
            🛡️ Government Backed
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "white",
            }}
          >
            💰 Tax Free Returns
          </span>
        </div>
      </div>

      <div style={styles.calculatorContainer}>
        <div style={styles.calculatorGrid}>
          {/* Modern Form */}
          <ModernForm
            title="PPF Investment Planning"
            subtitle="Calculate your 15-year PPF maturity amount"
          >
            {/* PPF Features Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {ppfFeatures.map(({ feature, value }) => (
                <div
                  key={feature}
                  style={{
                    background:
                      "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #bbf7d0",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#166534",
                      fontWeight: "600",
                    }}
                  >
                    {feature}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#059669",
                      fontWeight: "bold",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <ModernInput
              label="Yearly Investment"
              name="amount"
              value={values.amount}
              onChange={handleInputChange}
              icon="₹"
              hint="Max: ₹1.5L/year"
              placeholder="Enter yearly investment"
              quickSelect={[
                { label: "₹12K", value: 12000 },
                { label: "₹50K", value: 50000 },
                { label: "₹1L", value: 100000 },
                { label: "₹1.5L", value: 150000 },
              ]}
              tooltip="Amount you will invest every year for 15 years"
            />

            {/* Investment Info */}
            <div
              style={{
                background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                padding: "12px",
                borderRadius: "12px",
                marginBottom: "20px",
                border: "1px solid #93c5fd",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#1e40af",
                  marginBottom: "8px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Why PPF is Best for Long-term
              </div>
              <ul
                style={{
                  fontSize: "12px",
                  color: "#1e40af",
                  marginLeft: "16px",
                  marginBottom: "0",
                }}
              >
                <li>
                  EEE Status - Investment, Interest & Maturity all tax-free
                </li>
                <li>Guaranteed returns backed by Government</li>
                <li>Loan facility after 3rd year</li>
                <li>Partial withdrawal after 7th year</li>
                <li>Can extend in blocks of 5 years after maturity</li>
              </ul>
            </div>

            <div
              style={{
                padding: "16px",
                background: "white",
                borderRadius: "12px",
                border: "2px solid #e5e7eb",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Current PPF Rate (2024-25)
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#059669",
                    }}
                  >
                    7.1% p.a.
                  </div>
                </div>
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#92400e",
                    fontWeight: "600",
                  }}
                >
                  Compounded Annually
                </div>
              </div>
            </div>

            <ModernButton onClick={handleCalculate} loading={loading} icon="→">
              Calculate PPF Returns
            </ModernButton>
          </ModernForm>

          {/* Result Section */}
          {result && (
            <div style={{ animation: "fadeIn 0.5s ease-in" }}>
              <div
                style={{
                  ...styles.resultCard,
                  background:
                    "linear-gradient(135deg, #059669 0%, #047857 100%)",
                }}
              >
                <div style={styles.resultPattern}></div>
                <div style={styles.resultMain}>
                  <div style={styles.resultLabel}>Maturity Amount</div>
                  <div style={styles.resultValue}>
                    {formatCurrency(result.maturityAmount)}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      marginTop: "10px",
                    }}
                  >
                    After 15 years at 7.1% p.a.
                  </div>
                </div>
                <div style={styles.resultGrid}>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Total Investment</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.totalInvested)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Interest Earned</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.totalInterest)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Tax Saved (30%)</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(values.amount * 0.3)}/year
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-wise Breakdown Preview */}
              <div
                style={{
                  ...styles.mainCard,
                  marginTop: "30px",
                  background: "white",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    color: "#1e293b",
                  }}
                >
                  📊 Investment Growth Milestones
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                      padding: "16px",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#92400e",
                        marginBottom: "4px",
                      }}
                    >
                      After 5 Years
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#92400e",
                      }}
                    >
                      {formatCurrency(values.amount * 5 * 1.35)}
                    </div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                      padding: "16px",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#1e40af",
                        marginBottom: "4px",
                      }}
                    >
                      After 10 Years
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#1e40af",
                      }}
                    >
                      {formatCurrency(values.amount * 10 * 1.8)}
                    </div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                      padding: "16px",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#166534",
                        marginBottom: "4px",
                      }}
                    >
                      After 15 Years
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#166534",
                      }}
                    >
                      {formatCurrency(result.maturityAmount)}
                    </div>
                  </div>
                </div>
              </div>

              {/* PPF Benefits */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginTop: "20px",
                  border: "2px solid #86efac",
                }}
              >
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#166534",
                    marginBottom: "10px",
                  }}
                >
                  💎 PPF Exclusive Benefits
                </h4>
                <ul
                  style={{
                    color: "#166534",
                    fontSize: "14px",
                    lineHeight: "1.8",
                    marginLeft: "20px",
                  }}
                >
                  <li>
                    <strong>Triple Tax Benefit:</strong> Investment, Interest &
                    Maturity all tax-free
                  </li>
                  <li>
                    <strong>Loan Facility:</strong> Available from 3rd to 6th
                    year
                  </li>
                  <li>
                    <strong>Partial Withdrawal:</strong> Allowed from 7th year
                    onwards
                  </li>
                  <li>
                    <strong>Extension Option:</strong> Can extend in 5-year
                    blocks with/without contribution
                  </li>
                  <li>
                    <strong>No Risk:</strong> Sovereign guarantee, safest
                    investment option
                  </li>
                </ul>
              </div>

              {/* Comparison with other options */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginTop: "20px",
                  border: "2px solid #fbbf24",
                }}
              >
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#92400e",
                    marginBottom: "10px",
                  }}
                >
                  📈 PPF vs Other Investments
                </h4>
                <div style={{ fontSize: "13px", color: "#92400e" }}>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>PPF (7.1%):</strong> Tax-free returns + 80C benefit
                    = Effective ~10% for 30% tax bracket
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>FD (6.5%):</strong> Taxable returns = Effective
                    ~4.5% after tax
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <strong>NSC (7.0%):</strong> Interest taxable, only
                    investment gets 80C
                  </div>
                  <div>
                    <strong>ELSS:</strong> Market-linked risk, 3-year lock-in vs
                    PPF's guaranteed returns
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ad Space */}
        <div style={styles.adSpace}>
          <span>Advertisement Space</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default PPFCalculator;
