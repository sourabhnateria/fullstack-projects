export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateEMI = (principal, annualRate, years) => {
  // Validate inputs
  principal = parseFloat(principal) || 0;
  annualRate = parseFloat(annualRate) || 0;
  years = parseFloat(years) || 0;
  
  if (principal <= 0 || annualRate <= 0 || years <= 0) {
    return {
      emi: 0,
      totalAmount: 0,
      totalInterest: 0,
      principal: 0
    };
  }
  
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
              (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  
  return {
    emi: isNaN(emi) ? 0 : Math.round(emi),
    totalAmount: isNaN(totalAmount) ? 0 : Math.round(totalAmount),
    totalInterest: isNaN(totalInterest) ? 0 : Math.round(totalInterest),
    principal: principal
  };
};

export const calculateGST = (amount, rate, type) => {
  // Validate inputs
  amount = parseFloat(amount) || 0;
  rate = parseFloat(rate) || 0;
  
  if (amount <= 0) {
    return {
      baseAmount: 0,
      gstAmount: 0,
      cgst: 0,
      sgst: 0,
      totalAmount: 0
    };
  }
  
  let baseAmount, gstAmount, totalAmount;
  
  if (type === 'exclusive') {
    baseAmount = amount;
    gstAmount = amount * rate / 100;
    totalAmount = amount + gstAmount;
  } else {
    totalAmount = amount;
    baseAmount = amount / (1 + rate / 100);
    gstAmount = totalAmount - baseAmount;
  }
  
  return {
    baseAmount: isNaN(baseAmount) ? 0 : Math.round(baseAmount),
    gstAmount: isNaN(gstAmount) ? 0 : Math.round(gstAmount),
    cgst: isNaN(gstAmount) ? 0 : Math.round(gstAmount / 2),
    sgst: isNaN(gstAmount) ? 0 : Math.round(gstAmount / 2),
    totalAmount: isNaN(totalAmount) ? 0 : Math.round(totalAmount)
  };
};

export const calculateSIP = (monthlyAmount, annualRate, years) => {
  // Validate inputs
  monthlyAmount = parseFloat(monthlyAmount) || 0;
  annualRate = parseFloat(annualRate) || 0;
  years = parseFloat(years) || 0;
  
  if (monthlyAmount <= 0 || annualRate <= 0 || years <= 0) {
    return {
      maturityValue: 0,
      totalInvested: 0,
      wealthGain: 0
    };
  }
  
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  const maturityValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalInvested = monthlyAmount * months;
  const wealthGain = maturityValue - totalInvested;
  
  return {
    maturityValue: isNaN(maturityValue) ? 0 : Math.round(maturityValue),
    totalInvested: isNaN(totalInvested) ? 0 : Math.round(totalInvested),
    wealthGain: isNaN(wealthGain) ? 0 : Math.round(wealthGain)
  };
};

export const calculateTax = (income, regime, deductions = 0) => {
  // Validate inputs
  income = parseFloat(income) || 0;
  deductions = parseFloat(deductions) || 0;
  
  if (income <= 0) {
    return {
      tax: 0,
      taxableIncome: 0,
      takeHome: 0,
      rebate: 0
    };
  }
  
  let taxableIncome = income;
  let tax = 0;
  let rebate = 0;
  
  if (regime === 'new') {
    // New Regime FY 2024-25 (Budget 2024)
    // Standard deduction increased to 75000
    taxableIncome = income - 75000;
    
    if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome <= 700000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 20000 + (taxableIncome - 700000) * 0.10;
    } else if (taxableIncome <= 1200000) {
      tax = 50000 + (taxableIncome - 1000000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      tax = 80000 + (taxableIncome - 1200000) * 0.20;
    } else {
      tax = 140000 + (taxableIncome - 1500000) * 0.30;
    }
    
    // Rebate u/s 87A - No tax up to 7 lakh income
    if (income <= 700000) {
      rebate = tax;
      tax = 0;
    }
  } else {
    // Old Regime
    taxableIncome = income - 50000 - deductions;
    
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.20;
    } else {
      tax = 112500 + (taxableIncome - 1000000) * 0.30;
    }
    
    // Rebate u/s 87A for old regime - up to 5 lakh
    if (taxableIncome <= 500000) {
      rebate = Math.min(tax, 12500);
      tax = Math.max(0, tax - rebate);
    }
  }
  
  // Add cess 4% on tax (not on rebate)
  if (tax > 0) {
    tax = tax * 1.04;
  }
  
  return {
    tax: Math.round(tax),
    taxableIncome: Math.max(0, Math.round(taxableIncome)),
    takeHome: Math.round(income - tax),
    rebate: Math.round(rebate)
  };
};

export const calculateFD = (principal, annualRate, years, months = 0, compounding = 'quarterly') => {
  // Validate inputs
  principal = parseFloat(principal) || 0;
  annualRate = parseFloat(annualRate) || 0;
  years = parseFloat(years) || 0;
  months = parseFloat(months) || 0;
  
  if (principal <= 0 || annualRate <= 0 || (years <= 0 && months <= 0)) {
    return {
      maturityAmount: 0,
      interestEarned: 0,
      effectiveYield: '0.00'
    };
  }
  
  const totalMonths = years * 12 + months;
  const totalYears = totalMonths / 12;
  
  let n;
  switch(compounding) {
    case 'monthly': n = 12; break;
    case 'quarterly': n = 4; break;
    case 'halfyearly': n = 2; break;
    case 'yearly': n = 1; break;
    default: n = 4;
  }
  
  const maturityAmount = principal * Math.pow(1 + (annualRate / 100) / n, n * totalYears);
  const interestEarned = maturityAmount - principal;
  const effectiveYield = (Math.pow(1 + (annualRate / 100) / n, n) - 1) * 100;
  
  return {
    maturityAmount: isNaN(maturityAmount) ? 0 : Math.round(maturityAmount),
    interestEarned: isNaN(interestEarned) ? 0 : Math.round(interestEarned),
    effectiveYield: isNaN(effectiveYield) ? '0.00' : effectiveYield.toFixed(2)
  };
};

export const calculatePPF = (yearlyAmount) => {
  // Validate input
  yearlyAmount = parseFloat(yearlyAmount) || 0;
  
  if (yearlyAmount <= 0) {
    return {
      maturityAmount: 0,
      totalInvested: 0,
      totalInterest: 0
    };
  }
  
  // Ensure PPF limits (min 500, max 150000)
  yearlyAmount = Math.min(Math.max(yearlyAmount, 500), 150000);
  
  const rate = 7.1 / 100;
  const years = 15;
  let balance = 0;
  
  for (let i = 0; i < years; i++) {
    balance = (balance + yearlyAmount) * (1 + rate);
  }
  
  const totalInvested = yearlyAmount * years;
  const totalInterest = balance - totalInvested;
  
  return {
    maturityAmount: isNaN(balance) ? 0 : Math.round(balance),
    totalInvested: isNaN(totalInvested) ? 0 : Math.round(totalInvested),
    totalInterest: isNaN(totalInterest) ? 0 : Math.round(totalInterest)
  };
};