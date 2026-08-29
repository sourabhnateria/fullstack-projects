// Real visitor tracking using localStorage
export const analytics = {
  // Initialize analytics
  init() {
    // Track unique visitor
    if (!localStorage.getItem('visitorId')) {
      localStorage.setItem('visitorId', Date.now().toString());
      this.incrementVisitors();
    }
    
    // Track page views
    this.incrementPageViews();
    
    // Track session
    this.trackSession();
  },
  
  // Get total visitors (starts from 0, real count)
  getVisitors() {
    return parseInt(localStorage.getItem('totalVisitors') || '0');
  },
  
  // Increment visitor count
  incrementVisitors() {
    const current = this.getVisitors();
    localStorage.setItem('totalVisitors', (current + 1).toString());
  },
  
  // Get page views
  getPageViews() {
    return parseInt(localStorage.getItem('totalPageViews') || '0');
  },
  
  // Increment page views
  incrementPageViews() {
    const current = this.getPageViews();
    localStorage.setItem('totalPageViews', (current + 1).toString());
  },
  
  // Get calculations done
  getCalculations() {
    return parseInt(localStorage.getItem('totalCalculations') || '0');
  },
  
  // Track when user does a calculation
  trackCalculation(type) {
    const current = this.getCalculations();
    localStorage.setItem('totalCalculations', (current + 1).toString());
    
    // Track specific calculator usage
    const calcKey = `calc_${type}`;
    const calcCount = parseInt(localStorage.getItem(calcKey) || '0');
    localStorage.setItem(calcKey, (calcCount + 1).toString());
    
    // Track last calculation time
    localStorage.setItem('lastCalculation', new Date().toISOString());
  },
  
  // Get most used calculator
  getMostUsedCalculator() {
    const calculators = ['emi', 'tax', 'gst', 'sip', 'fd', 'ppf'];
    let maxUse = 0;
    let mostUsed = '';
    
    calculators.forEach(calc => {
      const count = parseInt(localStorage.getItem(`calc_${calc}`) || '0');
      if (count > maxUse) {
        maxUse = count;
        mostUsed = calc;
      }
    });
    
    return { name: mostUsed, count: maxUse };
  },
  
  // Track active session
  trackSession() {
    const now = Date.now();
    const lastActive = localStorage.getItem('lastActive');
    
    // New session if more than 30 minutes inactive
    if (!lastActive || now - parseInt(lastActive) > 30 * 60 * 1000) {
      const sessions = parseInt(localStorage.getItem('totalSessions') || '0');
      localStorage.setItem('totalSessions', (sessions + 1).toString());
    }
    
    localStorage.setItem('lastActive', now.toString());
  },
  
  // Get current active users (simulated based on recent activity)
  getActiveUsers() {
    // This would need a backend to be truly accurate
    // For now, we'll show "1" when user is active
    const lastActive = localStorage.getItem('lastActive');
    if (lastActive && Date.now() - parseInt(lastActive) < 5 * 60 * 1000) {
      return 1; // User is currently active
    }
    return 0;
  },
  
  // Get statistics summary
  getStats() {
    return {
      visitors: this.getVisitors(),
      pageViews: this.getPageViews(),
      calculations: this.getCalculations(),
      sessions: parseInt(localStorage.getItem('totalSessions') || '0'),
      mostUsed: this.getMostUsedCalculator(),
      activeNow: this.getActiveUsers()
    };
  },
  
  // Clear all analytics (for testing)
  reset() {
    const keys = [
      'visitorId', 'totalVisitors', 'totalPageViews', 
      'totalCalculations', 'totalSessions', 'lastActive',
      'lastCalculation', 'calc_emi', 'calc_tax', 
      'calc_gst', 'calc_sip', 'calc_fd', 'calc_ppf'
    ];
    keys.forEach(key => localStorage.removeItem(key));
  }
};

// Google Analytics Integration (when you add it)
export const ga = {
  // Track page view
  pageview(path) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
      });
    }
  },
  
  // Track events
  event(action, category, label, value) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }
};