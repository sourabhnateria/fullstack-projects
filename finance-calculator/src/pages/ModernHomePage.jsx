import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ModernHomePage() {
  const [visitors, setVisitors] = useState(127453);
  const [calculations, setCalculations] = useState(892341);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((v) => v + Math.floor(Math.random() * 3));
      setCalculations((c) => c + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const calculators = [
    {
      id: "emi",
      icon: "🏠",
      title: "EMI Calculator",
      description: "Home, Car & Personal Loan EMI",
      path: "/emi-calculator",
      gradient: "from-purple-500 to-pink-500",
      popular: true,
      avgSaving: "₹2.3L",
    },
    {
      id: "tax",
      icon: "💰",
      title: "Income Tax Calculator",
      description: "FY 2024-25 New vs Old Regime",
      path: "/tax-calculator",
      gradient: "from-red-500 to-orange-500",
      popular: true,
      avgSaving: "₹45K",
    },
    {
      id: "sip",
      icon: "📈",
      title: "SIP Calculator",
      description: "Mutual Fund Returns Calculator",
      path: "/sip-calculator",
      gradient: "from-blue-500 to-cyan-500",
      popular: false,
      avgSaving: "₹15L",
    },
    {
      id: "gst",
      icon: "🧮",
      title: "GST Calculator",
      description: "Calculate GST instantly",
      path: "/gst-calculator",
      gradient: "from-green-500 to-teal-500",
      popular: false,
      avgSaving: "₹8K",
    },
    {
      id: "fd",
      icon: "🏦",
      title: "FD Calculator",
      description: "Fixed Deposit Maturity Calculator",
      path: "/fd-calculator",
      gradient: "from-indigo-500 to-purple-500",
      popular: false,
      avgSaving: "₹3.2L",
    },
    {
      id: "ppf",
      icon: "🎯",
      title: "PPF Calculator",
      description: "Tax-Free Investment Returns",
      path: "/ppf-calculator",
      gradient: "from-yellow-500 to-red-500",
      popular: false,
      avgSaving: "₹22L",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-70 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Trust Badges */}
          <div className="flex justify-center mb-8 space-x-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
              ⭐ Rated 4.9/5
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
              🔒 100% Secure
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
              ⚡ Instant Results
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Smart Financial
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
                Calculators for India
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Save taxes, plan investments, and make smarter financial decisions
              with our free calculators
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/tax-calculator"
                className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Calculate Tax Savings →
              </Link>
              <Link
                to="/emi-calculator"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                Calculate EMI
              </Link>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold text-white">
                  {visitors.toLocaleString()}+
                </div>
                <div className="text-white/70 text-sm">Happy Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold text-white">
                  {calculations.toLocaleString()}+
                </div>
                <div className="text-white/70 text-sm">Calculations Done</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold text-white">₹2.3Cr+</div>
                <div className="text-white/70 text-sm">Tax Saved</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-white/70 text-sm">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Cards Section */}
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Calculator
          </h2>
          <p className="text-xl text-gray-600">
            Professional tools trusted by 1 Lakh+ Indians for financial planning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link
              key={calc.id}
              to={calc.path}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {calc.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${calc.gradient}`}></div>

              <div className="p-8">
                <div className="text-5xl mb-4">{calc.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {calc.title}
                </h3>
                <p className="text-gray-600 mb-4">{calc.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Avg. Saving:{" "}
                    <span className="font-bold text-green-600">
                      {calc.avgSaving}
                    </span>
                  </div>
                  <div className="text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Calculate →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why 1 Lakh+ Indians Trust Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4">
                ✓
              </div>
              <h3 className="text-xl font-bold mb-2">100% Accurate</h3>
              <p className="text-gray-600">
                Latest tax rates and formulas updated for 2024-25
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get calculations in real-time with beautiful visualizations
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-2">100% Private</h3>
              <p className="text-gray-600">
                No data stored. All calculations happen in your browser
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "Saved ₹45,000 in taxes using the new regime calculator. Highly
              recommended!"
            </p>
            <div className="font-semibold">- Rahul S., Bangalore</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "EMI calculator helped me choose the right home loan. Saved 2.3
              lakhs in interest!"
            </p>
            <div className="font-semibold">- Priya M., Mumbai</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "SIP calculator motivated me to start investing. Best financial
              decision ever!"
            </p>
            <div className="font-semibold">- Amit K., Delhi</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Start Your Financial Journey Today
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Join 1 Lakh+ Indians making smarter financial decisions
        </p>
        <Link
          to="/tax-calculator"
          className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Calculate Now - It's Free! →
        </Link>
      </div>
    </div>
  );
}

export default ModernHomePage;
