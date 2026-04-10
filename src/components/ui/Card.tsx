import React from 'react';
import { cn } from '@/utils/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  padding = 'md',
  children,
  ...props
}) => {
  const baseClasses = 'rounded-xl border';
  
  const variants = {
    default: 'bg-gray-800/50 border-gray-700',
    glass: 'bg-black/20 backdrop-blur-lg border-white/10',
    gradient: 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700'
  };
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={cn(baseClasses, variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={cn('text-xl font-semibold text-white mb-2', className)} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('text-gray-300', className)} {...props}>
    {children}
  </div>
);

export default Card;
