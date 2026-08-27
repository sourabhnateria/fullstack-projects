import { Cormorant } from "next/font/google";
import { AuthProvider } from "../lib/auth-context";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

export const metadata = {
  title: "Five Roam Coffee | Single Origin Arabica",
  description:
    "Every Origin Has a Story. Single-origin Arabica, roasted fresh.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          {modal}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
