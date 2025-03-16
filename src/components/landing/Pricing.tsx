"use client";
import { useEffect, useState } from "react";
import SignIn from "../SignIn";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [isIndianUser, setIsIndianUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Define prices in USD
  const monthlyPriceUSD = 19;
  const yearlyPriceUSD = 199;

  // Conversion rate (1 USD ≈ 84 INR)
  const usdToInrRate = 85;

  // Calculate prices in INR (round to nearest whole number)
  const monthlyPriceINR = Math.round(monthlyPriceUSD * usdToInrRate);
  const yearlyPriceINR = Math.round(yearlyPriceUSD * usdToInrRate);

  // Set the current pricing based on location
  const monthlyPrice = isIndianUser ? monthlyPriceINR : monthlyPriceUSD;
  const yearlyPrice = isIndianUser ? yearlyPriceINR : yearlyPriceUSD;

  // Calculate savings
  const monthlySavingsUSD = monthlyPriceUSD * 12 - yearlyPriceUSD;
  const monthlySavingsINR = monthlyPriceINR * 12 - yearlyPriceINR;
  const savings = isIndianUser ? monthlySavingsINR : monthlySavingsUSD;

  // Currency symbol
  const currencySymbol = isIndianUser ? "₹" : "$";

  // Detect user's country based on IP
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setIsIndianUser(data.country_code === "IN");
      } catch (error) {
        console.error("Error detecting user location:", error);
        // Default to USD on error
        setIsIndianUser(false);
      } finally {
        setIsLoading(false);
      }
    };

    detectUserCountry();
  }, []);

  return (
    <div className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        {/* Title section remains the same */}
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
          {/* Features List (Left Side) - unchanged */}
          <div className="p-8 md:w-1/2 bg-gray-50">
            {/* Features remain unchanged */}
            <h3 className="text-xl font-bold mb-6">Everything included</h3>
            <ul className="space-y-4">
              {/* Feature items remain unchanged */}
              {/* ... existing feature list ... */}
            </ul>
          </div>

          {/* Pricing Details (Right Side) */}
          <div className="p-8 md:w-1/2 flex flex-col">
            <h3 className="text-2xl mx-auto font-bold mb-2">Premium Plan</h3>
            <p className="text-gray-500 mx-auto mb-6">All features included</p>

            {/* Billing Toggle - unchanged */}
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

            {/* Price Display - Updated for multi-currency */}
            <div className="text-center mb-8">
              {isLoading ? (
                <div className="flex justify-center items-center h-16">
                  <div className="w-6 h-6 border-2 border-[#5d3fd3] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center text-[#5d3fd3] mb-2">
                  <span className="text-4xl font-bold">
                    {currencySymbol}
                    {isYearly ? yearlyPrice : monthlyPrice}
                  </span>
                  <span className="text-lg text-gray-500 font-normal ml-1">
                    {isYearly ? "/year" : "/month"}
                  </span>
                </div>
              )}

              {/* Savings message */}
              <div className="h-8 flex items-center justify-center">
                {isYearly && (
                  <div className="text-sm bg-[#5d3fd3]/10 text-[#5d3fd3] py-1 px-3 rounded-full inline-block">
                    Save {currencySymbol}
                    {savings} per year
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button - unchanged */}
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
