import BeeMascot from "./components/BeeMascot";
import Benefits from "./components/Benefits";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-md border-b border-campusYellow/30 flex items-center justify-between px-6 py-4 shadow-sm animate-slide-down">
        <div className="flex items-center gap-3">
          <div className="bg-campusYellow/20 p-2 rounded-full animate-float">
            <BeeMascot className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-campusBlue">BorrowBuzz</span>
            <span className="text-xs text-campusBlue/70">for Michigan students 🏛️</span>
          </div>
        </div>
        <Link 
          href="/auth/signin" 
          className="bg-campusYellow/90 text-campusBlue font-semibold px-6 py-2 rounded-full hover:bg-campusYellow hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Sign In with .edu
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-campusYellow/20 px-4 py-2 rounded-full text-campusBlue font-medium mb-6 hover:bg-campusYellow/30 transition-all duration-300">
            <span className="animate-bounce-gentle">🎓</span>
            <span>Made with love for Wolverines</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-campusBlue mb-6 leading-tight animate-slide-up">
            Borrow, share & connect<br />
            <span className="text-campusNavy bg-gradient-to-r from-campusNavy to-campusBlue bg-clip-text text-transparent">
              safely within the Wolverine community
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
            Need a bike for the weekend? A calculator for your exam? Your fellow Wolverines in Ann Arbor have got you covered. 
            <span className="text-campusBlue font-medium"> Save money, make friends, help each other out.</span>
          </p>

          <div className="bg-white/80 border-2 border-campusYellow/30 rounded-2xl p-6 mb-8 max-w-2xl mx-auto hover:shadow-lg hover:border-campusYellow/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl animate-pulse-soft">🔒</span>
              <span className="font-bold text-campusBlue">Safe & Verified Community</span>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-campusNavy">UMich students only!</span> Sign in with your @umich.edu email to access our trusted campus marketplace. 
              No strangers, no scams - just Wolverines helping Wolverines.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl mx-auto mb-8">
            <form className="flex gap-2 bg-white/60 p-2 rounded-2xl border-2 border-dashed border-campusYellow/40 relative hover:border-campusYellow/60 transition-all duration-300 group">
              <input
                type="text"
                placeholder="Sign in first to search for 'bike', 'textbooks', 'mini fridge'..."
                className="flex-1 px-6 py-3 rounded-xl border-0 focus:outline-none text-gray-500 placeholder-gray-400 bg-transparent"
                disabled
              />
              <Link 
                href="/auth/signin"
                className="px-6 py-3 rounded-xl bg-campusBlue text-white font-semibold hover:bg-campusNavy hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Sign In to Search 🔍
              </Link>
              <div className="absolute -top-3 left-4 bg-campusYellow px-2 py-1 rounded text-xs font-medium text-campusBlue animate-wiggle">
                @umich.edu required
              </div>
            </form>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1 hover:scale-105 transition-transform duration-200">
              <span>🎓</span>
              <span>UMich verified only</span>
            </span>
            <span className="flex items-center gap-1 hover:scale-105 transition-transform duration-200">
              <span>🛡️</span>
              <span>Safe & trusted campus community</span>
            </span>
            <span className="flex items-center gap-1 hover:scale-105 transition-transform duration-200">
              <span>💛💙</span>
              <span>Go Blue!</span>
            </span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-campusBlue mb-3">Why Wolverines trust BorrowBuzz</h2>
            <p className="text-gray-600 text-lg">More than just a marketplace—it's a verified campus community</p>
          </div>
          <Benefits />
          
          {/* Safety Features */}
          <div className="mt-12 bg-gradient-to-r from-campusBlue/5 to-campusYellow/5 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold text-campusBlue mb-6 text-center">🏛️ Built for Michigan Students</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 bg-campusYellow/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-campusYellow/30 transition-all duration-300">
                  <span className="text-2xl">🎓</span>
                </div>
                <h4 className="font-semibold text-campusNavy mb-2">@umich.edu Verified</h4>
                <p className="text-sm text-gray-600">Only verified University of Michigan students can join. Your .edu email is your key to safety.</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-campusYellow/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-campusYellow/30 transition-all duration-300">
                  <span className="text-2xl">🏠</span>
                </div>
                <h4 className="font-semibold text-campusNavy mb-2">Campus-Local</h4>
                <p className="text-sm text-gray-600">Meet on campus, in dorms, or nearby. No long drives or sketchy meetups.</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-campusYellow/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-campusYellow/30 transition-all duration-300">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="font-semibold text-campusNavy mb-2">Wolverine Trust</h4>
                <p className="text-sm text-gray-600">We're all part of the same community. Help a fellow student out!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-campusYellow/20 to-amber-100/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-campusBlue mb-4">
            Ready to join the buzz? 🐝
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Join hundreds of verified Michigan students who are already saving money and making connections through BorrowBuzz.
          </p>
          <div className="bg-white/80 rounded-xl p-6 mb-8 border border-campusYellow/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="font-bold text-campusNavy mb-3">🎓 Getting Started is Easy:</h3>
            <ol className="text-left max-w-md mx-auto space-y-2 text-sm text-gray-600">
              <li className="hover:text-campusBlue transition-colors duration-200"><span className="font-semibold text-campusBlue">1.</span> Sign in with your @umich.edu email</li>
              <li className="hover:text-campusBlue transition-colors duration-200"><span className="font-semibold text-campusBlue">2.</span> Browse items from fellow Wolverines</li>
              <li className="hover:text-campusBlue transition-colors duration-200"><span className="font-semibold text-campusBlue">3.</span> List your own items to help others</li>
              <li className="hover:text-campusBlue transition-colors duration-200"><span className="font-semibold text-campusBlue">4.</span> Meet safely on campus & build community!</li>
            </ol>
          </div>
          <Link 
            href="/auth/signin"
            className="inline-flex items-center gap-2 bg-campusBlue text-white font-semibold px-8 py-4 rounded-2xl hover:bg-campusNavy hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
          >
            <span>Sign In with @umich.edu</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
          <p className="text-xs text-gray-500 mt-3">
            Only University of Michigan students • Safe & verified community
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-600 bg-white/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 group">
            <BeeMascot className="w-6 h-6 group-hover:animate-bounce-gentle" />
            <span className="font-bold text-campusBlue">BorrowBuzz</span>
          </div>
          <p className="text-sm mb-2">Made with 💛💙 for the University of Michigan community</p>
          <p className="text-xs text-gray-500 mb-1">
            A safe, verified marketplace for Wolverines by Wolverines
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BorrowBuzz • Go Blue! 〽️
          </p>
        </div>
      </footer>
    </div>
  );
}
