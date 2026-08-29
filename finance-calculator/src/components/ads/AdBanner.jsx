import { useEffect } from 'react';
import './AdBanner.css';

function AdBanner({ type }) {
  useEffect(() => {
    // This is where you'll add Google AdSense code
    // For now, it's a placeholder
    // When you get AdSense approval, replace with:
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className={`ad-banner ad-banner-${type}`}>
      <div className="ad-placeholder">
        <span>AdSense {type === 'top' ? 'Header' : 'Footer'} Banner (728x90)</span>
        {/* Replace with actual AdSense code:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        */}
      </div>
    </div>
  );
}

export default AdBanner;