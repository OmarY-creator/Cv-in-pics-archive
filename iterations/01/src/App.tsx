import React, { useState } from 'react';
import { PortfolioLayout } from './components/PortfolioLayout';
import { PortfolioHome } from './components/PortfolioHome';
import { About } from './components/About';
import { AboutOption1 } from './components/AboutOption1';
import { AboutOption2 } from './components/AboutOption2';
import { SkillsAtlas } from './components/SkillsAtlas';
import { AITeacherApp } from './components/AITeacherApp';
import { Gallery } from './components/Gallery';
import { Timeline } from './components/Timeline';

type View = 'about' | 'works' | 'gallery' | 'skills-atlas' | 'ai-teacher' | 'timeline';

// TOGGLE THIS TO TEST DIFFERENT ABOUT PAGE OPTIONS:
// 'original' = current split-face design
// 'option1' = simple floating cutout with drop shadow
// 'option2' = 3D layered effect with tilt
const ABOUT_VERSION: 'original' | 'option1' | 'option2' = 'option1';

function App() {
  const [currentView, setCurrentView] = useState<View>('about');

  // If viewing the AI Teacher App, we render it full screen (it has its own layout)
  if (currentView === 'ai-teacher') {
    return <AITeacherApp onExit={() => setCurrentView('works')} />;
  }

  // Render the selected About component
  const renderAbout = () => {
    switch (ABOUT_VERSION) {
      case 'option1': return <AboutOption1 />;
      case 'option2': return <AboutOption2 />;
      default: return <About />;
    }
  };

  // Otherwise, render the Portfolio Layout
  return (
    <PortfolioLayout onNavigate={(page) => setCurrentView(page as View)} currentPage={currentView}>
      {currentView === 'about' && renderAbout()}
      {currentView === 'works' && <PortfolioHome onNavigate={(page) => setCurrentView(page as View)} />}
      {currentView === 'gallery' && <Gallery />}
      {currentView === 'skills-atlas' && <SkillsAtlas />}
      {currentView === 'timeline' && <Timeline />}
    </PortfolioLayout>
  );
}

export default App;
