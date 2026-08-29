import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { calculateEMI, formatCurrency } from "../../utils/calculations";
import {
  ModernForm,
  ModernInput,
  ModernRange,
  ModernSelect,
  ModernButton,
} from "../ui/ModernFormComponents";
import { styles } from "../ui/PremiumStyles";
import { getHomeLoanRates, getRates } from "../../config/ratesConfig";
import { MiniRatesInfo } from "../common/RatesDisclaimer";

function EMICalculator() {
  const [values, setValues] = useState({
    amount: 1000000,
    rate: 8.5,
    tenure: 20,
    loanType: "home",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    // Simulate calculation delay for effect
    setTimeout(() => {
      const calcResult = calculateEMI(
        values.amount,
        values.rate,
        values.tenure,
      );
      setResult(calcResult);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For select inputs, keep as string
    if (name === "loanType") {
      setValues({ ...values, [name]: value });
    } else {
      // For number inputs, parse and ensure valid number
      const numValue = value === "" ? 0 : parseFloat(value) || 0;
      setValues({ ...values, [name]: Math.max(0, numValue) });
    }
  };

  const chartData = result
    ? [
        { name: "Principal", value: result.principal, color: "#a7acc1" },
        { name: "Interest", value: result.totalInterest, color: "#ec4899" },
      ]
    : [];

  // Get bank rates from config
  const [bankRates, setBankRates] = useState({});

  useEffect(() => {
    const rates = getRates();
    let currentRates = {};

    switch (values.loanType) {
      case "home":
        Object.entries(rates.homeLoanRates).forEach(([bank, data]) => {
          currentRates[bank] = `${data.rate}%`;
        });
        break;
      case "car":
        Object.entries(rates.carLoanRates).forEach(([bank, data]) => {
          currentRates[bank] = `${data.rate}%`;
        });
        break;
      case "personal":
        Object.entries(rates.personalLoanRates).forEach(([bank, data]) => {
          currentRates[bank] = `${data.rate}%`;
        });
        break;
      default:
        Object.entries(rates.homeLoanRates).forEach(([bank, data]) => {
          currentRates[bank] = `${data.rate}%`;
        });
    }

    setBankRates(currentRates);
  }, [values.loanType]);

  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div
        style={{
          ...styles.calculatorHeader,
          background: "linear-gradient(135deg, #96a6e4 0%, #bc4b83 100%)",
        }}
      >
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>💳 EMI Calculator</h1>
        <p style={styles.subtitle}>
          Calculate your Home Loan, Car Loan, or Personal Loan EMI instantly
          with bank comparisons
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
            ✓ 2024 Interest Rates
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
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "white",
            }}
          >
            📊 Visual Charts
          </span>
        </div>
      </div>

      <div style={styles.calculatorContainer}>
        <div style={styles.calculatorGrid}>
          {/* Modern Form */}
          <ModernForm
            title="Enter Loan Details"
            subtitle="Get accurate EMI calculations with latest interest rates"
          >
            <MiniRatesInfo />
            <ModernSelect
              label="Loan Type"
              name="loanType"
              value={values.loanType}
              onChange={handleInputChange}
              icon="🏦"
              badge="Popular"
              options={[
                { value: "home", label: "Home Loan" },
                { value: "car", label: "Car Loan" },
                { value: "personal", label: "Personal Loan" },
                { value: "education", label: "Education Loan" },
                { value: "gold", label: "Gold Loan" },
              ]}
              tooltip="Different loan types have different interest rates"
            />

            <ModernInput
              label="Loan Amount"
              name="amount"
              value={values.amount}
              onChange={handleInputChange}
              icon="₹"
              hint="Max: ₹5 Crore"
              placeholder="Enter loan amount"
              quickSelect={[
                { label: "₹5L", value: 500000 },
                { label: "₹10L", value: 1000000 },
                { label: "₹25L", value: 2500000 },
                { label: "₹50L", value: 5000000 },
                { label: "₹1Cr", value: 10000000 },
              ]}
              tooltip="Total amount you want to borrow"
            />

            <ModernRange
              label="Interest Rate"
              name="rate"
              value={values.rate}
              onChange={handleInputChange}
              min={5}
              max={20}
              step={0.1}
              unit="%"
              hint="Drag to adjust"
            />

            {/* Bank Rate Comparison */}
            <div
              style={{
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                padding: "12px",
                borderRadius: "12px",
                marginTop: "-10px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#6c757d",
                  marginBottom: "8px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Current Bank Rates for{" "}
                {values.loanType === "home"
                  ? "Home"
                  : values.loanType === "car"
                    ? "Car"
                    : "Personal"}{" "}
                Loan
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "8px",
                }}
              >
                {Object.entries(bankRates).map(([bank, rate]) => (
                  <div
                    key={bank}
                    style={{
                      background: "white",
                      padding: "6px 8px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      textAlign: "center",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    <div style={{ fontWeight: "600", color: "#495057" }}>
                      {bank}
                    </div>
                    <div style={{ color: "#a7acc1", fontWeight: "bold" }}>
                      {rate}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ModernInput
              label="Loan Tenure"
              name="tenure"
              value={values.tenure}
              onChange={handleInputChange}
              icon="📅"
              hint="Max: 30 years"
              placeholder="Enter tenure in years"
              quickSelect={[
                { label: "5Y", value: 5 },
                { label: "10Y", value: 10 },
                { label: "15Y", value: 15 },
                { label: "20Y", value: 20 },
                { label: "25Y", value: 25 },
                { label: "30Y", value: 30 },
              ]}
              tooltip="Loan repayment period in years"
            />

            <ModernButton onClick={handleCalculate} loading={loading} icon="→">
              Calculate EMI
            </ModernButton>
          </ModernForm>

          {/* Result Section */}
          {result && (
            <div style={{ animation: "fadeIn 0.5s ease-in" }}>
              <div
                style={{
                  ...styles.resultCard,
                  background:
                    "linear-gradient(135deg, #a7acc1 0%, #ec4899 100%)",
                }}
              >
                <div style={styles.resultPattern}></div>
                <div style={styles.resultMain}>
                  <div style={styles.resultLabel}>Monthly EMI</div>
                  <div style={styles.resultValue}>
                    {formatCurrency(result.emi)}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      marginTop: "10px",
                    }}
                  >
                    For {values.tenure} years at {values.rate}% interest
                  </div>
                </div>
                <div style={styles.resultGrid}>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Principal</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.principal)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Interest</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.totalInterest)}
                    </div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Total Amount</div>
                    <div style={styles.resultItemValue}>
                      {formatCurrency(result.totalAmount)}
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
                  Principal vs Interest Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Money Saving Tips */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
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
                  💡 Smart Money Tips
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
                    Paying extra ₹
                    {Math.round(result.emi * 0.1).toLocaleString()} monthly
                    saves{" "}
                    <strong>
                      ₹
                      {Math.round(result.totalInterest * 0.25).toLocaleString()}
                    </strong>{" "}
                    in interest
                  </li>
                  <li>
                    Making one extra EMI per year reduces tenure by{" "}
                    <strong>{Math.round(values.tenure * 0.15)} years</strong>
                  </li>
                  <li>Consider refinancing if rates drop by more than 1%</li>
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

export default EMICalculator;
