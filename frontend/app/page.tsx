import Features from "../components/Features";
import Workflow from "../components/Workflow";

export default function Home() {
  return (
    <>

      {/* HERO SECTION */}

      <section className="min-h-[90vh] flex items-center">

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-block px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-sm text-violet-300 mb-8">

              AI Powered Story Visualization

            </div>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight">

              Turn Storybooks Into

              <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">

                Cinematic Worlds

              </span>

            </h1>

            <p className="mt-8 text-gray-400 text-lg max-w-xl">

              Upload PDF, DOCX or EPUB stories and let StoryVerse automatically extract events, maintain characters and generate cinematic visual storyboards.

            </p>

            <div className="flex gap-5 mt-10">

              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition">

                Generate Story

              </button>

              <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

                Watch Demo

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

              <div className="space-y-6">

                <div className="bg-violet-500/10 border border-violet-500/20 p-5 rounded-2xl">

                  📄 Story PDF Uploaded

                </div>

                <div className="text-center text-2xl">

                  ↓

                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-2xl">

                  🧠 AI Scene Extraction

                </div>

                <div className="text-center text-2xl">

                  ↓

                </div>

                <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-2xl">

                  🎨 Visual Generation

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <Features />

      {/* WORKFLOW */}

      <Workflow />

    </>
  );
}