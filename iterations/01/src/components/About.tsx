import React from 'react';
import { Mail, Linkedin, ArrowRight, Brain, Code, Users } from 'lucide-react';

const USER_IMAGE_URL = "Omar.jpg";

const TRADITIONAL_SKILLS = [
  { text: "L&D Strategy", className: "top-[10%] left-[30%] text-2xl font-bold text-gray-300" },
  { text: "Instructional Design", className: "top-[5%] left-[50%] -translate-x-1/2 text-3xl font-extrabold text-gray-200" },
  { text: "Andragogy", className: "bottom-[10%] left-[30%] text-xl font-bold text-gray-400" },
  { text: "Cognitive Science", className: "bottom-[20%] left-[20%] text-lg font-bold text-gray-300" },
  { text: "Human-Centric Design", className: "top-[30%] left-[15%] text-xl font-bold text-gray-800/40" },
  { text: "Bloom's Taxonomy", className: "top-[8%] left-[15%] text-sm font-bold text-gray-300" },
  { text: "Stakeholder Management", className: "bottom-[8%] right-[20%] text-xs font-bold text-gray-400" }, // Moved to traditional side, adjusted position
  { text: "Performance Management", className: "top-[35%] right-[5%] text-lg font-bold text-gray-400" }, // Adjusted position
  { text: "Leadership Development", className: "bottom-[30%] left-[5%] text-xl font-bold text-gray-500" }, // Adjusted position
  { text: "KPMG", className: "top-[60%] left-[15%] text-3xl font-extrabold text-brand-blue" }, // Retained bottom-left
];

const TECH_SKILLS = [
  { text: "Systems Thinking", className: "top-[25%] right-[15%] text-xl font-bold text-gray-400" },
  { text: "Data Architecture", className: "top-[10%] right-[30%] text-2xl font-bold text-gray-400" }, // Adjusted position
  { text: "AI Skills Harmonisation", className: "top-[40%] right-[10%] text-lg font-bold text-gray-400" }, // Adjusted position
  { text: "Vector Embeddings", className: "bottom-[25%] right-[15%] text-sm font-bold text-gray-400" }, // Adjusted position
  { text: "Workforce Intelligence", className: "bottom-[15%] right-[25%] text-xl font-bold text-gray-400" }, // Adjusted position
  { text: "Python (scripting)", className: "top-[20%] left-[5%] text-xl font-bold text-gray-400" }, // Adjusted position
  { text: "React Prototyping", className: "top-[50%] right-[5%] text-4xl font-extrabold text-gray-200" }, // Adjusted position
  { text: "Checkout.com", className: "top-[15%] right-[35%] text-2xl font-bold text-brand-blue" }, // New top-right position
];

export const About: React.FC = () => {
  const codeOverlay = `
    const Vision = () => {
      const [future, setFuture] = useState(null);
      useEffect(() => {
        architect(0x84, 0x22);
      }, []);
      return <Reality />;
    }
  `.repeat(15);

  return (
    <div className="w-full overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-12 md:pt-0">
        
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center h-[500px] md:h-[700px] mb-12">
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block select-none">
            {TRADITIONAL_SKILLS.map((word, i) => (
              <div 
                key={i} 
                className={`absolute ${word.className} z-0 transform hover:scale-110 transition-transform duration-700 cursor-default whitespace-nowrap`}
              >
                {word.text}
              </div>
            ))}
            {TECH_SKILLS.map((word, i) => (
              <div 
                key={i} 
                className={`absolute ${word.className} z-0 transform hover:scale-110 transition-transform duration-700 cursor-default whitespace-nowrap`}
              >
                {word.text}
              </div>
            ))}
          </div>
          
          <div className="md:hidden absolute top-0 text-center z-10 w-full px-4 mt-12">
             <h1 className="text-5xl font-bold tracking-tighter text-brand-black mb-2">Human</h1>
             <h1 className="text-5xl font-bold tracking-tighter text-gray-300">&lt;Coder&gt;</h1>
          </div>

          <div className="relative z-10 w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.35)] bg-white transition-transform duration-500 hover:scale-[1.02] ring-8 ring-white/50 ring-offset-0">
             <div className="relative w-full h-full overflow-hidden rounded-full">
                
                <img 
                  src={USER_IMAGE_URL}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden border-l border-white/30 backdrop-blur-[1px]">
                  <div className="absolute top-0 right-0 w-[200%] h-full">
                    <img 
                      src={USER_IMAGE_URL} 
                      alt="Profile Logic" 
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
                    />
                    {/* Code Texture Overlay */}
                    <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 opacity-40 mix-blend-color-dodge overflow-hidden">
                      <pre className="text-[10px] text-white font-mono leading-3 p-2 break-all whitespace-pre-wrap select-none opacity-50">
                        {codeOverlay}
                      </pre>
                    </div>
                  </div>
                </div>

             </div>
             
             {/* 3D Floating Elements (Glows behind the circle) */}
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gray-50 -z-10 rounded-full blur-3xl opacity-60"></div>
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 -z-10 rounded-full blur-3xl opacity-60"></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Learning Professional.<br/>
              <span className="text-gray-400">Systems Builder.</span>
          </h2>
          
          <div className="prose prose-lg text-gray-600 space-y-6 leading-relaxed mb-12">
            <p>
              I empower organisations to transform skills into strategic advantage. I specialise in developing
              human-centric learning ecosystems that integrate advanced data analytics and AI to drive
              capability development and workforce planning.
            </p>
            <p>
              Currently at <strong>KPMG UK</strong>, I lead large-scale learning initiatives, design ESG pathways, and build innovative learning solutions. Previously at <strong>Checkout.com</strong>, I spearheaded capability framework standardisation and implemented robust LMS infrastructures, significantly enhancing talent mobility and learning engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-blue/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-lg flex items-center justify-center mb-4">
                <Users size={20} />
              </div>
              <h3 className="text-brand-black mb-2">L&D Strategy & Design</h3>
              <p className="text-sm text-gray-600">6+ years designing advanced curricula (Andragogy, Bloom, Kolb) for global organisations.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
               <div className="absolute top-0 right-0 w-20 h-20 bg-gray-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
               <div className="w-10 h-10 bg-gray-500/10 text-gray-500 rounded-lg flex items-center justify-center mb-4">
                <Brain size={20} />
              </div>
              <h3 className="text-brand-black mb-2">Workforce Intelligence</h3>
              <p className="text-sm text-gray-600">Translating complex capabilities into data-driven workforce planning frameworks and skills taxonomies.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
               <div className="absolute top-0 right-0 w-20 h-20 bg-brand-blue/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
               <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-lg flex items-center justify-center mb-4">
                <Code size={20} />
              </div>
              <h3 className="text-brand-black mb-2">Technical Prototyping</h3>
              <p className="text-sm text-gray-600">Rapidly prototyping web solutions (React, Python) and integrating LLM APIs to create impactful learning tools.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://www.linkedin.com/in/omar-yussuf-b99040185/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-[#0077B5] text-white rounded-full font-bold hover:bg-[#006396] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Linkedin size={20} />
              <span>Connect on LinkedIn</span>
            </a>
            <a 
              href="mailto:omar.yussuf1996@gmail.com"
              className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-brand-black rounded-full font-bold hover:bg-gray-50 transition-all hover:shadow-md"
            >
              <Mail size={20} />
              <span>Send Email</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};