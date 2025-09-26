import React from 'react';
import './AuthCard.css';

const AuthCard = ({ 
  title, 
  subtitle, 
  children, 
  footerText, 
  footerLink, 
  footerLinkText,
  onFooterLinkClick
}) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </div>
        
        <div className="auth-content">
          {children}
        </div>
        
        {(footerText || footerLink) && (
          <div className="auth-footer">
            <p className="auth-footer-text">
              {footerText}{' '}
              {footerLink && (
                <a 
                  href={footerLink} 
                  className="auth-footer-link"
                  onClick={onFooterLinkClick}
                >
                  {footerLinkText}
                </a>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCard;