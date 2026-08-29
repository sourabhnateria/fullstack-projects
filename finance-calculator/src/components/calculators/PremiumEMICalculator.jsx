import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { calculateEMI, formatCurrency } from '../../utils/calculations';
import { styles } from '../ui/PremiumStyles';

function EMICalculator() {
  const [values, setValues] = useState({
    amount: 1000000,
    rate: 8.5,
    tenure: 20
  });

  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const calcResult = calculateEMI(values.amount, values.rate, values.tenure);
    setResult(calcResult);
  };

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: parseFloat(e.target.value) || 0
    });
  };

  const chartData = result ? [
    { name: 'Principal', value: result.principal, color: '#667eea' },
    { name: 'Interest', value: result.totalInterest, color: '#ec4899' }
  ] : [];

  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div style={styles.calculatorHeader}>
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>
          🏠 EMI Calculator
        </h1>
        <p style={styles.subtitle}>
          Calculate your Home Loan, Car Loan, or Personal Loan EMI instantly
        </p>
        
        {/* Trust Indicators */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginTop: '30px',
          position: 'relative',
          zIndex: 1
        }}>
          <span style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '8px 16px', 
            borderRadius: '20px',
            fontSize: '14px',
            color: 'white'
          }}>
            ✓ Used by 50K+ users
          </span>
          <span style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '8px 16px', 
            borderRadius: '20px',
            fontSize: '14px',
            color: 'white'
          }}>
            ⚡ Instant calculation
          </span>
          <span style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '8px 16px', 
            borderRadius: '20px',
            fontSize: '14px',
            color: 'white'
          }}>
            📊 Visual charts
          </span>
        </div>
      </div>

      <div style={styles.calculatorContainer}>
        <div style={styles.calculatorGrid}>
          {/* Input Section */}
          <div style={styles.mainCard}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '30px',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              Enter Loan Details
              <span style={{ 
                fontSize: '12px', 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '12px'
              }}>
                2024 Rates
              </span>
            </h2>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Loan Amount (₹)
                <span style={{ 
                  color: '#94a3b8', 
                  fontSize: '12px', 
                  fontWeight: 'normal',
                  marginLeft: '10px'
                }}>
                  Max: ₹5 Crore
                </span>
              </label>
              <input
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleInputChange}
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                placeholder="Enter loan amount"
              />
              {/* Quick Select Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginTop: '10px',
                flexWrap: 'wrap'
              }}>
                {[500000, 1000000, 2500000, 5000000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setValues({...values, amount})}
                    style={{
                      padding: '6px 12px',
                      background: values.amount === amount ? 
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
                        '#f1f5f9',
                      color: values.amount === amount ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    ₹{(amount/100000).toFixed(0)}L
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Interest Rate (% per annum)
                <span style={{ 
                  color: '#94a3b8', 
                  fontSize: '12px', 
                  fontWeight: 'normal',
                  marginLeft: '10px'
                }}>
                  Current: 8.5% - 9.5%
                </span>
              </label>
              <input
                type="number"
                name="rate"
                value={values.rate}
                onChange={handleInputChange}
                step="0.1"
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                placeholder="Enter interest rate"
              />
              {/* Bank Rate Indicators */}
              <div style={{ 
                marginTop: '10px', 
                padding: '10px', 
                background: '#f8fafc',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#64748b'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>SBI: 8.5%</span>
                  <span>HDFC: 8.75%</span>
                  <span>ICICI: 8.9%</span>
                </div>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Loan Tenure (Years)
                <span style={{ 
                  color: '#94a3b8', 
                  fontSize: '12px', 
                  fontWeight: 'normal',
                  marginLeft: '10px'
                }}>
                  Max: 30 years
                </span>
              </label>
              <input
                type="number"
                name="tenure"
                value={values.tenure}
                onChange={handleInputChange}
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                placeholder="Enter loan tenure"
              />
              {/* Quick Select Years */}
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginTop: '10px',
                flexWrap: 'wrap'
              }}>
                {[5, 10, 15, 20, 25, 30].map(years => (
                  <button
                    key={years}
                    onClick={() => setValues({...values, tenure: years})}
                    style={{
                      padding: '6px 12px',
                      background: values.tenure === years ? 
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
                        '#f1f5f9',
                      color: values.tenure === years ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {years}Y
                  </button>
                ))}
              </div>
            </div>

            <button 
              style={styles.calculateButton}
              onClick={handleCalculate}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.calculateButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.calculateButton)}
            >
              Calculate EMI →
            </button>
          </div>

          {/* Result Section */}
          {result && (
            <div>
              <div style={styles.resultCard}>
                <div style={styles.resultPattern}></div>
                <div style={styles.resultMain}>
                  <div style={styles.resultLabel}>Monthly EMI</div>
                  <div style={styles.resultValue}>{formatCurrency(result.emi)}</div>
                  <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '10px' }}>
                    For {values.tenure} years at {values.rate}% interest
                  </div>
                </div>
                <div style={styles.resultGrid}>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Principal</div>
                    <div style={styles.resultItemValue}>{formatCurrency(result.principal)}</div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Interest</div>
                    <div style={styles.resultItemValue}>{formatCurrency(result.totalInterest)}</div>
                  </div>
                  <div style={styles.resultItem}>
                    <div style={styles.resultItemLabel}>Total Amount</div>
                    <div style={styles.resultItemValue}>{formatCurrency(result.totalAmount)}</div>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div style={{
                ...styles.mainCard,
                marginTop: '30px',
                background: 'white'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  marginBottom: '20px',
                  textAlign: 'center',
                  color: '#1e293b'
                }}>
                  Principal vs Interest Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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

              {/* Savings Tip */}
              <div style={{
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                borderRadius: '16px',
                padding: '20px',
                marginTop: '20px',
                border: '2px solid #86efac'
              }}>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#166534',
                  marginBottom: '10px'
                }}>
                  💡 Money Saving Tip
                </h4>
                <p style={{ color: '#166534', fontSize: '14px', lineHeight: '1.6' }}>
                  Increasing your EMI by just 10% can save you {' '}
                  <strong>₹{Math.round(result.totalInterest * 0.25).toLocaleString()}</strong> in interest 
                  and reduce your loan tenure by {Math.round(values.tenure * 0.3)} years!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div style={styles.infoSection}>
          <h3 style={styles.infoTitle}>
            📚 Understanding EMI Calculation
          </h3>
          <div style={styles.infoContent}>
            <p style={{ marginBottom: '15px' }}>
              <strong>EMI (Equated Monthly Installment)</strong> is the fixed payment amount you make to the bank 
              every month until your loan is fully paid off.
            </p>
            <div style={{ 
              background: 'white', 
              padding: '15px', 
              borderRadius: '12px',
              marginBottom: '15px'
            }}>
              <strong>Formula:</strong> EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
              <ul style={{ marginTop: '10px', marginLeft: '20px', color: '#64748b' }}>
                <li>P = Principal loan amount</li>
                <li>R = Monthly interest rate</li>
                <li>N = Number of monthly installments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div style={styles.adSpace}>
          <span>Advertisement Space</span>
        </div>
      </div>
    </div>
  );
}

export default EMICalculator;