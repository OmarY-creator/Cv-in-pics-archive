import React, { useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';

interface PortfolioLayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ children, onNavigate, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-brand-black font-sans selection:bg-brand-black selection:text-white flex flex-col">
      {/* Global Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            onClick={() => handleNav('about')}
            className="text-xl font-bold tracking-tighter cursor-pointer hover:opacity-70 transition-opacity"
          >
            OMAR YUSSUF
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => handleNav('about')}
              className={`hover:text-brand-blue transition-colors ${currentPage === 'about' ? 'text-brand-black font-bold' : 'text-gray-500'}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNav('works')}
              className={`hover:text-brand-blue transition-colors ${['works', 'skills-atlas', 'ai-teacher'].includes(currentPage) ? 'text-brand-black font-bold' : 'text-gray-500'}`}
            >
              Works
            </button>
            <button 
              onClick={() => handleNav('gallery')}
              className={`hover:text-brand-blue transition-colors ${currentPage === 'gallery' ? 'text-brand-black font-bold' : 'text-gray-500'}`}
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNav('timeline')}
              className={`hover:text-brand-blue transition-colors ${currentPage === 'timeline' ? 'text-brand-black font-bold' : 'text-gray-500'}`}
            >
              Timeline
            </button>
            <button 
              className="px-5 py-2 bg-brand-black text-white rounded-full hover:bg-gray-800 transition-colors"
              onClick={() => window.location.href = 'mailto:omar.yussuf1996@gmail.com'}
            >
              Get in touch
            </button>
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden text-brand-black z-50 relative">
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-fade-in top-0 left-0 w-screen h-screen">
             <button 
              onClick={() => handleNav('about')}
              className="text-2xl font-bold text-brand-black"
            >
              About
            </button>
            <button 
              onClick={() => handleNav('works')}
              className="text-2xl font-bold text-brand-black"
            >
              Works
            </button>
            <button 
              onClick={() => handleNav('gallery')}
              className="text-2xl font-bold text-brand-black"
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNav('timeline')}
              className="text-2xl font-bold text-brand-black"
            >
              Timeline
            </button>
            <button 
              className="px-8 py-3 bg-brand-black text-white rounded-full text-lg"
              onClick={() => window.location.href = 'mailto:omar.yussuf1996@gmail.com'}
            >
              Get in touch
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Omar Yussuf. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/omar-yussuf-b99040185/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-black transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:omar.yussuf1996@gmail.com" className="text-gray-400 hover:text-brand-black transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};