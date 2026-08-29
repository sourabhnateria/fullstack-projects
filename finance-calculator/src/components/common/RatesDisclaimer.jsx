import { useState, useEffect } from 'react';
import { getLastUpdatedText, getRates } from '../../config/ratesConfig';

export const RatesDisclaimer = () => {
  const [lastUpdated, setLastUpdated] = useState('');
  
  useEffect(() => {
    setLastUpdated(getLastUpdatedText());
  }, []);
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      border: '1px solid #fbbf24',
      borderRadius: '12px',
      padding: '16px',
      margin: '20px 0',
      fontSize: '13px',
      color: '#92400e'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px' }}>⚠️</span>
        <strong>Important Disclaimer</strong>
      </div>
      <p style={{ margin: '0 0 8px 0', lineHeight: '1.5' }}>
        Interest rates shown are indicative and for calculation purposes only. 
        Actual rates may vary based on your credit profile, bank policies, and market conditions. 
        Please verify current rates with respective banks/financial institutions before making any financial decisions.
      </p>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '8px',
        borderTop: '1px solid #fbbf24',
        marginTop: '8px'
      }}>
        <span style={{ fontSize: '12px', opacity: 0.8 }}>
          📅 Rates last updated: {lastUpdated}
        </span>
        <span style={{ 
          fontSize: '11px', 
          background: 'rgba(251, 191, 36, 0.2)',
          padding: '2px 8px',
          borderRadius: '12px'
        }}>
          Auto-updates daily
        </span>
      </div>
    </div>
  );
};

export const MiniRatesInfo = () => {
  const [lastUpdated, setLastUpdated] = useState('');
  
  useEffect(() => {
    setLastUpdated(getLastUpdatedText());
  }, []);
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 16px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: '16px'
    }}>
      <span>📊 Rates as of {lastUpdated}</span>
      <span style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: 'bold'
      }}>
        LIVE
      </span>
    </div>
  );
};