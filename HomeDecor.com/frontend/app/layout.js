import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "HomeDecor",
  description: "HomeDecor.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <link rel="stylesheet" href="/style/theme.css" />
        {children}
        <Script
          src="https://kit.fontawesome.com/d68d319f71.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
