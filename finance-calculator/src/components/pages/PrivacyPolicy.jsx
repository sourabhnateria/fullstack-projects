import { styles } from '../ui/PremiumStyles';

function PrivacyPolicy() {
  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div style={{
        ...styles.calculatorHeader,
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      }}>
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>
          🔒 Privacy Policy
        </h1>
        <p style={styles.subtitle}>
          Your privacy is important to us. This policy explains how we handle your information.
        </p>
        <div style={{ 
          marginTop: '20px',
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '20px',
          display: 'inline-block'
        }}>
          <span style={{ color: 'white', fontSize: '14px' }}>Last updated: January 9, 2025</span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}>
      
          <div style={{
            marginBottom: '30px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '12px',
            border: '1px solid #86efac'
          }}>
            <h3 style={{ color: '#166534', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              ✅ Your Data is Safe
            </h3>
            <p style={{ color: '#166534', margin: 0, fontSize: '15px' }}>
              All calculations happen in your browser. We never store or access your financial data.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              📊 1. Information We Collect
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px',
              lineHeight: '1.8'
            }}>
              <p style={{ margin: '0 0 10px 0' }}>Our calculator tools run entirely in your browser. We do not collect, store, or transmit any personal financial information you enter into our calculators.</p>
              <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                <li>✅ No storage of calculation data</li>
                <li>✅ No personal information required</li>
                <li>✅ No login or registration needed</li>
              </ul>
            </div>
          </div>
      
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              🍪 2. Cookies and Tracking
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>We use Google Analytics to understand how visitors use our site. This helps us improve our services. Google Analytics may use cookies to track visitor behavior.</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              📢 3. Advertising
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>We display advertisements through Google AdSense. Google may use cookies to serve ads based on your prior visits to our website or other websites.</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              🤝 4. Third-Party Services
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              <div style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '10px',
                border: '1px solid #93c5fd'
              }}>
                <strong style={{ color: '#1e40af' }}>Google AdSense</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#64748b' }}>For displaying advertisements</p>
              </div>
              <div style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '10px',
                border: '1px solid #fbbf24'
              }}>
                <strong style={{ color: '#92400e' }}>Google Analytics</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#64748b' }}>For website traffic analysis</p>
              </div>
              <div style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '10px',
                border: '1px solid #86efac'
              }}>
                <strong style={{ color: '#166534' }}>Vercel</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#64748b' }}>For website hosting</p>
              </div>
            </div>
          </div>
      
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              🔐 5. Data Security
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>All calculations are performed locally in your browser. We do not have access to any numbers or data you input into our calculators.</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              ⚖️ 6. Your Rights
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>Since we don't collect personal data, there is no personal information to request, modify, or delete. You can clear your browser cookies at any time to reset any tracking data.</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              👶 7. Children's Privacy
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              📝 8. Changes to This Policy
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              📧 9. Contact Us
            </h2>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '10px',
              border: '1px solid #fbbf24'
            }}>
              <p style={{ margin: 0 }}>If you have any questions about this Privacy Policy, please contact us through our website.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;