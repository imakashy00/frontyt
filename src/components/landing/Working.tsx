import {
  BookOpen,
  CheckCircle,
  FileText,
  FolderPlus,
  MessageCircle,
  Youtube,
} from "lucide-react";

const Working = () => {
  return (
    <div className="py-16 bg-gray-50" id="working">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How YTNotes Works
          </h2>
          <p className="text-lg text-gray-600">
            Turn YouTube videos into notes in seconds
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line - left aligned on mobile, center on desktop */}
            <div className="absolute left-6 md:left-[calc(50%-1px)] top-6 h-[calc(100%-60px)] w-0.5 bg-[#5d3fd3] opacity-20 md:transform md:-translate-x-0"></div>

            <div className="space-y-12 relative">
              {/* Step 1 */}
              <div className="flex flex-row md:items-center">
                {/* Mobile layout has everything in a row */}
                <div className="block md:hidden flex-shrink-0 h-12 w-12 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 ml-0">
                  <FolderPlus className="h-6 w-6 text-white" />
                </div>

                {/* Mobile text - always right of icon */}
                <div className="block md:hidden flex-grow pl-4">
                  <h3 className="text-lg font-semibold mb-1">
                    Create a Folder
                  </h3>
                  <p className="text-sm text-gray-600">
                    Organize your learning by topics with custom folders
                  </p>
                </div>

                {/* Desktop layout with alternating sides */}
                <div className="hidden md:block md:w-1/2 md:pr-10 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">
                    Create a Folder
                  </h3>
                  <p className="text-gray-600">
                    Organize your learning by topics with custom folders
                  </p>
                </div>
                <div className="hidden md:flex md:w-16 md:h-16 bg-[#5d3fd3] rounded-full items-center justify-center z-10">
                  <FolderPlus className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-row md:items-center">
                {/* Mobile layout */}
                <div className="block md:hidden flex-shrink-0 h-12 w-12 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 ml-0">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="block md:hidden flex-grow pl-4">
                  <h3 className="text-lg font-semibold mb-1">
                    Create a New Note
                  </h3>
                  <p className="text-sm text-gray-600">
                    Start a new note for the YouTube video you want to study
                  </p>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block md:w-1/2"></div>
                <div className="hidden md:flex md:w-16 md:h-16 bg-[#5d3fd3] rounded-full items-center justify-center z-10">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2 md:pl-10 md:text-left">
                  <h3 className="text-xl font-semibold mb-2">
                    Create a New Note
                  </h3>
                  <p className="text-gray-600">
                    Start a new note for the YouTube video you want to study
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-row md:items-center">
                {/* Mobile layout */}
                <div className="block md:hidden flex-shrink-0 h-12 w-12 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 ml-0">
                  <Youtube className="h-6 w-6 text-white" />
                </div>
                <div className="block md:hidden flex-grow pl-4">
                  <h3 className="text-lg font-semibold mb-1">
                    Paste YouTube URL
                  </h3>
                  <p className="text-sm text-gray-600">
                    Simply paste YouTube video link you want notes for
                  </p>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block md:w-1/2 md:pr-10 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">
                    Paste YouTube URL
                  </h3>
                  <p className="text-gray-600">
                    Simply paste YouTube video link you want notes for
                  </p>
                </div>
                <div className="hidden md:flex md:w-16 md:h-16 bg-[#5d3fd3] rounded-full items-center justify-center z-10">
                  <Youtube className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-row md:items-center">
                {/* Mobile layout */}
                <div className="block md:hidden flex-shrink-0 h-12 w-12 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 ml-0">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="block md:hidden flex-grow pl-4">
                  <h3 className="text-lg font-semibold mb-1">
                    Notes Generated
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our AI analyzes the video and creates structured, organized
                    notes
                  </p>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block md:w-1/2"></div>
                <div className="hidden md:flex md:w-16 md:h-16 bg-[#5d3fd3] rounded-full items-center justify-center z-10">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2 md:pl-10 md:text-left">
                  <h3 className="text-xl font-semibold mb-2">
                    Notes Generated
                  </h3>
                  <p className="text-gray-600">
                    Our AI analyzes the video and creates structured, organized
                    notes
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-row md:items-center">
                {/* Mobile layout */}
                <div className="block md:hidden flex-shrink-0 h-12 w-12 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 ml-0">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="block md:hidden flex-grow pl-4">
                  <h3 className="text-lg font-semibold mb-1">Study & Edit</h3>
                  <p className="text-sm text-gray-600">
                    Review your notes, edit them, or add your own insights
                  </p>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block md:w-1/2 md:pr-10 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">Study & Edit</h3>
                  <p className="text-gray-600">
                    Review your notes, edit them, or add your own insights
                  </p>
                </div>
                <div className="hidden md:flex md:w-16 md:h-16 bg-[#5d3fd3] rounded-full items-center justify-center z-10">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              {/* Step 6 */}
              <div className="flex flex-row md:items-center">
                {/* Mobile layout */}
                <div className="block md:hidden flex-shrink-0 h-12 w-12 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 ml-0">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="block md:hidden flex-grow pl-4">
                  <h3 className="text-lg font-semibold mb-1">Ask Questions</h3>
                  <p className="text-sm text-gray-600">
                    Use our AI chatbot to get answers about any part of the
                    video
                  </p>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block md:w-1/2"></div>
                <div className="hidden md:flex md:w-16 md:h-16 bg-[#5d3fd3] rounded-full items-center justify-center z-10">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2 md:pl-10 md:text-left">
                  <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
                  <p className="text-gray-600">
                    Use our AI chatbot to get answers about any part of the
                    video
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
