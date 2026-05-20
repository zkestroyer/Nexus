// src/features/videocall/VideoCallRoom.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, MonitorUp, PhoneOff, User, Settings } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function VideoCallRoom() {
  const [isJoined, setIsJoined] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Handle connecting to the local webcam
  useEffect(() => {
    if (isJoined && isVideoOn) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => console.error("Camera access denied or unavailable:", err));
    } else {
      // Cleanup tracks if video is turned off or call ended
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isJoined, isVideoOn]);

  const handleEndCall = () => {
    setIsJoined(false);
    setIsAudioOn(true);
    setIsVideoOn(true);
  };

  if (!isJoined) {
    return (
      <Card className="max-w-md mx-auto mt-10 p-8 text-center bg-background border-border shadow-lg rounded-xl">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <VideoIcon size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Nexus Deal Room</h2>
        <p className="text-foreground/70 mb-8">Join the secure WebRTC chamber to pitch your startup.</p>
        <Button 
          size="lg" 
          className="w-full text-lg h-14"
          onClick={() => setIsJoined(true)}
        >
          Join Video Call
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 animate-fade-in relative">
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent">
        <Badge variant="success" className="animate-pulse bg-green-500/20 text-green-400 border-green-500/50">
          ● Secure Connection
        </Badge>
        <span className="text-white/80 text-sm font-medium">04:23</span>
      </div>

      {/* Video Grid */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 h-full pt-16 pb-24 relative">
        
        {/* Remote User (Mocked) */}
        <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <User size={48} className="text-gray-600" />
          </div>
          <p className="text-gray-400 font-medium">Investor is connecting...</p>
          <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-md">
            <span className="text-white text-sm">Investor (Remote)</span>
          </div>
        </div>

        {/* Local User (Actual Webcam if permitted) */}
        <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          {isVideoOn ? (
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover transform scale-x-[-1]" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-primary font-bold">You</span>
              </div>
              <p className="text-gray-400">Camera is off</p>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-md flex items-center gap-2">
            <span className="text-white text-sm">You</span>
            {!isAudioOn && <MicOff size={14} className="text-red-400" />}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-0 w-full p-6 bg-gray-950/90 backdrop-blur-xl border-t border-gray-800 flex justify-center items-center gap-4">
        <button 
          onClick={() => setIsAudioOn(!isAudioOn)}
          className={`p-4 rounded-full transition-all ${isAudioOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
        >
          {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
        
        <button 
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`p-4 rounded-full transition-all ${isVideoOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
        >
          {isVideoOn ? <VideoIcon size={24} /> : <VideoOff size={24} />}
        </button>
        
        <button 
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`p-4 rounded-full transition-all hidden md:block ${isScreenSharing ? 'bg-primary text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
        >
          <MonitorUp size={24} />
        </button>
        
        <button 
          onClick={handleEndCall}
          className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)] ml-4"
        >
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
}