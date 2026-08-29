import { useEffect } from "react";

// Top Banner Ad (728x90 or responsive)
export const TopBannerAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "20px auto",
        padding: "0 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#f3f4f6",
          border: "2px dashed #d1d5db",
          borderRadius: "12px",
          padding: "20px",
          minHeight: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Replace with actual AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        ></ins>
        <span style={{ color: "#6b7280", fontSize: "14px" }}>
          Advertisement - Header Banner (728x90)
        </span>
      </div>
    </div>
  );
};

// Left Sidebar Ad (160x600 Skyscraper)
export const LeftSidebarAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "160px",
        zIndex: 100,
        display: window.innerWidth > 1400 ? "block" : "none",
      }}
    >
      <div
        style={{
          background: "#f3f4f6",
          border: "2px dashed #d1d5db",
          borderRadius: "12px",
          padding: "10px",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Replace with actual AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="vertical"
        ></ins>
        <span
          style={{
            color: "#6b7280",
            fontSize: "12px",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          Advertisement
        </span>
      </div>
    </div>
  );
};

// Right Sidebar Ad (160x600 Skyscraper)
export const RightSidebarAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "160px",
        zIndex: 100,
        display: window.innerWidth > 1400 ? "block" : "none",
      }}
    >
      <div
        style={{
          background: "#f3f4f6",
          border: "2px dashed #d1d5db",
          borderRadius: "12px",
          padding: "10px",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Replace with actual AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="vertical"
        ></ins>
        <span
          style={{
            color: "#6b7280",
            fontSize: "12px",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          Advertisement
        </span>
      </div>
    </div>
  );
};

// In-Content Ad (336x280 Rectangle)
export const InContentAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      style={{
        margin: "30px auto",
        maxWidth: "336px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#f3f4f6",
          border: "2px dashed #d1d5db",
          borderRadius: "12px",
          padding: "20px",
          minHeight: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Replace with actual AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="rectangle"
        ></ins>
        <span style={{ color: "#6b7280", fontSize: "14px" }}>
          Advertisement (336x280)
        </span>
      </div>
    </div>
  );
};

// Floating Bottom Ad for Mobile (320x50)
export const MobileFloatingAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        padding: "5px",
        zIndex: 1000,
        display: window.innerWidth <= 768 ? "block" : "none",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#f3f4f6",
          border: "1px dashed #d1d5db",
          borderRadius: "8px",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Replace with actual AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="mobile-banner"
        ></ins>
        <span style={{ color: "#6b7280", fontSize: "12px" }}>Ad (320x50)</span>
      </div>
      <button
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          fontSize: "10px",
          cursor: "pointer",
        }}
        onClick={(e) => (e.currentTarget.parentElement.style.display = "none")}
      >
        ✕
      </button>
    </div>
  );
};

// Smart Ad Wrapper - Shows different ads based on screen size
export const SmartAd = ({ type = "auto" }) => {
  const isMobile = window.innerWidth <= 768;
  const isDesktop = window.innerWidth > 1400;

  if (type === "sidebar" && !isDesktop) return null;
  if (type === "mobile" && !isMobile) return null;

  return (
    <>
      {type === "auto" && isMobile && <MobileFloatingAd />}
      {type === "auto" && !isMobile && <InContentAd />}
      {type === "sidebar-left" && <LeftSidebarAd />}
      {type === "sidebar-right" && <RightSidebarAd />}
      {type === "content" && <InContentAd />}
      {type === "banner" && <TopBannerAd />}
    </>
  );
};

// Ad Layout Wrapper for Pages
export const AdLayout = ({ children }) => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Left Sidebar Ad - Only on large screens */}
      <LeftSidebarAd />

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {children}
      </div>

      {/* Right Sidebar Ad - Only on large screens */}
      <RightSidebarAd />

      {/* Mobile Floating Ad */}
      <MobileFloatingAd />
    </div>
  );
};
