import { styles } from './PremiumStyles';

export const CalculatorLayout = ({ 
  icon, 
  title, 
  subtitle, 
  children, 
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  stats = []
}) => {
  return (
    <div style={styles.pageContainer}>
      {/* Premium Header */}
      <div style={{ ...styles.calculatorHeader, background: gradient }}>
        <div style={styles.headerPattern}></div>
        <h1 style={styles.title}>
          {icon} {title}
        </h1>
        <p style={styles.subtitle}>
          {subtitle}
        </p>
        
        {/* Trust Indicators */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginTop: '30px',
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap'
        }}>
          {stats.map((stat, index) => (
            <span key={index} style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '8px 16px', 
              borderRadius: '20px',
              fontSize: '14px',
              color: 'white'
            }}>
              {stat}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.calculatorContainer}>
        {children}
        
        {/* Ad Space */}
        <div style={styles.adSpace}>
          <span>Advertisement Space - High CTR Zone</span>
        </div>
      </div>
    </div>
  );
};

export const InputCard = ({ title, badge, children }) => (
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
      {title}
      {badge && (
        <span style={{ 
          fontSize: '12px', 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '12px'
        }}>
          {badge}
        </span>
      )}
    </h2>
    {children}
  </div>
);

export const ResultCard = ({ 
  label, 
  value, 
  subtitle, 
  details = [], 
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
}) => (
  <div style={{ ...styles.resultCard, background: gradient }}>
    <div style={styles.resultPattern}></div>
    <div style={styles.resultMain}>
      <div style={styles.resultLabel}>{label}</div>
      <div style={styles.resultValue}>{value}</div>
      {subtitle && (
        <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '10px' }}>
          {subtitle}
        </div>
      )}
    </div>
    {details.length > 0 && (
      <div style={styles.resultGrid}>
        {details.map((detail, index) => (
          <div key={index} style={styles.resultItem}>
            <div style={styles.resultItemLabel}>{detail.label}</div>
            <div style={styles.resultItemValue}>{detail.value}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const QuickSelectButtons = ({ options, value, onChange, suffix = '' }) => (
  <div style={{ 
    display: 'flex', 
    gap: '10px', 
    marginTop: '10px',
    flexWrap: 'wrap'
  }}>
    {options.map(option => (
      <button
        key={option}
        onClick={() => onChange(option)}
        style={{
          padding: '6px 12px',
          background: value === option ? 
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
            '#f1f5f9',
          color: value === option ? 'white' : '#64748b',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {typeof option === 'number' && option >= 100000 
          ? `₹${(option/100000).toFixed(0)}L` 
          : option}{suffix}
      </button>
    ))}
  </div>
);

export const PremiumInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'number',
  step,
  hint,
  quickSelect = []
}) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>
      {label}
      {hint && (
        <span style={{ 
          color: '#94a3b8', 
          fontSize: '12px', 
          fontWeight: 'normal',
          marginLeft: '10px'
        }}>
          {hint}
        </span>
      )}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      step={step}
      style={styles.input}
      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
      onBlur={(e) => Object.assign(e.target.style, styles.input)}
      placeholder={placeholder}
    />
    {quickSelect.length > 0 && (
      <QuickSelectButtons 
        options={quickSelect} 
        value={value} 
        onChange={(val) => onChange({ target: { name, value: val }})}
      />
    )}
  </div>
);

export const PremiumSelect = ({ label, name, value, onChange, hint, children }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>
      {label}
      {hint && (
        <span style={{ 
          color: '#94a3b8', 
          fontSize: '12px', 
          fontWeight: 'normal',
          marginLeft: '10px'
        }}>
          {hint}
        </span>
      )}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={styles.select}
    >
      {children}
    </select>
  </div>
);

export const CalculateButton = ({ onClick, text = "Calculate →" }) => (
  <button 
    style={styles.calculateButton}
    onClick={onClick}
    onMouseEnter={(e) => Object.assign(e.target.style, styles.calculateButtonHover)}
    onMouseLeave={(e) => Object.assign(e.target.style, styles.calculateButton)}
  >
    {text}
  </button>
);

export const InfoSection = ({ title, children }) => (
  <div style={styles.infoSection}>
    <h3 style={styles.infoTitle}>
      {title}
    </h3>
    <div style={styles.infoContent}>
      {children}
    </div>
  </div>
);

export const TipCard = ({ title, content, color = 'green' }) => {
  const colors = {
    green: {
      bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
      border: '#86efac',
      text: '#166534'
    },
    blue: {
      bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      border: '#60a5fa',
      text: '#1e40af'
    },
    yellow: {
      bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      border: '#fbbf24',
      text: '#92400e'
    }
  };

  const style = colors[color] || colors.green;

  return (
    <div style={{
      background: style.bg,
      borderRadius: '16px',
      padding: '20px',
      marginTop: '20px',
      border: `2px solid ${style.border}`
    }}>
      <h4 style={{ 
        fontSize: '16px', 
        fontWeight: 'bold', 
        color: style.text,
        marginBottom: '10px'
      }}>
        {title}
      </h4>
      <p style={{ color: style.text, fontSize: '14px', lineHeight: '1.6' }}>
        {content}
      </p>
    </div>
  );
};