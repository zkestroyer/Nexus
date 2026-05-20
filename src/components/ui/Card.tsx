import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  // Premium hover effects: lifts up slightly, border glows with primary color, and shadow deepens
  const hoverableClass = hoverable 
    ? 'transform hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer' 
    : '';
  const clickableClass = onClick ? 'cursor-pointer active:scale-[0.99] transition-transform' : '';
  
  return (
    <div 
      className={`bg-background border border-border rounded-xl shadow-sm overflow-hidden text-foreground ${hoverableClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-6 py-5 border-b border-border/50 bg-secondary/20 ${className}`}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-6 py-5 ${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-6 py-4 border-t border-border/50 bg-secondary/10 ${className}`}>
      {children}
    </div>
  );
};