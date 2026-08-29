import { styles } from '../ui/PremiumStyles';

function Terms() {
  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div style={{
        ...styles.calculatorHeader,
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
      }}>
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>
          📜 Terms of Service
        </h1>
        <p style={styles.subtitle}>
          Please read these terms carefully before using our financial calculator services.
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
          
          {/* Important Notice */}
          <div style={{
            marginBottom: '30px',
            padding: '20px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '12px',
            border: '1px solid #fbbf24'
          }}>
            <h3 style={{ color: '#92400e', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              ⚠️ Important Notice
            </h3>
            <p style={{ color: '#92400e', margin: 0, fontSize: '15px' }}>
              All calculations are for informational purposes only. Not financial advice. Consult professionals before making financial decisions.
            </p>
          </div>

          {/* Section 1 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              ✅ 1. Acceptance of Terms
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px',
              lineHeight: '1.8'
            }}>
              <p style={{ margin: 0 }}>By accessing and using Finance Calculator India, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              🎯 2. Description of Service
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>We provide free online financial calculators for Indian users including:</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px',
                marginTop: '15px'
              }}>
                {['EMI Calculator', 'Tax Calculator', 'GST Calculator', 'SIP Calculator', 'FD Calculator', 'PPF Calculator'].map(calc => (
                  <div key={calc} style={{
                    padding: '8px 12px',
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    {calc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              🚫 3. Disclaimer of Warranties
            </h2>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              borderRadius: '10px',
              border: '1px solid #fca5a5'
            }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#991b1b' }}>The service is provided "AS IS" without warranties of any kind.</p>
              <p style={{ margin: 0, color: '#991b1b' }}>We make no warranties about the completeness, reliability, or accuracy of calculations. Results should not be considered as professional financial advice.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              ⚖️ 4. Limitation of Liability
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p style={{ marginBottom: '15px' }}>We shall not be liable for any damages arising from:</p>
              <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '2' }}>
                <li>Use or inability to use our service</li>
                <li>Any errors or inaccuracies in calculations</li>
                <li>Financial decisions made based on our calculators</li>
                <li>Any interruption or cessation of service</li>
                <li>Any other matter relating to the service</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              💡 5. Financial Advice Disclaimer
            </h2>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '10px',
              border: '1px solid #fbbf24'
            }}>
              <p style={{ margin: 0, color: '#92400e' }}>
                <strong>Important:</strong> Our calculators provide estimates only. Always consult with qualified financial advisors, tax consultants, or chartered accountants before making any financial decisions.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              📊 6. Accuracy of Information
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>Tax rates, interest rates, and other financial parameters change frequently. While we attempt to keep information current (as of FY 2024-25), users should verify all rates and rules with official sources before making decisions.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              👤 7. User Responsibilities
            </h2>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              borderRadius: '10px',
              border: '1px solid #86efac'
            }}>
              <p style={{ marginBottom: '15px', color: '#166534' }}>You are responsible for:</p>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534' }}>
                <li>Entering accurate information into calculators</li>
                <li>Verifying results with professional advisors</li>
                <li>Making your own informed financial decisions</li>
                <li>Understanding that results are estimates only</li>
              </ul>
            </div>
          </div>

          {/* Section 8 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              ©️ 8. Intellectual Property
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>All content, features, and functionality on this website are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </div>
          </div>

          {/* Section 9 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              🔗 9. Third-Party Links & Ads
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>We display advertisements through Google AdSense and may include links to third-party websites. We are not responsible for the content, privacy policies, or practices of these third-party sites.</p>
            </div>
          </div>

          {/* Section 10 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              🔄 10. Modifications to Service
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>We reserve the right to modify, suspend, or discontinue the service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance.</p>
            </div>
          </div>

          {/* Section 11 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              🏛️ 11. Governing Law
            </h2>
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <p>These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
            </div>
          </div>

          {/* Section 12 */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#1e293b',
              fontSize: '24px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              📧 12. Contact Us
            </h2>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '10px',
              border: '1px solid #93c5fd'
            }}>
              <p style={{ margin: 0, color: '#1e40af' }}>For any questions regarding these Terms of Service, please contact us through our website or email us at your convenience.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Terms;