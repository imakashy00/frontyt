"use client";
import { Check } from "lucide-react";
import SignIn from "../SignIn";
// import { Button } from "../ui/button";
import { useState } from "react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

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
              <div className="flex items-center justify-center text-[#5d3fd3] mb-2">
                <div className="flex items-end">
                  <span className="text-4xl font-bold">
                    {isYearly ? "$16" : "$19"}
                  </span>
                  <span className="text-2xl font-bold mb-1">
                    {isYearly ? ".50" : ".00"}
                  </span>
                </div>
                <span className="text-lg text-gray-500 font-normal ml-1">
                  /mo
                </span>
              </div>
              {/* Always reserve space for the savings message */}
              <div className="h-8 flex items-center justify-center">
                {isYearly && (
                  <div className="text-sm bg-[#5d3fd3]/10 text-[#5d3fd3] py-1 px-3 rounded-full inline-block">
                    Save $29 per year
                  </div>
                )}
              </div>
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
