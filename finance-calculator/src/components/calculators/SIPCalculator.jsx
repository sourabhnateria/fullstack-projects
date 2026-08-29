import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { calculateSIP, formatCurrency } from "../../utils/calculations";
import {
  ModernForm,
  ModernInput,
  ModernRange,
  ModernButton,
} from "../ui/ModernFormComponents";
import { styles } from "../ui/PremiumStyles";

function SIPCalculator() {
  const [values, setValues] = useState({
    amount: 5000,
    rate: 12,
    period: 10,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const calcResult = calculateSIP(
        values.amount,
        values.rate,
        values.period,
      );
      setResult(calcResult);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: parseFloat(e.target.value) || 0,
    });
  };

  // Generate chart data
  const getChartData = () => {
    if (!result) return [];

    const data = [];
    const monthlyRate = values.rate / 12 / 100;

    for (let year = 1; year <= values.period; year++) {
      const months = year * 12;
      const invested = values.amount * months;
      const value =
        values.amount *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

      data.push({
        year: `Year ${year}`,
        invested: Math.round(invested),
        value: Math.round(value),
      });
    }

    return data;
  };

  // Popular Mutual Fund Returns (Historical)
  const popularFunds = [
    { name: "Large Cap Funds", returns: "10-12%", risk: "Moderate" },
    { name: "Mid Cap Funds", returns: "12-15%", risk: "Moderate-High" },
    { name: "Small Cap Funds", returns: "15-18%", risk: "High" },
    { name: "ELSS (Tax Saving)", returns: "12-15%", risk: "Moderate-High" },
    { name: "Debt Funds", returns: "6-8%", risk: "Low" },
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div
        style={{
          ...styles.calculatorHeader,
          background: "linear-gradient(135deg, #9ca6b5 0%, #262b3c 100%)",
        }}
      >
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>📈 SIP Return Calculator</h1>
        <p style={styles.subtitle}>
          Calculate wealth creation through Systematic Investment Plans in
          mutual funds
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
            ✓ Power of Compounding
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
            📊 Growth Visualization
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
            title="SIP Investment Details"
            subtitle="Plan your systematic investment to achieve financial goals"
          >
            <ModernInput
              label="Monthly SIP Amount"
              name="amount"
              value={values.amount}
              onChange={handleInputChange}
              icon="₹"
              hint="Min: ₹500"
              placeholder="Enter monthly investment"
              quickSelect={[
                { label: "₹1K", value: 1000 },
                { label: "₹5K", value: 5000 },
                { label: "₹10K", value: 10000 },
                { label: "₹15K", value: 15000 },
                { label: "₹25K", value: 25000 },
              ]}
              tooltip="Amount you will invest every month"
            />

            <ModernRange
              label="Expected Return Rate"
              name="rate"
              value={values.rate}
              onChange={handleInputChange}
              min={6}
              max={20}
              step={0.5}
              unit="%"
              hint="Drag to adjust"
            />

            {/* Fund Returns Reference */}
            <div
              style={{
                background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                padding: "12px",
                borderRadius: "12px",
                marginTop: "-10px",
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
                Historical Returns by Fund Type
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "6px",
                }}
              >
                {popularFunds.map((fund) => (
                  <div
                    key={fund.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "#64748b" }}>{fund.name}</span>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#3b82f6",
                          fontWeight: "bold",
                          background: "white",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {fund.returns}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color:
                            fund.risk === "Low"
                              ? "#10b981"
                              : fund.risk === "High"
                                ? "#ef4444"
                                : "#f59e0b",
                          fontWeight: "600",
                        }}
                      >
                        {fund.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ModernInput
              label="Investment Period"
              name="period"
              value={values.period}
              onChange={handleInputChange}
              icon="📅"
              hint="In years"
              placeholder="Enter investment period"
              quickSelect={[
                { label: "5Y", value: 5 },
                { label: "10Y", value: 10 },
                { label: "15Y", value: 15 },
                { label: "20Y", value: 20 },
                { label: "25Y", value: 25 },
              ]}
              tooltip="Total period of investment in years"
            />

            <ModernButton onClick={handleCalculate} loading={loading} icon="→">
              Calculate Returns
            </ModernButton>
          </ModernForm>

          {/* Result Section */}
          {result && (
            <div style={{ animation: "fadeIn 0.5s ease-in" }}>
              <div
                style={{
                  ...styles.resultCard,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
                }}
              >
                <div style={styles.resultPattern}></div>
                <div style={styles.resultMain}>
                  <div style={styles.resultLabel}>Maturity Value</div>
                  <div style={styles.resultValue}>
                    {formatCurrency(result.maturityValue)}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      marginTop: "10px",
                    }}
                  >
                    After {values.period} years at {values.rate}% returns
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
                    <div style={styles.resultItemLabel}>Wealth Gain</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.wealthGain)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Total Returns</div>
                    <div style={styles.resultItemValue}>
                      {(
                        (result.wealthGain / result.totalInvested) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
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
                    textAlign: "center",
                    color: "#1e293b",
                  }}
                >
                  Investment Growth Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#6b7280" />
                    <YAxis
                      tickFormatter={(value) =>
                        `₹${(value / 100000).toFixed(1)}L`
                      }
                      stroke="#6b7280"
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{
                        background: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="invested"
                      stroke="#6b7280"
                      name="Amount Invested"
                      strokeWidth={2}
                      dot={{ fill: "#6b7280", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      name="Expected Value"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Investment Insights */}
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
                    marginBottom: "15px",
                  }}
                >
                  💡 Investment Insights
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#166534",
                        marginBottom: "4px",
                      }}
                    >
                      Monthly SIP
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#166534",
                      }}
                    >
                      {formatCurrency(values.amount)}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "white",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#166534",
                        marginBottom: "4px",
                      }}
                    >
                      Total Months
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#166534",
                      }}
                    >
                      {values.period * 12}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "white",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#166534",
                        marginBottom: "4px",
                      }}
                    >
                      2X in
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#166534",
                      }}
                    >
                      ~{Math.round(72 / values.rate)} years
                    </div>
                  </div>
                  <div
                    style={{
                      background: "white",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#166534",
                        marginBottom: "4px",
                      }}
                    >
                      Final Return
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#166534",
                      }}
                    >
                      {(
                        (result.wealthGain / result.totalInvested) *
                        100
                      ).toFixed(0)}
                      %
                    </div>
                  </div>
                </div>
              </div>

              {/* SIP Benefits */}
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
                  🎯 Why SIP?
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
                    <strong>Rupee Cost Averaging</strong> - Buy more units when
                    markets are low
                  </li>
                  <li>
                    <strong>Power of Compounding</strong> - Your money grows
                    exponentially
                  </li>
                  <li>
                    <strong>Disciplined Investing</strong> - Automatic deduction
                    builds wealth
                  </li>
                  <li>
                    <strong>Start Small</strong> - Begin with just ₹500 per
                    month
                  </li>
                  <li>
                    <strong>Flexibility</strong> - Pause, increase or withdraw
                    anytime
                  </li>
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

export default SIPCalculator;
