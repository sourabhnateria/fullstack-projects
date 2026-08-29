import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import EMICalculator from "./components/calculators/EMICalculator";
import GSTCalculator from "./components/calculators/GSTCalculator";
import SIPCalculator from "./components/calculators/SIPCalculator";
import TaxCalculator from "./components/calculators/TaxCalculator";
import FDCalculator from "./components/calculators/FDCalculator";
import PPFCalculator from "./components/calculators/PPFCalculator";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import Terms from "./components/pages/Terms";
import Navbar from "./components/layout/PremiumNavbar";
import Footer from "./components/layout/Footer";
import {
  TopBannerAd,
  LeftSidebarAd,
  RightSidebarAd,
  MobileFloatingAd,
  InContentAd,
} from "./components/ads/AdComponents";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        {/* Top Banner Ad */}
        {/* <TopBannerAd /> */}

        {/* Left Sidebar Ad - Shows only on desktop */}
        <LeftSidebarAd />

        {/* Right Sidebar Ad - Shows only on desktop */}
        <RightSidebarAd />

        <main
          className="main-content"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/gst-calculator" element={<GSTCalculator />} />
            <Route path="/sip-calculator" element={<SIPCalculator />} />
            <Route path="/tax-calculator" element={<TaxCalculator />} />
            <Route path="/fd-calculator" element={<FDCalculator />} />
            <Route path="/ppf-calculator" element={<PPFCalculator />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>

          {/* In-Content Ad after main content */}
          <InContentAd />
        </main>

        {/* Bottom Banner Ad */}
        <TopBannerAd />

        {/* Mobile Floating Ad - Shows only on mobile */}
        <MobileFloatingAd />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
