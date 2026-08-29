import { useState } from "react";
import { calculateGST, formatCurrency } from "../../utils/calculations";
import {
  ModernForm,
  ModernInput,
  ModernSelect,
  ModernButton,
} from "../ui/ModernFormComponents";
import { styles } from "../ui/PremiumStyles";

function GSTCalculator() {
  const [values, setValues] = useState({
    amount: 10000,
    rate: 18,
    type: "exclusive",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const calcResult = calculateGST(values.amount, values.rate, values.type);
      setResult(calcResult);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: name === "type" ? value : parseFloat(value) || 0,
    });
  };

  // Common GST categories (Updated GST 2.0 - Effective Sept 22, 2025)
  const gstCategories = {
    0: {
      items: "Milk, Fresh Fruits, Vegetables, Bread, Health Insurance",
      color: "#10b981",
    },
    5: {
      items:
        "Hair Oil, Toothpaste, Hotels (up to ₹7,500), Gyms, Salons, Handicrafts, Spectacles",
      color: "#06b6d4",
    },
    12: {
      items: "Processed Food, Butter, Ghee (Being phased out)",
      color: "#8b5cf6",
      badge: "Legacy",
    },
    18: {
      items: "Most Services, FMCG, TVs, ACs, Cement (Reduced from 28%)",
      color: "#f59e0b",
    },
    28: {
      items: "Premium Cars, Motorcycles >350cc (Being phased out)",
      color: "#ef4444",
      badge: "Legacy",
    },
    40: {
      items:
        "Pan Masala, Aerated Waters, Caffeinated Drinks, Luxury Vehicles, Sin Goods",
      color: "#dc2626",
      badge: "New!",
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div
        style={{
          ...styles.calculatorHeader,
          background: "linear-gradient(135deg, #38eaea 0%, #e47fb2 100%)",
        }}
      >
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>🧮 GST Calculator</h1>
        <p style={styles.subtitle}>
          Calculate GST for goods and services with CGST/SGST breakdown
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
            ✓ GST 2.0 - Updated Sept 2025
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
            📊 CGST/SGST Split
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
            ⚡ Instant Calculation
          </span>
        </div>
      </div>

      <div style={styles.calculatorContainer}>
        <div style={styles.calculatorGrid}>
          {/* Modern Form */}
          <ModernForm
            title="Calculate GST"
            subtitle="Enter amount to calculate GST inclusive or exclusive"
          >
            <ModernInput
              label="Amount"
              name="amount"
              value={values.amount}
              onChange={handleInputChange}
              icon="₹"
              placeholder="Enter amount"
              quickSelect={[
                { label: "₹1K", value: 1000 },
                { label: "₹5K", value: 5000 },
                { label: "₹10K", value: 10000 },
                { label: "₹50K", value: 50000 },
                { label: "₹1L", value: 100000 },
              ]}
              tooltip="Enter the amount for GST calculation"
            />

            <ModernSelect
              label="GST Rate"
              name="rate"
              value={values.rate}
              onChange={handleInputChange}
              icon="📊"
              badge="GST 2.0"
              options={[
                { value: 0, label: "0% - Essential Items" },
                { value: 5, label: "5% - Daily Essentials (Primary Slab)" },
                {
                  value: 12,
                  label: "12% - Standard Goods (Legacy - Being Phased Out)",
                },
                { value: 18, label: "18% - Most Services (Primary Slab)" },
                {
                  value: 28,
                  label: "28% - Luxury Items (Legacy - Being Phased Out)",
                },
                { value: 40, label: "40% - Sin Goods & Luxury (New!)" },
              ]}
              tooltip="Select the applicable GST rate (Updated as per GST 2.0 reforms)"
            />

            {/* GST Rate Info Card */}
            <div
              style={{
                background: `linear-gradient(135deg, ${gstCategories[values.rate]?.color || "#667eea"}15 0%, ${gstCategories[values.rate]?.color || "#667eea"}05 100%)`,
                padding: "12px",
                borderRadius: "12px",
                marginTop: "-10px",
                marginBottom: "20px",
                border: `1px solid ${gstCategories[values.rate]?.color || "#667eea"}30`,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#6c757d",
                  marginBottom: "4px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Common items in {values.rate}% GST
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#495057",
                  fontWeight: "500",
                }}
              >
                {gstCategories[values.rate]?.items ||
                  "Various goods and services"}
              </div>
            </div>

            <ModernSelect
              label="Calculation Type"
              name="type"
              value={values.type}
              onChange={handleInputChange}
              icon="🔄"
              options={[
                { value: "exclusive", label: "Exclusive (Add GST to amount)" },
                {
                  value: "inclusive",
                  label: "Inclusive (Extract GST from amount)",
                },
              ]}
              tooltip="Choose whether to add GST or extract GST from amount"
            />

            <ModernButton onClick={handleCalculate} loading={loading} icon="→">
              Calculate GST
            </ModernButton>
          </ModernForm>

          {/* Result Section */}
          {result && (
            <div style={{ animation: "fadeIn 0.5s ease-in" }}>
              <div
                style={{
                  ...styles.resultCard,
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                }}
              >
                <div style={styles.resultPattern}></div>
                <div style={styles.resultMain}>
                  <div style={styles.resultLabel}>Total Amount</div>
                  <div style={styles.resultValue}>
                    {formatCurrency(result.totalAmount)}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      marginTop: "10px",
                    }}
                  >
                    {values.type === "exclusive" ? "After adding" : "Including"}{" "}
                    {values.rate}% GST
                  </div>
                </div>
                <div style={styles.resultGrid}>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Base Amount</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.baseAmount)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Total GST</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.gstAmount)}
                    </div>
                  </div>
                </div>
              </div>

              {/* GST Breakdown */}
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
                  📋 GST Breakdown
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid #93c5fd",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#1e40af",
                        marginBottom: "4px",
                        fontWeight: "600",
                      }}
                    >
                      CGST ({values.rate / 2}%)
                    </div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#1e40af",
                      }}
                    >
                      {formatCurrency(result.cgst)}
                    </div>
                  </div>

                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid #f9a8d4",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#be185d",
                        marginBottom: "4px",
                        fontWeight: "600",
                      }}
                    >
                      SGST/UTGST ({values.rate / 2}%)
                    </div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#be185d",
                      }}
                    >
                      {formatCurrency(result.sgst)}
                    </div>
                  </div>
                </div>

                {/* Invoice Style Summary */}
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
                          Base Amount
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>
                          {formatCurrency(result.baseAmount)}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: "12px 0", color: "#6c757d" }}>
                          <span>CGST @ {values.rate / 2}%</span>
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>
                          {formatCurrency(result.cgst)}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: "12px 0", color: "#6c757d" }}>
                          <span>SGST/UTGST @ {values.rate / 2}%</span>
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>
                          {formatCurrency(result.sgst)}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "2px solid #495057" }}>
                        <td style={{ padding: "12px 0", color: "#6c757d" }}>
                          Total GST ({values.rate}%)
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontWeight: "bold",
                            color: "#059669",
                          }}
                        >
                          {formatCurrency(result.gstAmount)}
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
                          Final Amount
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#10b981",
                          }}
                        >
                          {formatCurrency(result.totalAmount)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* GST Rate Guide */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginTop: "20px",
                  border: "2px solid #7dd3fc",
                }}
              >
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0369a1",
                    marginBottom: "15px",
                  }}
                >
                  📊 GST Rate Guide 2025 (GST 2.0 Reforms)
                </h4>
                <div style={{ display: "grid", gap: "10px" }}>
                  {Object.entries(gstCategories).map(([rate, info]) => (
                    <div
                      key={rate}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          background: info.color,
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          minWidth: "45px",
                          textAlign: "center",
                        }}
                      >
                        {rate}%
                      </div>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "13px",
                          flex: 1,
                        }}
                      >
                        {info.items}
                      </div>
                      {info.badge && (
                        <span
                          style={{
                            background: rate === "40" ? "#10b981" : "#f59e0b",
                            color: "white",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {info.badge}
                        </span>
                      )}
                    </div>
                  ))}
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

export default GSTCalculator;
