"use client";
import SignIn from "../SignIn";
import { Button } from "../ui/button";
import VisualDemo from "./VisualDemo";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center py-20 md:px-5 px-4 gap-8">
      <div className="flex flex-col max-w-2xl">
        <span className="text-sm font-semibold tracking-wider text-[#5d3fd3] mb-2">
          Your note-taking assistant ✍️
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Get Structured Note from YouTube Url
        </h1>
        <p className="md:text-xl text-gray-600 mb-10 md:w-2/3   ">
          Save hours with AI-powered 🤖 note-taking that automatically generates
          structured notes 📋, organizes them in folders 📁, and lets you edit
          anytime ✍️
        </p>
        <div className="flex flex-row  gap-4">
          <div className="flex flex-col">
            <SignIn text=" Start 15 days Free Trial" />
            <p className="text-xs text-gray-500 mt-1 text-center">
              No credit card required
            </p>
          </div>
          <Button
            variant="outline"
            className="border-[#5d3fd3] text-[#5d3fd3] hover:bg-[#5d3fd318] px-4 py-5"
            onClick={() => scrollToSection("working")}
          >
            See How It Works
          </Button>
        </div>
      </div>

      <div className="w-auto">
        <VisualDemo />
      </div>
    </div>
  );
};

export default Hero;
