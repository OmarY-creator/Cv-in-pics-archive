import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface VideoHeroProps {
  moduleId: number;
  title: string;
  subtitle: string;
  description: string;
  imageKeyword?: string; // For Unsplash placeholder variability
}

export const VideoHero: React.FC<VideoHeroProps> = ({ 
  moduleId, 
  title, 
  subtitle, 
  description,
  imageKeyword = 'technology'
}) => {
  const [scrollScale, setScrollScale] = useState(1);
  const [videoOpacity, setVideoOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Scale down slightly as user scrolls (Zoom Out effect)
      // From 1.0 down to 0.95 over 400px
      const newScale = Math.max(0.95, 1 - (scrollY / 4000));
      setScrollScale(newScale);

      // Fade out slightly
      const newOpacity = Math.max(0.5, 1 - (scrollY / 800));
      setVideoOpacity(newOpacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight specific words in title for effect
  const renderTitle = () => {
    // Simple logic to highlight the middle/key part of titles based on standard module naming
    const words = title.split(' ');
    if (words.length > 2) {
       return (
         <>
           {words.slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">{words[words.length - 1]}</span>
         </>
       );
    }
    return title;
  };

  return (
    <div className="relative w-full h-[85vh] bg-brand-black overflow-hidden flex items-center justify-center">
      {/* Background Layer (Simulating Video) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-100 ease-linear origin-center"
        style={{ 
          transform: `scale(${scrollScale})`,
          opacity: videoOpacity,
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&bg=${imageKeyword}")` 
        }}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 text-center text-white p-6 max-w-4xl mx-auto mt-20 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
          <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
          Module 0{moduleId} • Introduction
        </div>
        
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
          {renderTitle()}
        </h2>
        
        <h3 className="text-xl md:text-2xl text-white font-medium mb-4">{subtitle}</h3>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light opacity-90">
          {description}
        </p>
        
        <button className="group relative inline-flex items-center gap-4 px-8 py-5 bg-white text-brand-black rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          <div className="w-10 h-10 bg-brand-black text-white rounded-full flex items-center justify-center group-hover:bg-brand-blue transition-colors">
             <Play size={16} fill="currentColor" className="ml-1" />
          </div>
          <span className="text-lg tracking-tight">Watch Intro Video</span>
        </button>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
};