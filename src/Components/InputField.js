import React from 'react';
import './InputField.css';

const InputField = ({
    id,
    name,
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    required = false,
    autoComplete,
    rightElement,
    className = '',
    error = ''
}) => {
    return (
        <div className={`field-group ${className}`}>
            <div className="field-header">
                <label htmlFor={id} className="field-label">
                    {label}
                </label>
                {rightElement && (
                    <div className="field-right-element">
                        {rightElement}
                    </div>
                )}
            </div>
            <div className="field-input-wrapper">
                <input
                    id={id}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    className={`field-input ${error ? 'field-input-error' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
            {error && (
                <p className="field-error-message">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;