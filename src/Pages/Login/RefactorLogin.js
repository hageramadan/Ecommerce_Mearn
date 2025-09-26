import React, { useState } from 'react';
import './RefactorLogin.css';
import AuthCard from '../../Components/AuthCard.js';
import InputField from '../../Components/InputField.js';
import Button from '../../Components/Button.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  const lockIcon = (
    <svg className="lock-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fillRule="evenodd"></path>
    </svg>
  );

  const forgotPasswordLink = (
    <a href="#" className="forgot-link">
      Forgot password?
    </a>
  );

  return (
    <AuthCard
      title="Sign In"
      subtitle="Access your account"
      footerText="Don't have an account?"
      footerLink="#"
      footerLinkText="Sign up now"
    >
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-fields">
          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Email or Username"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            rightElement={forgotPasswordLink}
          />
        </div>

        <div className="submit-section">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            leftIcon={lockIcon}
          >
            Log in
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default Login;