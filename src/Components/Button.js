import React from 'react';
import './Button.css';

const Button = ({
  type = 'button',
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  leftIcon,
  rightIcon,
  fullWidth = false
}) => {
  const buttonClass = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${fullWidth ? 'btn-full-width' : ''} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {leftIcon && (
        <span className="btn-icon btn-icon-left">
          {leftIcon}
        </span>
      )}
      <span className="btn-text">{children}</span>
      {rightIcon && (
        <span className="btn-icon btn-icon-right">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;