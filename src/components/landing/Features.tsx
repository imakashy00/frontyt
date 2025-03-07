import {
  BrainCircuit,
  Clock,
  Edit,
  FolderTree,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const Features = () => {
  return (
    <div className="py-10 bg-white" id="features">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Ytnotes?
          </h2>
          <p className="text-lg text-gray-600">
            AI-powered YTNotes transforms how you learn from YouTube
            videos, helping you save time and retain more information.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#5d3fd3] bg-opacity-10 rounded-full flex items-center justify-center mb-5">
              <Clock className="h-6 w-6 text-[#5d3fd3]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Save Hours of Time</h3>
            <p className="text-gray-600">
              Stop taking notes from videos manually. YTNotes creates
              comprehensive notes in seconds, letting you focus on learning, not
              note-taking.
            </p>
          </div>

          {/* Feature 2 */}

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#5d3fd3] bg-opacity-10 rounded-full flex items-center justify-center mb-5">
              <FolderTree className="h-6 w-6 text-[#5d3fd3]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Stay Organized</h3>
            <p className="text-gray-600">
              Keep all your video notes neatly organized in folders. Create your
              personal knowledge library that grows as you learn.
            </p>
          </div>

          {/* Feature 3 */}

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#5d3fd3] bg-opacity-10 rounded-full flex items-center justify-center mb-5">
              <MessageSquare className="h-6 w-6 text-[#5d3fd3]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Video Chatbot</h3>
            <p className="text-gray-600">
              Ask questions about the video and get instant answers from our AI
              chatbot. Clear your doubts without rewatching content.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#5d3fd3] bg-opacity-10 rounded-full flex items-center justify-center mb-5">
              <Edit className="h-6 w-6 text-[#5d3fd3]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Edit Anytime</h3>
            <p className="text-gray-600">
              YTNotes&apos;s rich text editor lets you customize and enhance your notes.
              Add your own insights or reorganize content however you prefer.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#5d3fd3] bg-opacity-10 rounded-full flex items-center justify-center mb-5">
              <BrainCircuit className="h-6 w-6 text-[#5d3fd3]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
            <p className="text-gray-600">
              Our advanced AI doesn&apos;t just transcribe—it structures
              information into organized, easy-to-understand notes with key
              concepts highlighted.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#5d3fd3] bg-opacity-10 rounded-full flex items-center justify-center mb-5">
              <Sparkles className="h-6 w-6 text-[#5d3fd3]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Better Learning Retention
            </h3>
            <p className="text-gray-600">
              Research shows structured notes improve information retention by
              up to 40%. Learn more effectively with our organized note format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
