import React, { useState } from 'react';
import { X, Calendar, MapPin, Briefcase } from 'lucide-react';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  location: string;
  company: string;
  description: string;
  image: string;
  category: 'work' | 'milestone' | 'personal';
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: '1',
    year: '2024',
    title: 'Experiential Learning Session',
    location: 'London',
    company: 'KPMG UK',
    description: 'Facilitating an experiential learning workshop - because adults don\'t learn from slides. This session combined mindfulness techniques with practical skills development.',
    image: '/timeline/session-experiential.jpg',
    category: 'work'
  },
  {
    id: '2',
    year: '2024',
    title: 'Training Room in Action',
    location: 'Canary Wharf',
    company: 'KPMG UK',
    description: 'A snapshot of networking during one of the regional activation days. Building connections across the firm while rolling out Spark AI training.',
    image: '/timeline/session-networking.jpg',
    category: 'work'
  },
  {
    id: '3',
    year: '2024',
    title: 'Values Day Celebration',
    location: 'Canary Wharf',
    company: 'KPMG UK',
    description: 'L&D isn\'t just training - it\'s culture. Helping organise firm-wide Values Day, complete with branded cupcakes.',
    image: '/timeline/values-day.jpg',
    category: 'milestone'
  },
  {
    id: '4',
    year: '2024',
    title: 'Executive Dinner at 14',
    location: 'London',
    company: 'KPMG UK',
    description: 'Invited to the partner dining room at 14 restaurant. Being in the room where decisions happen.',
    image: '/timeline/dinner-14.jpg',
    category: 'milestone'
  },
  {
    id: '5',
    year: '2023',
    title: 'KPMG UK Headquarters',
    location: 'Canary Wharf',
    company: 'KPMG UK',
    description: 'The lobby of 15 Canada Square - home base for the past two years. Where strategy meets execution.',
    image: '/timeline/kpmg-lobby.jpg',
    category: 'work'
  },
  {
    id: '6',
    year: '2023',
    title: 'Work Hard, Explore Harder',
    location: 'Amsterdam',
    company: 'Personal',
    description: 'Taking a moment to breathe between projects. Exploring Amsterdam\'s maritime history - a reminder that the best ideas often come when you step away.',
    image: '/timeline/amsterdam.jpg',
    category: 'personal'
  }
];

export const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-brand-blue';
      case 'milestone': return 'bg-brand-orange';
      case 'personal': return 'bg-brand-green';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'work': return 'Delivery';
      case 'milestone': return 'Milestone';
      case 'personal': return 'Life';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Journey</h1>
          <div className="w-20 h-1 bg-brand-black mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Snapshots from workshops, milestones, and moments that shaped my approach to L&D.
          </p>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Milestone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-green"></div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Life</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => (
              <div 
                key={item.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-gray-300 transform -translate-x-1/2 z-10 group-hover:border-brand-blue transition-colors"></div>
                
                {/* Year Badge (desktop) */}
                <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 -top-8`}>
                  <span className="text-xs font-bold text-gray-400 bg-white px-2">{item.year}</span>
                </div>

                {/* Content Card */}
                <div 
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div 
                    onClick={() => setSelectedItem(item)}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-gray-200"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-gray-100 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop';
                        }}
                      />
                      {/* Category Badge */}
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider ${getCategoryColor(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </div>
                      {/* Year Badge (mobile) */}
                      <div className="md:hidden absolute top-3 left-3 px-2 py-1 rounded-full bg-black/70 text-white text-xs font-bold">
                        {item.year}
                      </div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-brand-black mb-1 group-hover:text-brand-blue transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={12} />
                          {item.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-24"></div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="aspect-video bg-gray-100 relative">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop';
                }}
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Close image preview"
              >
                <X size={20} />
              </button>
              <div className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-white text-sm font-bold uppercase tracking-wider ${getCategoryColor(selectedItem.category)}`}>
                {getCategoryLabel(selectedItem.category)}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar size={14} />
                  {selectedItem.year}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={14} />
                  {selectedItem.location}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Briefcase size={14} />
                  {selectedItem.company}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-brand-black mb-4">{selectedItem.title}</h2>
              <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
