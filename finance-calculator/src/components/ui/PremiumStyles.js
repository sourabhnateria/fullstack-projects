export const styles = {
  // Container Styles
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)',
    paddingBottom: '40px'
  },
  
  calculatorContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  
  // Header Styles
  calculatorHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '60px 20px',
    borderRadius: '0 0 50px 50px',
    marginBottom: '40px',
    position: 'relative',
    overflow: 'hidden'
  },
  
  headerPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
  
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '16px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  
  subtitle: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  },
  
  // Card Styles
  mainCard: {
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
    padding: '40px',
    marginBottom: '30px',
    position: 'relative'
  },
  
  // Input Styles
  inputGroup: {
    marginBottom: '24px'
  },
  
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  
  input: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: '#f8fafc',
    outline: 'none',
    fontWeight: '500'
  },
  
  inputFocus: {
    borderColor: '#667eea',
    background: 'white',
    boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)'
  },
  
  select: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    background: '#f8fafc',
    cursor: 'pointer',
    outline: 'none',
    fontWeight: '500'
  },
  
  // Button Styles
  calculateButton: {
    width: '100%',
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    marginTop: '20px'
  },
  
  calculateButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)'
  },
  
  // Result Card Styles
  resultCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '32px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '30px'
  },
  
  resultPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(50%, -50%)'
  },
  
  resultMain: {
    textAlign: 'center',
    marginBottom: '30px',
    position: 'relative',
    zIndex: 1
  },
  
  resultLabel: {
    fontSize: '16px',
    opacity: 0.95,
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  
  resultValue: {
    fontSize: '48px',
    fontWeight: 'bold',
    textShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    zIndex: 1
  },
  
  resultItem: {
    textAlign: 'center'
  },
  
  resultItemLabel: {
    fontSize: '12px',
    opacity: 0.9,
    marginBottom: '4px',
    textTransform: 'uppercase'
  },
  
  resultItemValue: {
    fontSize: '24px',
    fontWeight: '600'
  },
  
  // Info Section Styles
  infoSection: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderRadius: '20px',
    padding: '30px',
    marginTop: '30px'
  },
  
  infoTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  
  infoContent: {
    color: '#64748b',
    lineHeight: '1.8',
    fontSize: '15px'
  },
  
  // Grid Layout
  calculatorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '30px',
    marginTop: '30px'
  },
  
  // Badge Styles
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '10px'
  },
  
  // Tooltip
  tooltip: {
    position: 'relative',
    display: 'inline-block',
    marginLeft: '5px',
    width: '16px',
    height: '16px',
    background: '#94a3b8',
    color: 'white',
    borderRadius: '50%',
    fontSize: '12px',
    textAlign: 'center',
    lineHeight: '16px',
    cursor: 'help'
  },
  
  // Feature List
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0'
  },
  
  featureItem: {
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  
  featureIcon: {
    width: '24px',
    height: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px'
  },
  
  // Ad Space
  adSpace: {
    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    border: '2px dashed #cbd5e1',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: '30px'
  }
};

// Helper function to apply hover effects
export const applyHoverEffect = (element, hoverStyle, normalStyle) => {
  element.addEventListener('mouseenter', () => {
    Object.assign(element.style, hoverStyle);
  });
  element.addEventListener('mouseleave', () => {
    Object.assign(element.style, normalStyle);
  });
};