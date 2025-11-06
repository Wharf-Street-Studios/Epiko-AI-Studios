import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, onClick, className = '', hover = false }) => {
  const baseStyles = 'bg-white border-2 border-gray-300 rounded-xl p-4 transition-all duration-200';
  const hoverStyles = hover ? 'hover:border-gray-900 hover:shadow-md cursor-pointer active:scale-95' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
