import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary/20">
      {/* Ambient background glow for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-[0.03] bg-primary rounded-[100%] blur-[100px] pointer-events-none"></div>

      <Navbar />
      
      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};