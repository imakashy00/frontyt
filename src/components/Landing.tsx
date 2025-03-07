import Features from "./landing/Features";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import Navbar from "./landing/Navbar";
import Pricing from "./landing/Pricing";
import Working from "./landing/Working";

const Landing = () => {
  return (
    <div className="p-5 h-auto space-y-10 w-full flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Working />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Landing;
