// Dynamic Rates Configuration
// This file manages all financial rates and can be updated easily

export const RATES_CONFIG = {
  lastUpdated: new Date().toISOString(),
  version: "1.0.0",
  
  // EMI/Home Loan Rates
  homeLoanRates: {
    SBI: { rate: 8.5, seniorRate: 8.5, floating: true },
    HDFC: { rate: 8.75, seniorRate: 8.75, floating: true },
    ICICI: { rate: 8.9, seniorRate: 8.9, floating: true },
    Axis: { rate: 8.85, seniorRate: 8.85, floating: true },
    PNB: { rate: 8.4, seniorRate: 8.4, floating: true }
  },
  
  // Car Loan Rates
  carLoanRates: {
    SBI: { rate: 7.75, processingFee: "0.5%" },
    HDFC: { rate: 8.0, processingFee: "0.5%" },
    ICICI: { rate: 8.25, processingFee: "1%" },
    Axis: { rate: 8.5, processingFee: "1%" }
  },
  
  // Personal Loan Rates
  personalLoanRates: {
    SBI: { rate: 10.5, processingFee: "1%" },
    HDFC: { rate: 10.75, processingFee: "2%" },
    ICICI: { rate: 11.25, processingFee: "2%" },
    Axis: { rate: 12.0, processingFee: "2%" }
  },
  
  // FD Rates (1-3 years tenure)
  fdRates: {
    SBI: { general: 6.5, senior: 7.0 },
    HDFC: { general: 6.75, senior: 7.25 },
    ICICI: { general: 6.7, senior: 7.2 },
    Axis: { general: 6.85, senior: 7.35 },
    PostOffice: { general: 7.0, senior: 7.0 },
    YesBank: { general: 7.25, senior: 7.75 }
  },
  
  // Government Schemes
  governmentSchemes: {
    PPF: { rate: 7.1, tenure: 15, compounding: "yearly" },
    NSC: { rate: 7.0, tenure: 5, compounding: "yearly" },
    KVP: { rate: 7.2, tenure: 10, compounding: "yearly" },
    SSY: { rate: 8.0, tenure: 21, compounding: "yearly" },
    SCSS: { rate: 8.2, tenure: 5, compounding: "quarterly" }
  },
  
  // GST Rates
  gstRates: {
    essential: { rate: 0, items: "Milk, Fruits, Vegetables, Bread" },
    common: { rate: 5, items: "Tea, Coffee, Edible Oil, Coal" },
    standard: { rate: 12, items: "Computers, Processed Food, Mobiles" },
    services: { rate: 18, items: "Most Services, FMCG Products" },
    luxury: { rate: 28, items: "Cars, Tobacco, Luxury Items" }
  },
  
  // Tax Slabs FY 2024-25
  taxSlabs: {
    newRegime: {
      slabs: [
        { min: 0, max: 300000, rate: 0 },
        { min: 300001, max: 700000, rate: 5 },
        { min: 700001, max: 1000000, rate: 10 },
        { min: 1000001, max: 1200000, rate: 15 },
        { min: 1200001, max: 1500000, rate: 20 },
        { min: 1500001, max: Infinity, rate: 30 }
      ],
      standardDeduction: 75000,
      rebateLimit: 700000
    },
    oldRegime: {
      slabs: [
        { min: 0, max: 250000, rate: 0 },
        { min: 250001, max: 500000, rate: 5 },
        { min: 500001, max: 1000000, rate: 20 },
        { min: 1000001, max: Infinity, rate: 30 }
      ],
      standardDeduction: 50000,
      rebateLimit: 500000
    }
  },
  
  // Disclaimer text
  disclaimer: "Interest rates are indicative and subject to change. Please check with respective banks/institutions for current rates. Calculations are for reference only."
};

// Function to get rates with localStorage caching
export const getRates = () => {
  const CACHE_KEY = 'financeRatesCache';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < CACHE_DURATION) {
        return data;
      }
    }
  } catch (error) {
    console.error('Cache read error:', error);
  }
  
  // Store in cache
  const cacheData = {
    data: RATES_CONFIG,
    timestamp: Date.now()
  };
  
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Cache write error:', error);
  }
  
  return RATES_CONFIG;
};

// Function to format last updated time
export const getLastUpdatedText = () => {
  const rates = getRates();
  const date = new Date(rates.lastUpdated);
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-IN', options);
};

// Function to fetch live rates (for future implementation)
export const fetchLiveRates = async () => {
  // Future implementation ideas:
  // 1. RBI API for repo rates
  // 2. NSE/BSE APIs for market data
  // 3. Bank websites scraping (with permission)
  // 4. Financial data providers (paid)
  
  // For now, return static rates
  return RATES_CONFIG;
};

// Export specific rate getters for easy access
export const getHomeLoanRates = () => getRates().homeLoanRates;
export const getFDRates = () => getRates().fdRates;
export const getGSTRates = () => getRates().gstRates;
export const getTaxSlabs = () => getRates().taxSlabs;
export const getPPFRate = () => getRates().governmentSchemes.PPF.rate;