import { useState } from "react";
import { calculateTax, formatCurrency } from "../../utils/calculations";
import {
  ModernForm,
  ModernInput,
  ModernSelect,
  ModernButton,
} from "../ui/ModernFormComponents";
import { styles } from "../ui/PremiumStyles";

function TaxCalculator() {
  const [values, setValues] = useState({
    income: 800000,
    regime: "new",
    deductions: 150000,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const calcResult = calculateTax(
        values.income,
        values.regime,
        values.regime === "old" ? values.deductions : 0,
      );
      setResult(calcResult);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: name === "regime" ? value : parseFloat(value) || 0,
    });
  };

  // Tax saving tips based on income
  const getTaxSavingTips = () => {
    if (values.income <= 700000) {
      return [
        "Your income is below ₹7L - No tax in New Regime!",
        "Consider investing in ELSS for wealth creation",
        "Start SIP for long-term financial goals",
      ];
    } else if (values.income <= 1500000) {
      return [
        "Max out 80C limit (₹1.5L) if using Old Regime",
        "Consider NPS for additional ₹50K deduction",
        "Health insurance (80D) saves up to ₹25K tax",
      ];
    } else {
      return [
        "Consider NPS for additional tax savings",
        "HRA exemption can save significant tax",
        "Invest in tax-free bonds for regular income",
      ];
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div
        style={{
          ...styles.calculatorHeader,
          background: "linear-gradient(135deg, #0cf158 0%, #e5e683 100%)",
        }}
      >
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>💼 Income Tax Calculator</h1>
        <p style={styles.subtitle}>
          FY 2024-25 | Calculate tax as per New & Old regime | AY 2025-26
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
            ✓ Latest 2024-25 Slabs
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
            📊 New vs Old Regime
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
            ⚡ Instant Results
          </span>
        </div>
      </div>

      <div style={styles.calculatorContainer}>
        <div style={styles.calculatorGrid}>
          {/* Modern Form */}
          <ModernForm
            title="Tax Calculation Details"
            subtitle="Enter your income details to calculate tax liability"
          >
            <ModernInput
              label="Annual Income"
              name="income"
              value={values.income}
              onChange={handleInputChange}
              icon="₹"
              placeholder="Enter your annual income"
              quickSelect={[
                { label: "₹5L", value: 500000 },
                { label: "₹7.5L", value: 750000 },
                { label: "₹10L", value: 1000000 },
                { label: "₹15L", value: 1500000 },
                { label: "₹25L", value: 2500000 },
              ]}
              tooltip="Your total annual income before deductions"
            />

            <ModernSelect
              label="Tax Regime"
              name="regime"
              value={values.regime}
              onChange={handleInputChange}
              icon="📋"
              badge={values.regime === "new" ? "Recommended" : ""}
              options={[
                {
                  value: "new",
                  label: "New Regime (Lower rates, No deductions)",
                },
                {
                  value: "old",
                  label: "Old Regime (Higher rates, With deductions)",
                },
              ]}
              tooltip="New regime has lower tax rates but limited deductions"
            />

            {/* Regime Comparison */}
            <div
              style={{
                background:
                  values.regime === "new"
                    ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
                    : "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                padding: "12px",
                borderRadius: "12px",
                marginTop: "-10px",
                marginBottom: "20px",
                border:
                  values.regime === "new"
                    ? "1px solid #86efac"
                    : "1px solid #fbbf24",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: values.regime === "new" ? "#166534" : "#92400e",
                  marginBottom: "8px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                {values.regime === "new"
                  ? "New Regime Benefits"
                  : "Old Regime Benefits"}
              </div>
              <ul
                style={{
                  fontSize: "12px",
                  color: values.regime === "new" ? "#166534" : "#92400e",
                  marginLeft: "16px",
                  marginBottom: "0",
                }}
              >
                {values.regime === "new" ? (
                  <>
                    <li>No tax up to ₹7 Lakh (with rebate)</li>
                    <li>Lower tax rates across all slabs</li>
                    <li>Standard deduction of ₹75,000</li>
                    <li>No documentation required</li>
                  </>
                ) : (
                  <>
                    <li>Section 80C deduction up to ₹1.5L</li>
                    <li>HRA, LTA exemptions available</li>
                    <li>Medical insurance deduction (80D)</li>
                    <li>Home loan interest deduction</li>
                  </>
                )}
              </ul>
            </div>

            {values.regime === "old" && (
              <ModernInput
                label="Total Deductions"
                name="deductions"
                value={values.deductions}
                onChange={handleInputChange}
                icon="₹"
                hint="80C, 80D, HRA, etc."
                placeholder="Enter total deductions"
                quickSelect={[
                  { label: "₹50K", value: 50000 },
                  { label: "₹1L", value: 100000 },
                  { label: "₹1.5L", value: 150000 },
                  { label: "₹2L", value: 200000 },
                  { label: "₹2.5L", value: 250000 },
                ]}
                tooltip="Total of all eligible deductions under various sections"
              />
            )}

            <ModernButton onClick={handleCalculate} loading={loading} icon="→">
              Calculate Tax
            </ModernButton>
          </ModernForm>

          {/* Result Section */}
          {result && (
            <div style={{ animation: "fadeIn 0.5s ease-in" }}>
              <div
                style={{
                  ...styles.resultCard,
                  background:
                    result.tax === 0
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                }}
              >
                <div style={styles.resultPattern}></div>
                <div style={styles.resultMain}>
                  <div style={styles.resultLabel}>
                    {result.tax === 0 ? "No Tax Payable! 🎉" : "Tax Payable"}
                  </div>
                  <div style={styles.resultValue}>
                    {formatCurrency(result.tax)}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      marginTop: "10px",
                    }}
                  >
                    {values.regime === "new"
                      ? "New Tax Regime"
                      : "Old Tax Regime"}
                  </div>
                </div>
                <div style={styles.resultGrid}>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Gross Income</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(values.income)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Taxable Income</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.taxableIncome)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Take Home</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.takeHome)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Breakdown */}
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
                  📋 Tax Calculation Breakdown
                </h3>

                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px dashed #dee2e6",
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: "12px 0", color: "#6c757d" }}>
                          Gross Income
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>
                          {formatCurrency(values.income)}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: "12px 0", color: "#6c757d" }}>
                          {values.regime === "new"
                            ? "Standard Deduction"
                            : "Deductions (80C, 80D, etc.)"}
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>
                          {formatCurrency(
                            values.regime === "new"
                              ? 75000
                              : 50000 + values.deductions,
                          )}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: "12px 0", color: "#6c757d" }}>
                          Taxable Income
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                          {formatCurrency(result.taxableIncome)}
                        </td>
                      </tr>
                      {result.rebate > 0 && (
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                          <td style={{ padding: "12px 0", color: "#6c757d" }}>
                            Rebate u/s 87A{" "}
                            {values.regime === "new"
                              ? "(Income ≤ 7L)"
                              : "(Income ≤ 5L)"}
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              fontWeight: "600",
                              color: "#10b981",
                            }}
                          >
                            -{formatCurrency(result.rebate)}
                          </td>
                        </tr>
                      )}
                      <tr style={{ borderBottom: "2px solid #495057" }}>
                        <td style={{ padding: "12px 0", color: "#6c757d" }}>
                          Tax + 4% Cess
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontWeight: "bold",
                            color: result.tax === 0 ? "#10b981" : "#ef4444",
                          }}
                        >
                          {formatCurrency(result.tax)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            padding: "12px 0",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Net Income
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#10b981",
                          }}
                        >
                          {formatCurrency(result.takeHome)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {values.income <= 700000 && values.regime === "new" && (
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "12px",
                      background:
                        "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                      borderRadius: "8px",
                      border: "1px solid #86efac",
                    }}
                  >
                    <p
                      style={{ color: "#166534", fontSize: "14px", margin: 0 }}
                    >
                      ✅ <strong>Good News!</strong> Under New Regime, income up
                      to ₹7 lakh is tax-free due to rebate u/s 87A
                    </p>
                  </div>
                )}
              </div>

              {/* Tax Saving Tips */}
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
                  💡 Tax Saving Tips for You
                </h4>
                <ul
                  style={{
                    color: "#92400e",
                    fontSize: "14px",
                    lineHeight: "1.8",
                    marginLeft: "20px",
                  }}
                >
                  {getTaxSavingTips().map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Tax Slabs Comparison */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginTop: "20px",
                  border: "2px solid #93c5fd",
                }}
              >
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#1e40af",
                    marginBottom: "15px",
                  }}
                >
                  📊 Tax Slabs Comparison (FY 2024-25)
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <div>
                    <h5
                      style={{
                        marginBottom: "10px",
                        color: "#10b981",
                        fontWeight: "bold",
                      }}
                    >
                      New Regime (Default) ✅
                    </h5>
                    <div
                      style={{
                        background: "white",
                        padding: "12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    >
                      <div style={{ marginBottom: "4px" }}>
                        ₹0 - 3L: <strong>0%</strong>
                      </div>
                      <div style={{ marginBottom: "4px" }}>
                        ₹3L - 7L: <strong>5%</strong>
                      </div>
                      <div style={{ marginBottom: "4px" }}>
                        ₹7L - 10L: <strong>10%</strong>
                      </div>
                      <div style={{ marginBottom: "4px" }}>
                        ₹10L - 12L: <strong>15%</strong>
                      </div>
                      <div style={{ marginBottom: "4px" }}>
                        ₹12L - 15L: <strong>20%</strong>
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        Above ₹15L: <strong>30%</strong>
                      </div>
                      <div
                        style={{
                          padding: "8px",
                          background: "#dcfce7",
                          borderRadius: "4px",
                          fontWeight: "bold",
                          color: "#166534",
                        }}
                      >
                        ✅ NO TAX up to ₹7 Lakh
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5
                      style={{
                        marginBottom: "10px",
                        color: "#f59e0b",
                        fontWeight: "bold",
                      }}
                    >
                      Old Regime (Optional)
                    </h5>
                    <div
                      style={{
                        background: "white",
                        padding: "12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    >
                      <div style={{ marginBottom: "4px" }}>
                        ₹0 - 2.5L: <strong>0%</strong>
                      </div>
                      <div style={{ marginBottom: "4px" }}>
                        ₹2.5L - 5L: <strong>5%</strong>
                      </div>
                      <div style={{ marginBottom: "4px" }}>
                        ₹5L - 10L: <strong>20%</strong>
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        Above ₹10L: <strong>30%</strong>
                      </div>
                      <div
                        style={{
                          padding: "8px",
                          background: "#fef3c7",
                          borderRadius: "4px",
                          color: "#92400e",
                        }}
                      >
                        + 80C, 80D, HRA, LTA deductions
                      </div>
                    </div>
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

export default TaxCalculator;
