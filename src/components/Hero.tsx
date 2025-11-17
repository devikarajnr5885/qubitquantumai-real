import React from 'react';
import { ArrowRight, Zap, Brain, Rocket, Sparkles, Star, Users, Award, TrendingUp, Clock, Target, Settings, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientButton } from './ui/gradient-button';
import { SplineScene } from './ui/spline-scene';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black pt-16">
      {/* Reduced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Reduced floating particles */}
        <div className="absolute top-32 right-32 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row h-full min-h-[80vh] xl:min-h-[85vh] 2xl:min-h-[90vh] gap-12 lg:gap-16 xl:gap-20">
          {/* Left content - Reduced font sizes */}
          <div className="flex-1 flex flex-col justify-center max-w-3xl">
            {/* Enhanced brand badge - Smaller and cleaner */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 backdrop-blur-sm mb-8 w-fit hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium text-sm">Quantum AI Revolution Starts Here</span>
              <Star className="h-4 w-4 text-purple-400 animate-pulse delay-500" />
            </div>

            {/* Main heading - Increased spacing */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your Business
                </span>
                <br />
                <div className="mt-6"></div>
                <span className="text-white">
                  Running on Autopilot
                </span>
              </h1>
            </div>

            {/* Simplified subtitle - Normal size */}
            <p className="text-gray-400 text-sm lg:text-base xl:text-lg leading-relaxed mb-6 max-w-2xl">
              We integrate AI into your business to streamline every process, eliminate manual work, and create custom solutions that fuel consistent growth
            </p>

            {/* Minimal Stats Display */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">200+</span>
                <span className="text-sm text-gray-400">Systems Built</span>
              </div>
              <div className="w-px h-4 bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">$2M+</span>
                <span className="text-sm text-gray-400">in Time Saved</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <GradientButton variant="autoflow" asChild className="px-6 py-3 text-base">
                <Link to="/build-agent" className="flex items-center space-x-2">
                  <span>Build Agent</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </GradientButton>

              <GradientButton variant="autoflow" asChild className="px-6 py-3 text-base">
                <a href="https://calendly.com/qubitquantumai/meeting" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <span>Book Strategy Call</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </GradientButton>
            </div>

            {/* Stats - Minimal */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800/30">
              {[
                { number: '∞', label: 'Quantum Processing' },
                { number: '99.9%', label: 'Accuracy' },
                { number: '24/7', label: 'Active' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - 3D Spline Scene - Controlled */}
          <div className="flex-1 relative min-h-[50vh] lg:min-h-[70vh] xl:min-h-[75vh] 2xl:min-h-[80vh]">
            {/* Container to prevent overflow and control 3D scene */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gray-900/10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/10 z-10 pointer-events-none"></div>
              
              {/* Controlled 3D Scene */}
              <div className="w-full h-full transform-gpu">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Static AI indicators - Smaller with hover effects */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-3 py-1 text-blue-400 text-xs font-medium animate-pulse hover:bg-blue-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                  Quantum AI Active
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 z-20">
                <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-3 py-1 text-purple-400 text-xs font-medium animate-pulse delay-1000 hover:bg-purple-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                  Processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator - Smaller with hover effects */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center relative overflow-hidden hover:border-blue-400 transition-colors duration-300">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-1.5 animate-pulse"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-purple-400/20 rounded-full blur-sm"></div>
        </div>
        
        <p className="text-gray-500 text-xs mt-2 font-medium hover:text-blue-400 transition-colors duration-300">Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;