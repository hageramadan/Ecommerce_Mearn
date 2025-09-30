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
    className = ''
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
                    required={required}
                    className="field-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default InputField;