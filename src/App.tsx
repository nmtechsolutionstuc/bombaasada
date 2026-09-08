import Craft from "./components/Craft";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import OrderGuide from "./components/OrderGuide";
import Reviews from "./components/Reviews";
import TrustBar from "./components/TrustBar";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cheddar focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:text-char"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBar />
        <Menu />
        <Craft />
        <Reviews />
        <OrderGuide />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
