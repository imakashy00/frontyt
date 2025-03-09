import Faq from "./landing/Faq";
import Features from "./landing/Features";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import Navbar from "./landing/Navbar";
import Pricing from "./landing/Pricing";
import Working from "./landing/Working";

const Landing = () => {
  return (
    <div className="md:p-5 h-auto sm:space-y-10 w-full flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Working />
      <Faq/>
      <Pricing />
      <Footer />
    </div>
  );
};

export default Landing;
