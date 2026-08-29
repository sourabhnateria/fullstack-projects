import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServicesGrid from "@/components/ServicesGrid";
import PromiseOfPurity from "@/components/PromiseOfPurity";
import ProcessSteps from "@/components/ProcessSteps";
import LocalPlanning from "@/components/LocalPlanning";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ServicesGrid />
        <PromiseOfPurity />
        <ProcessSteps />
        <LocalPlanning />
        <Gallery />
        <Testimonials />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
