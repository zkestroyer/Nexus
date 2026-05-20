import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Building2, CircleDollarSign, Users, MessageCircle, Bell, FileText, Settings, HelpCircle, Sparkles } from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center py-2.5 px-4 rounded-xl transition-all duration-200 group relative overflow-hidden ${
          isActive 
            ? 'bg-primary/10 text-primary font-semibold' 
            : 'text-foreground/70 hover:bg-secondary/80 hover:text-foreground font-medium'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active indicator bar */}
          {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
          <span className={`mr-3 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
            {icon}
          </span>
          <span className="text-sm">{text}</span>
        </>
      )}
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;
  
  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home size={18} />, text: 'Dashboard' },
    { to: '/profile/entrepreneur/' + user.id, icon: <Building2 size={18} />, text: 'My Startup' },
    { to: '/investors', icon: <CircleDollarSign size={18} />, text: 'Find Investors' },
    { to: '/messages', icon: <MessageCircle size={18} />, text: 'Messages' },
    { to: '/notifications', icon: <Bell size={18} />, text: 'Notifications' },
    { to: '/documents', icon: <FileText size={18} />, text: 'Documents' },
  ];
  
  const investorItems = [
    { to: '/dashboard/investor', icon: <Home size={18} />, text: 'Dashboard' },
    { to: '/profile/investor/' + user.id, icon: <CircleDollarSign size={18} />, text: 'My Portfolio' },
    { to: '/entrepreneurs', icon: <Users size={18} />, text: 'Find Startups' },
    { to: '/messages', icon: <MessageCircle size={18} />, text: 'Messages' },
    { to: '/notifications', icon: <Bell size={18} />, text: 'Notifications' },
    { to: '/deals', icon: <FileText size={18} />, text: 'Deals' },
  ];
  
  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;
  
  const commonItems = [
    { to: '/settings', icon: <Settings size={18} />, text: 'Settings' },
    { to: '/help', icon: <HelpCircle size={18} />, text: 'Help & Support' },
  ];
  
  return (
    <div className="w-64 bg-background border-r border-border hidden md:block flex-shrink-0 z-10">
      <div className="h-full flex flex-col">
        <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          <div className="px-4 space-y-1.5">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} to={item.to} icon={item.icon} text={item.text} />
            ))}
          </div>
          
          <div className="mt-8 px-4">
            <h3 className="px-4 text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">
              System
            </h3>
            <div className="space-y-1.5">
              {commonItems.map((item, index) => (
                <SidebarItem key={index} to={item.to} icon={item.icon} text={item.text} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Premium Support Callout Card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-secondary/80 to-secondary/30 border border-border/50 rounded-2xl p-4 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={64} className="text-primary" />
            </div>
            <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-1">Nexus Plus</p>
            <h4 className="text-sm font-bold text-foreground mt-1">Need assistance?</h4>
            <p className="text-xs text-foreground/60 mt-1 mb-3">Our deal experts are online.</p>
            <a href="mailto:support@businessnexus.com" className="inline-flex w-full justify-center items-center px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};