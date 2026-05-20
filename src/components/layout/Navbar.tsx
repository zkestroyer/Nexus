import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, User, LogOut, Building2, CircleDollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const dashboardRoute = user?.role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor';
  const profileRoute = user ? `/profile/${user.role}/${user.id}` : '/login';
  
  const navLinks = [
    { icon: user?.role === 'entrepreneur' ? <Building2 size={18} /> : <CircleDollarSign size={18} />, text: 'Dashboard', path: dashboardRoute },
    { icon: <MessageCircle size={18} />, text: 'Messages', path: user ? '/messages' : '/login' },
    { icon: <Bell size={18} />, text: 'Notifications', path: user ? '/notifications' : '/login' },
    { icon: <User size={18} />, text: 'Profile', path: profileRoute }
  ];
  
  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all duration-300">
      {/* Premium Glassmorphism Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-foreground">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">Business Nexus</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:ml-6">
            {user ? (
              <div className="flex items-center space-x-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary/50 rounded-lg transition-all duration-200"
                  >
                    <span className="mr-2 opacity-80">{link.icon}</span>
                    {link.text}
                  </Link>
                ))}
                
                <div className="h-6 w-px bg-border mx-2"></div> {/* Divider */}
                
                <Link to={profileRoute} className="flex items-center space-x-2 ml-2 hover:bg-secondary/50 p-1.5 rounded-lg transition-colors">
                  <Avatar src={user.avatarUrl} alt={user.name} size="sm" status={user.isOnline ? 'online' : 'offline'} />
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </Link>

                <Button variant="ghost" onClick={handleLogout} className="ml-2 text-foreground/60 hover:text-red-500 hover:bg-red-500/10 px-3">
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login"><Button variant="outline" className="border-border hover:bg-secondary">Log in</Button></Link>
                <Link to="/register"><Button className="shadow-md shadow-primary/20">Sign up</Button></Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-secondary focus:outline-none transition-colors">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {user ? (
              <>
                <div className="flex items-center space-x-3 py-4 border-b border-border/50">
                  <Avatar src={user.avatarUrl} alt={user.name} size="md" status={user.isOnline ? 'online' : 'offline'} />
                  <div>
                    <p className="text-base font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-primary font-medium capitalize">{user.role}</p>
                  </div>
                </div>
                <div className="pt-2">
                  {navLinks.map((link, index) => (
                    <Link key={index} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-lg">
                      <span className="mr-3 text-primary/70">{link.icon}</span> {link.text}
                    </Link>
                  ))}
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex w-full items-center px-3 py-3 mt-2 text-base font-medium text-red-500 hover:bg-red-500/10 rounded-lg">
                    <LogOut size={18} className="mr-3" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" fullWidth>Log in</Button></Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}><Button fullWidth>Sign up</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};