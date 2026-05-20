import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'error';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles: Added active:scale-[0.98] for a premium "click" feel
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background active:scale-[0.98]';
  
  // Size styles: slightly refined padding for a modern look
  const sizeStyles = {
    xs: 'text-xs px-2.5 py-1.5',
    sm: 'text-sm px-3.5 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
    xl: 'text-lg px-8 py-4',
  };
  
  // Variant styles updated to use global CSS variables instead of hardcoded grays/blues
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25 focus:ring-primary',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-md hover:shadow-accent/25 focus:ring-accent',
    outline: 'border-2 border-border bg-transparent text-foreground hover:border-primary/50 hover:bg-secondary/50 focus:ring-primary',
    ghost: 'bg-transparent hover:bg-secondary/80 text-foreground focus:ring-secondary',
    link: 'bg-transparent text-primary hover:text-primary/80 hover:underline focus:ring-primary p-0 active:scale-100',
    // Fallbacks for standard utility colors if needed
    success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md hover:shadow-green-500/25 focus:ring-green-500',
    warning: 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-md hover:shadow-amber-500/25 focus:ring-amber-500',
    error: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md hover:shadow-red-500/25 focus:ring-red-500',
  };
  
  const loadingClass = isLoading ? 'opacity-70 cursor-not-allowed active:scale-100' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthClass} ${loadingClass} ${disabledClass} ${className}`;
  
  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span className="mr-2.5 opacity-80">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2.5 opacity-80">{rightIcon}</span>}
    </button>
  );
};