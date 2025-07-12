import BeeMascot from "./components/BeeMascot";
import Benefits from "./components/Benefits";
import SampleListings from "./components/SampleListings";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Cozy Header */}
      <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-md border-b border-campusYellow/30 flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-campusYellow/20 p-2 rounded-full">
            <BeeMascot className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-campusBlue">BorrowBuzz</span>
            <span className="text-xs text-campusBlue/70">for Michigan students 🏛️</span>
          </div>
        </div>
        <Link href="/auth/signin" className="bg-campusYellow/90 text-campusBlue font-semibold px-6 py-2 rounded-full hover:bg-campusYellow transition-all shadow-sm">
          Sign In
        </Link>
      </header>

      {/* Cozy Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-campusYellow/20 px-4 py-2 rounded-full text-campusBlue font-medium mb-6">
            <span>🎓</span>
            <span>Made with love for Wolverines</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-campusBlue mb-6 leading-tight">
            Borrow, share & connect<br />
            <span className="text-campusNavy">right here on campus</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Need a bike for the weekend? A calculator for your exam? Your fellow Wolverines have got you covered. 
            <span className="text-campusBlue font-medium"> Save money, make friends, help each other out.</span>
          </p>
          
          {/* Cozy Search Bar */}
          <div className="w-full max-w-2xl mx-auto mb-8">
            <form className="flex gap-2 bg-white p-2 rounded-2xl shadow-lg border border-campusYellow/20">
              <input
                type="text"
                placeholder="What do you need? Try 'bike', 'textbooks', 'mini fridge'..."
                className="flex-1 px-6 py-3 rounded-xl border-0 focus:outline-none text-gray-700 placeholder-gray-400"
                disabled
              />
              <button
                type="button"
                className="px-6 py-3 rounded-xl bg-campusBlue text-white font-semibold hover:bg-campusNavy transition-all shadow-sm"
                disabled
              >
                Search 🔍
              </button>
            </form>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span>✅</span>
              <span>UMich students only</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🤝</span>
              <span>Safe & trusted</span>
            </span>
            <span className="flex items-center gap-1">
              <span>💛</span>
              <span>Go Blue!</span>
            </span>
          </div>
        </div>
      </section>

      {/* Cozy Listings Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-campusBlue mb-3">What your neighbors are sharing</h2>
            <p className="text-gray-600 text-lg">Real items from real Wolverines, right here in Ann Arbor</p>
          </div>
          <SampleListings />
        </div>
      </section>

      {/* Cozy Benefits Section */}
      <section className="py-16 px-4 bg-white/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-campusBlue mb-3">Why Wolverines love BorrowBuzz</h2>
            <p className="text-gray-600 text-lg">More than just a marketplace—it's community</p>
          </div>
          <Benefits />
        </div>
      </section>

      {/* Cozy CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-campusYellow/20 to-amber-100/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-campusBlue mb-4">Ready to join the buzz? 🐝</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join hundreds of Michigan students who are already saving money and making connections through BorrowBuzz.
          </p>
          <Link 
            href="/auth/signin"
            className="inline-flex items-center gap-2 bg-campusBlue text-white font-semibold px-8 py-4 rounded-2xl hover:bg-campusNavy transition-all shadow-lg text-lg"
          >
            <span>Get Started</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Cozy Footer */}
      <footer className="w-full py-8 text-center text-gray-600 bg-white/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BeeMascot className="w-6 h-6" />
            <span className="font-bold text-campusBlue">BorrowBuzz</span>
          </div>
          <p className="text-sm mb-2">Made with 💛💙 for the University of Michigan community</p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BorrowBuzz • Go Blue! 〽️
          </p>
        </div>
      </footer>
    </div>
  );
}
