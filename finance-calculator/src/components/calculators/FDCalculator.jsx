import { useState } from "react";
import { calculateFD, formatCurrency } from "../../utils/calculations";
import {
  ModernForm,
  ModernInput,
  ModernRange,
  ModernSelect,
  ModernButton,
} from "../ui/ModernFormComponents";
import { styles } from "../ui/PremiumStyles";

function FDCalculator() {
  const [values, setValues] = useState({
    amount: 100000,
    rate: 6.5,
    years: 5,
    months: 0,
    compounding: "quarterly",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const calcResult = calculateFD(
        values.amount,
        values.rate,
        values.years,
        values.months,
        values.compounding,
      );
      setResult(calcResult);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: ["compounding"].includes(name) ? value : parseFloat(value) || 0,
    });
  };

  // Bank FD rates comparison
  const bankRates = [
    { bank: "SBI", general: "6.5%", senior: "7.0%" },
    { bank: "HDFC", general: "6.75%", senior: "7.25%" },
    { bank: "ICICI", general: "6.7%", senior: "7.2%" },
    { bank: "Axis", general: "6.85%", senior: "7.35%" },
    { bank: "Post Office", general: "7.0%", senior: "7.0%" },
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div
        style={{
          ...styles.calculatorHeader,
          background: "linear-gradient(135deg, #c99999 0%, #d08080 100%)",
        }}
      >
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>🏦 Fixed Deposit Calculator</h1>
        <p style={styles.subtitle}>
          Calculate FD maturity amount with compound interest
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
            ✓ 2024 Bank Rates
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
            📊 Compound Interest
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
            🏆 Bank Comparison
          </span>
        </div>
      </div>

      <div style={styles.calculatorContainer}>
        <div style={styles.calculatorGrid}>
          {/* Modern Form */}
          <ModernForm
            title="FD Investment Details"
            subtitle="Enter deposit amount and tenure to calculate maturity"
          >
            <ModernInput
              label="Deposit Amount"
              name="amount"
              value={values.amount}
              onChange={handleInputChange}
              icon="₹"
              placeholder="Enter deposit amount"
              quickSelect={[
                { label: "₹50K", value: 50000 },
                { label: "₹1L", value: 100000 },
                { label: "₹5L", value: 500000 },
                { label: "₹10L", value: 1000000 },
                { label: "₹25L", value: 2500000 },
              ]}
              tooltip="Principal amount for fixed deposit"
            />

            <ModernRange
              label="Interest Rate"
              name="rate"
              value={values.rate}
              onChange={handleInputChange}
              min={4}
              max={10}
              step={0.1}
              unit="%"
              hint="per annum"
            />

            {/* Bank Rates Comparison */}
            <div
              style={{
                background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                padding: "12px",
                borderRadius: "12px",
                marginTop: "-10px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  marginBottom: "8px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Current Bank FD Rates (1-3 Years)
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                  gap: "8px",
                }}
              >
                {bankRates.map(({ bank, general }) => (
                  <div
                    key={bank}
                    style={{
                      background: "white",
                      padding: "6px",
                      borderRadius: "6px",
                      textAlign: "center",
                      fontSize: "11px",
                    }}
                  >
                    <div style={{ fontWeight: "600", color: "#374151" }}>
                      {bank}
                    </div>
                    <div style={{ color: "#8b5cf6", fontWeight: "bold" }}>
                      {general}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <ModernInput
                label="Years"
                name="years"
                value={values.years}
                onChange={handleInputChange}
                icon="📅"
                placeholder="Years"
                tooltip="Tenure in years"
              />

              <ModernInput
                label="Months"
                name="months"
                value={values.months}
                onChange={handleInputChange}
                icon="📆"
                placeholder="Months"
                tooltip="Additional months"
              />
            </div>

            <ModernSelect
              label="Compounding Frequency"
              name="compounding"
              value={values.compounding}
              onChange={handleInputChange}
              icon="🔄"
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "quarterly", label: "Quarterly" },
                { value: "halfyearly", label: "Half-Yearly" },
                { value: "yearly", label: "Yearly" },
              ]}
              tooltip="How often interest is compounded"
            />

            <ModernButton onClick={handleCalculate} loading={loading} icon="→">
              Calculate Maturity
            </ModernButton>
          </ModernForm>

          {/* Result Section */}
          {result && (
            <div style={{ animation: "fadeIn 0.5s ease-in" }}>
              <div
                style={{
                  ...styles.resultCard,
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
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
                    After {values.years} years{" "}
                    {values.months > 0 ? `${values.months} months` : ""} at{" "}
                    {values.rate}% p.a.
                  </div>
                </div>
                <div style={styles.resultGrid}>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Principal</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(values.amount)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Interest Earned</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.interestEarned)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Effective Yield</div>
                    <div style={styles.resultItemValue}>
                      {result.effectiveYield}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Insights */}
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
                  💡 FD Investment Tips
                </h4>
                <ul
                  style={{
                    color: "#92400e",
                    fontSize: "14px",
                    lineHeight: "1.8",
                    marginLeft: "20px",
                  }}
                >
                  <li>
                    Senior citizens get 0.50% extra interest in most banks
                  </li>
                  <li>
                    Interest above ₹40,000 (₹50,000 for seniors) is taxable
                  </li>
                  <li>Consider laddering FDs for better liquidity</li>
                  <li>5-year tax saving FD offers 80C deduction up to ₹1.5L</li>
                </ul>
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

export default FDCalculator;
