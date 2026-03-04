import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ children, className, hover = false, padding = 'md' }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-gray-200 shadow-soft',
        hover && 'transition-all duration-200 hover:shadow-lg hover:border-primary-200',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
