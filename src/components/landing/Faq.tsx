"use client";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

// Define prop types for FaqCategory
interface FaqCategoryProps {
  title: string;
  children: ReactNode;
}

// Define prop types for FaqItem
interface FaqItemProps {
  question: string;
  answer: string | ReactNode;
}

const Faq = () => {
  return (
    <div className="py-16 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about YTNotes
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FaqCategory title="About YTNotes">
            <FaqItem
              question="What is YTNotes?"
              answer="YTNotes is an AI-powered tool that automatically converts YouTube videos into structured, well-organized notes. It helps students, researchers, and professionals save time and extract key information from educational content."
            />
            <FaqItem
              question="How does YTNotes work?"
              answer="Simply paste a YouTube URL into our platform, and our AI analyzes the video content to generate comprehensive notes. The notes are structured in a digestible format with headings, bullet points, and highlighted key concepts."
            />
            <FaqItem
              question="What types of videos work best with YTNotes?"
              answer="YTNotes works best with educational content, lectures, tutorials, and informational videos. While it can process any YouTube video, content with clear speech and structured information yields the best results."
            />
          </FaqCategory>

          <FaqCategory title="Features & Usage">
            <FaqItem
              question="Can I edit the notes after they're generated?"
              answer="Yes! All generated notes are fully editable. You can add your own comments, highlight important sections, remove content, or reorganize the structure as needed."
            />
            <FaqItem
              question="Can I organize my notes into folders?"
              answer="Absolutely. YTNotes allows you to create custom folders to organize your notes by subject, course, or any system that works for you. This helps keep your learning materials structured and easy to find."
            />
            <FaqItem
              question="Is there a limit to how many notes I can create?"
              answer="Premium subscribers can create unlimited notes. Our system is designed to handle as many notes as you need for your learning or research purposes."
            />
          </FaqCategory>
          <FaqCategory title="Other">
            <FaqItem
              question="Is there a free trial?"
              answer="Yes, we offer a 15-day free trial with full access to all features. No credit card is required to start your trial."
            />
            <FaqItem
              question="Is there a mobile app?"
              answer="Currently, YTNotes is available as a responsive web application that works well on mobile browsers. A dedicated mobile app is on our roadmap for future development."
            />
            <FaqItem
              question="How can I get help if I have a problem?"
              answer="If you encounter any issues or have questions, please contact our support team at yakashadav26@gmail.com. We typically respond within 24 hours on business days."
            />
          </FaqCategory>
        </div>
      </div>
    </div>
  );
};

// FAQ Category Component with children
const FaqCategory = ({ title, children }: FaqCategoryProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

// FAQ Item Component with accordion functionality
const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#5d3fd3]/20 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#5d3fd3]/50 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-[#5d3fd3]/20">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Faq;
