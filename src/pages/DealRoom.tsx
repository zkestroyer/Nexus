import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoCallRoom from '../features/videocall/VideoCallRoom';
import DocumentChamber from '../features/documents/DocumentChamber';

export const DealRoom: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="w-full max-w-7xl flex h-16 items-center justify-between mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-secondary rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                Nexus Deal Room <ShieldCheck size={18} className="text-green-500" />
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace - Using Flexbox instead of Grid for a guaranteed layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Video Call (Forces 66% width on large screens) */}
        <div className="w-full lg:w-2/3 flex flex-col min-h-[500px]"> 
          <VideoCallRoom />
        </div>

        {/* Right Side: Documents (Forces 33% width on large screens) */}
        <div className="w-full lg:w-1/3 flex flex-col border-border lg:border-l lg:pl-6 min-h-[500px]">
           <DocumentChamber /> 
        </div> 
        
      </main>
    </div>
  );
};