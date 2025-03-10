"use client";
import { Check } from "lucide-react";
import SignIn from "../SignIn";
// import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect user's country
    const detectUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.country === "IN") {
          setCurrency("INR");
        }
      } catch (error) {
        console.error("Error detecting country:", error);
      }
    };

    detectUserCountry();
  }, []);
  // Fetch exchange rates when component mounts or currency changes
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === "USD") {
        setExchangeRate(1);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Using ExchangeRate-API (free tier)
        const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
        const data = await response.json();

        if (data && data.rates && data.rates.INR) {
          setExchangeRate(data.rates.INR);
        } else {
          // Fallback rate if API fails
          setExchangeRate(83.5);
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        // Fallback rate if API fails
        setExchangeRate(83.5);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [currency]);

  // Helper function to format prices
  const formatPrice = (usdPrice: number) => {
    if (currency === "INR" && exchangeRate) {
      const inrPrice = Math.round(usdPrice * exchangeRate * 100) / 100;
      return {
        mainPrice: `₹${Math.floor(inrPrice)}`,
        fraction:
          inrPrice % 1 !== 0
            ? `.${String(Math.round((inrPrice % 1) * 100)).padStart(2, "0")}`
            : ".00",
        suffix: "/mo",
      };
    }

    // Default USD format
    return {
      mainPrice: `$${Math.floor(usdPrice)}`,
      fraction:
        usdPrice % 1 !== 0
          ? `.${String(Math.round((usdPrice % 1) * 100)).padStart(2, "0")}`
          : ".00",
      suffix: "/mo",
    };
  };

  // Calculate prices
  const monthlyPrice = 19;
  const yearlyPrice = 16.5;
  const currentPrice = isYearly ? yearlyPrice : monthlyPrice;
  const savings = Math.round(monthlyPrice * 12 - yearlyPrice * 12);

  // Get formatted prices
  const formattedPrice = formatPrice(currentPrice);
  const formattedSavings =
    currency === "INR" && exchangeRate
      ? `₹${Math.round(savings * exchangeRate)}`
      : `$${savings}`;

  return (
    <div className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple Pricing
          </h2>
          <p className="text-lg text-gray-600">
            One plan with everything you need to boost your learning from
            YouTube videos
          </p>
        </div>

        {/* Horizontal Pricing Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 flex flex-col md:flex-row">
          {/* Features List (Left Side) */}
          <div className="p-8 md:w-1/2 bg-gray-50">
            <h3 className="text-xl font-bold mb-6">Everything included</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#5d3fd3]" />
                </div>
                <span className="text-gray-700">
                  Unlimited AI-generated notes
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#5d3fd3]" />
                </div>
                <span className="text-gray-700">Folder organization</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#5d3fd3]" />
                </div>
                <span className="text-gray-700">
                  Rich-text editor for customization
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#5d3fd3]" />
                </div>
                <span className="text-gray-700">
                  AI chatbot for video questions
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#5d3fd3]" />
                </div>
                <span className="text-gray-700">Priority customer support</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#5d3fd3]" />
                </div>
                <span className="text-gray-700">Export notes as PDF</span>
              </li>
            </ul>
          </div>

          {/* Pricing Details (Right Side) */}
          <div className="p-8 md:w-1/2 flex flex-col">
            <h3 className="text-2xl mx-auto font-bold mb-2">Premium Plan</h3>
            <p className="text-gray-500 mx-auto mb-6">All features included</p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-8">
              <span
                className={`mr-3 ${
                  !isYearly ? " text-[#5d3fd3]" : "text-gray-500"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly((prev) => !prev)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#5d3fd3]/80"
              >
                <span className="sr-only">Toggle billing period</span>
                <span
                  className={`${
                    isYearly
                      ? "translate-x-6 bg-[#5d3fd3]"
                      : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
              <span
                className={`ml-3 ${
                  isYearly ? " text-[#5d3fd3]" : "text-gray-500"
                }`}
              >
                Yearly
              </span>
            </div>

            {/* Price Display */}
            <div className="text-center mb-8">
              {isLoading ? (
                <div className="flex items-center justify-center h-16">
                  <div className="w-8 h-8 border-4 border-[#5d3fd3]/30 border-t-[#5d3fd3] rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center text-[#5d3fd3] mb-2">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold">
                        {formattedPrice.mainPrice}
                      </span>
                      <span className="text-2xl font-bold mb-1">
                        {formattedPrice.fraction}
                      </span>
                    </div>
                    <span className="text-lg text-gray-500 font-normal ml-1">
                      {formattedPrice.suffix}
                    </span>
                  </div>
                  {/* Always reserve space for the savings message */}
                  <div className="h-8 flex items-center justify-center">
                    {isYearly && (
                      <div className="text-sm bg-[#5d3fd3]/10 text-[#5d3fd3] py-1 px-3 rounded-full inline-block">
                        Save {formattedSavings} per year
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* CTA Button */}
            <div className="text-center mx-auto">
              <SignIn width="w-full" text="Get Started for free" />
            </div>
            <p className="text-xs text-gray-500 mt-3 mx-auto">
              Start 15 day trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
