// 'use client'
import { Instagram, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ytnotes from "../../../public/ytnote.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // const scrollToSection = (sectionId: string) => {
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Image
                src={ytnotes}
                alt="YTNotes Logo"
                width={28}
                height={28}
                className="rounded-sm"
              />
              <span className="text-xl font-bold text-gray-800">YTNotes</span>
            </Link>
            <p className="text-gray-600 mb-5">
              YouTube videos to smart notes in seconds.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/imakashy00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#5d3fd3]"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com/imakashy00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#5d3fd3]"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:yakashadav26@gmail.com"
                className="text-gray-500 hover:text-[#5d3fd3]"
              >
                <Mail size={20} />
                <span className="sr-only">Email us</span>
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-[#5d3fd3]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-[#5d3fd3]"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#5d3fd3]">
                  Guides
                </Link>
              </li>

              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 hover:text-[#5d3fd3]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-[#5d3fd3]"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-[#5d3fd3]"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>

            {/* Newsletter Signup */}
            {/* <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Stay Updated
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-auto rounded-l-md border border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5d3fd3]"
                />
                <button className="flex-none bg-[#5d3fd3] text-white rounded-r-md px-3.5 py-1.5 hover:bg-[#5d3fd3e0]">
                  <Mail size={18} />
                  <span className="sr-only">Subscribe</span>
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} YTNotes. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">Made with ❤️ by Akash Yadav</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
