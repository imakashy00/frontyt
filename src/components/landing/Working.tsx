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
            How Ytnotes Works
          </h2>
          <p className="text-lg text-gray-600">
            Turn YouTube videos into notes in seconds
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[calc(50%-1px)] h-[calc(100%-120px)] w-0.5 bg-[#5d3fd3] opacity-20"></div>

            <div className="space-y-12 relative">
              <div className="md:flex items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">
                    Create a Folder
                  </h3>
                  <p className="text-gray-600">
                    Organize your learning by topics with custom folders
                  </p>
                </div>
                <div className="mx-auto md:mx-0 w-16 h-16 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 relative">
                  <FolderPlus className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              <div className="md:flex items-center">
                <div className="hidden md:block md:w-1/2"></div>
                <div className="mx-auto md:mx-0 w-16 h-16 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 relative">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div className="md:w-1/2 mb-6 md:mb-0 md:pl-10">
                  <h3 className="text-xl font-semibold mb-2">
                    Create a New Note
                  </h3>
                  <p className="text-gray-600">
                    Start a new note for the YouTube video you want to study
                  </p>
                </div>
              </div>

              <div className="md:flex items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">
                    Paste YouTube URL
                  </h3>
                  <p className="text-gray-600">
                    Simply paste YouTube video link you want notes for
                  </p>
                </div>
                <div className="mx-auto md:mx-0 w-16 h-16 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 relative">
                  <Youtube className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              <div className="md:flex items-center">
                <div className="hidden md:block md:w-1/2"></div>
                <div className="mx-auto md:mx-0 w-16 h-16 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 relative">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="md:w-1/2 mb-6 md:mb-0 md:pl-10">
                  <h3 className="text-xl font-semibold mb-2">
                    Notes Generated
                  </h3>
                  <p className="text-gray-600">
                    Our AI analyzes the video and creates structured, organized
                    notes
                  </p>
                </div>
              </div>

              <div className="md:flex items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">Study & Edit</h3>
                  <p className="text-gray-600">
                    Review your notes, edit them, or add your own insights
                  </p>
                </div>
                <div className="mx-auto md:mx-0 w-16 h-16 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 relative">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              <div className="md:flex items-center">
                <div className="hidden md:block md:w-1/2"></div>
                <div className="mx-auto md:mx-0 w-16 h-16 bg-[#5d3fd3] rounded-full flex items-center justify-center z-10 relative">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div className="md:w-1/2 md:pl-10">
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
