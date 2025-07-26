import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Zap, Target, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTryNow = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⏰</span>
              <h1 className="text-2xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                ChronoMint
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white hover:text-green-400 transition-colors">
                Home
              </a>
              <a href="#features" className="text-white hover:text-green-400 transition-colors">
                Features
              </a>
              <Button
                onClick={handleTryNow}
                className="bg-green-400 text-black font-bold hover:bg-green-300 hover:scale-105 transition-all duration-200"
              >
                Try Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a
                href="#home"
                className="block text-white hover:text-green-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="block text-white hover:text-green-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <Button
                onClick={() => {
                  handleTryNow();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-green-400 text-black font-bold hover:bg-green-300"
              >
                Try Now
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Turn Time into Power
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light mb-8 max-w-2xl mx-auto">
            Achieve your daily goals with AI-powered focus and gamified energy tracking
          </p>
          <Button
            onClick={handleTryNow}
            className="bg-green-400 text-black font-bold px-6 py-3 rounded-full hover:bg-green-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]"
            size="lg"
          >
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-800 border border-green-400 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              <div className="text-green-400 mb-4">
                <Target size={48} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Task Planner</h3>
              <p className="text-gray-300">
                Let AI create personalized task schedules based on your goals and energy levels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800 border border-green-400 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              <div className="text-green-400 mb-4">
                <Zap size={48} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Energy Bar Tracker</h3>
              <p className="text-gray-300">
                Gamify your productivity with an energy system that rewards task completion.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800 border border-green-400 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              <div className="text-green-400 mb-4">
                <Clock size={48} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pomodoro Sessions</h3>
              <p className="text-gray-300">
                Focus in 25-minute intervals with built-in breaks to maximize your productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-green-400 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enter Goals</h3>
              <p className="text-gray-300">
                Set your daily goals or let our AI create a personalized plan for you.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ChevronRight className="text-green-400" size={32} />
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-green-400 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Follow Time Blocks</h3>
              <p className="text-gray-300">
                Work through focused 25-minute sessions with guided breaks in between.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ChevronRight className="text-green-400" size={32} />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-green-400 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Gain Energy</h3>
              <p className="text-gray-300">
                Complete tasks to build your energy bar and unlock achievement rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600/20 to-yellow-500/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to recharge your day?
          </h2>
          <Button
            onClick={handleTryNow}
            className="bg-green-400 text-black font-bold px-8 py-4 rounded-full hover:bg-green-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]"
            size="lg"
          >
            Try ChronoMint
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4 border-t border-slate-700">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white">
              © 2025 ChronoMint
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-white hover:text-yellow-400 hover:underline transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-400 hover:underline transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-400 hover:underline transition-colors"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;