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
    <div className="w-full items-center sticky top-0 bg-white z-50 shadow-sm flex justify-between md:px-5 py-2 rounded-md">
      <span className="flex items-center gap-2">
        <Image className="md:w-8 md:h-8 w-6 h-6 rounded-sm" src={ytnotes} alt={"Ytnotes"} />
        <span className="md:text-2xl text-gray-800 font-sans ">YTNotes</span>
      </span>
      <ul className="flex md:space-x-8 space-x-4">
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
      <SignIn width="md:w-36 w-24 " text="SignIn" image = {true} />
    </div>
  );
};

export default Navbar;
