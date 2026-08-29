import { useState } from 'react';
import './ModernForm.css';

// Modern Input Component
export const ModernInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'number',
  placeholder,
  icon,
  hint,
  badge,
  error,
  success,
  quickSelect = [],
  min,
  max,
  step,
  tooltip
}) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="modern-input-group">
      <label className="modern-label">
        {icon && <span>{icon}</span>}
        {label}
        {badge && <span className="modern-label-badge">{badge}</span>}
        {hint && <span className="modern-label-hint">{hint}</span>}
        {tooltip && (
          <div className="info-tooltip">
            ?
            <div className="info-tooltip-content">{tooltip}</div>
          </div>
        )}
      </label>
      
      <div className={icon ? "modern-input-with-icon" : ""}>
        {icon && <span className="modern-input-icon">{icon}</span>}
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={(e) => {
            // Prevent negative values for number inputs
            if (type === 'number' && e.target.value < 0) {
              e.target.value = 0;
            }
            onChange(e);
          }}
          placeholder={placeholder}
          min={min || 0}
          max={max}
          step={step}
          className={`modern-input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      
      {quickSelect.length > 0 && (
        <div className="quick-select-container">
          {quickSelect.map(option => (
            <button
              key={option.value}
              type="button"
              className={`quick-select-pill ${value === option.value ? 'active' : ''}`}
              onClick={() => onChange({ target: { name, value: option.value }})}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <span>⚠️</span> {error}
        </div>
      )}
    </div>
  );
};

// Modern Select Component
export const ModernSelect = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  icon,
  hint,
  badge,
  tooltip
}) => {
  return (
    <div className="modern-input-group">
      <label className="modern-label">
        {icon && <span>{icon}</span>}
        {label}
        {badge && <span className="modern-label-badge">{badge}</span>}
        {hint && <span className="modern-label-hint">{hint}</span>}
        {tooltip && (
          <div className="info-tooltip">
            ?
            <div className="info-tooltip-content">{tooltip}</div>
          </div>
        )}
      </label>
      
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="modern-select"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Modern Range Slider Component
export const ModernRange = ({ 
  label, 
  name, 
  value, 
  onChange, 
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  showLabels = true,
  hint
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="modern-input-group">
      <label className="modern-label">
        {label}
        <span className="modern-label-hint">{value}{unit}</span>
        {hint && <span className="modern-label-hint">{hint}</span>}
      </label>
      
      <div className="modern-range-container">
        <input
          type="range"
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className="modern-range"
          style={{
            background: `linear-gradient(to right, #667eea 0%, #764ba2 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`
          }}
        />
        
        {showLabels && (
          <div className="modern-range-labels">
            <span>{min}{unit}</span>
            <span>{max}{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Modern Button Component
export const ModernButton = ({ 
  onClick, 
  children, 
  loading = false,
  disabled = false,
  variant = 'primary',
  icon
}) => {
  return (
    <button
      className={`modern-calculate-btn ${loading ? 'loading' : ''} ${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {!loading && (
        <>
          {children}
          {icon && <span style={{ marginLeft: '8px' }}>{icon}</span>}
        </>
      )}
    </button>
  );
};

// Modern Form Container
export const ModernForm = ({ children, title, subtitle }) => {
  return (
    <div className="modern-form-container">
      {title && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ 
              color: '#64748b',
              fontSize: '14px'
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

// Example Calculator with Modern Form
export const ExampleModernCalculator = () => {
  const [values, setValues] = useState({
    amount: 100000,
    rate: 8.5,
    tenure: 20,
    type: 'home'
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ModernForm 
      title="EMI Calculator"
      subtitle="Calculate your monthly loan EMI with our advanced calculator"
    >
      <ModernInput
        label="Loan Amount"
        name="amount"
        value={values.amount}
        onChange={handleChange}
        icon="₹"
        badge="NEW"
        hint="Max: ₹5 Crore"
        placeholder="Enter loan amount"
        quickSelect={[
          { label: '₹5L', value: 500000 },
          { label: '₹10L', value: 1000000 },
          { label: '₹25L', value: 2500000 },
          { label: '₹50L', value: 5000000 }
        ]}
        tooltip="Enter the total loan amount you want to borrow"
      />
      
      <ModernRange
        label="Interest Rate"
        name="rate"
        value={values.rate}
        onChange={handleChange}
        min={5}
        max={15}
        step={0.1}
        unit="%"
        hint="Current market rate: 8.5%"
      />
      
      <ModernSelect
        label="Loan Type"
        name="type"
        value={values.type}
        onChange={handleChange}
        icon="🏠"
        options={[
          { value: 'home', label: 'Home Loan' },
          { value: 'car', label: 'Car Loan' },
          { value: 'personal', label: 'Personal Loan' },
          { value: 'education', label: 'Education Loan' }
        ]}
        tooltip="Different loan types have different interest rates"
      />
      
      <ModernButton 
        onClick={() => console.log('Calculate')}
        icon="→"
      >
        Calculate EMI
      </ModernButton>
    </ModernForm>
  );
};