import React from 'react';
import './Checkbox.css';

const Checkbox = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  description
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleContainerClick = (e) => {
    // Prevent double firing when clicking the actual input
    if (e.target.type === 'checkbox') {
      return;
    }
    
    // Create a synthetic event for the checkbox
    const checkbox = document.getElementById(id);
    if (checkbox && !disabled) {
      checkbox.click();
    }
  };

  return (
    <div 
      className={`checkbox-container ${className} ${disabled ? 'disabled' : ''}`}
      onClick={handleContainerClick}
    >
      <div className="checkbox-wrapper">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="checkbox-input"
        />
        <div className="checkbox-custom">
          {checked && (
            <svg 
              className="checkbox-icon" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="checkbox-content">
        <label htmlFor={id} className="checkbox-label">
          {label}
        </label>
        {description && (
          <p className="checkbox-description">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;