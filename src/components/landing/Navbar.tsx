"use client";
import Image from "next/image";
import ytnotes from "../../../public/ytnote.png";
import SignIn from "../SignIn";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full items-center sticky top-0 bg-white z-50 shadow-sm flex justify-between px-5 py-2 rounded-md">
      <span className="flex items-center gap-2">
        <Image className="w-8 h-8 rounded-sm" src={ytnotes} alt={"Ytnotes"} />
        <span className="text-2xl text-gray-800 font-sans ">YTNotes</span>
      </span>
      <ul className="flex space-x-8">
        <li>
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-700 hover:text-[#5d3fd3] transition-colors duration-300 bg-transparent border-none cursor-pointer"
          >
            Features
          </button>
        </li>

        <li>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-gray-700 hover:text-[#5d3fd3] transition-colors duration-300 bg-transparent border-none cursor-pointer"
          >
            Pricing
          </button>
        </li>
      </ul>
      <SignIn width="w-36" text="Sign/Signup" />
    </div>
  );
};

export default Navbar;
