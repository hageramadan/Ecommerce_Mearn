import React, { useEffect, useState } from 'react';
import './RefactorLogin.css';
import AuthCard from '../../Components/AuthCard.js';
import InputField from '../../Components/InputField.js';
import Button from '../../Components/Button.js';
import Checkbox from '../../Components/checkBox.js';
import { useNavigate } from 'react-router-dom';
import { sendLoginRequest } from '../../api/auth/api.auth.js';
import Alert from '@mui/material/Alert';





const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isAdmin: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, seterrorMessage] = useState('');
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }

    if (!validateForm()) {
      return;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email or username is required';
    } else if (formData.email.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    setIsLoading(true)
    try {
      await sendLoginRequest({ emailOrUsername: formData.email, password: formData.password });
      setIsLoading(false)
      navigate("/");
    } catch (error) {
      seterrorMessage(error.response.data.info)
      console.log(error, `error message : ${error.response.data.info}`);
      setIsLoading(false)
    }
  };

  const lockIcon = (
    <svg className="lock-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fillRule="evenodd"></path>
    </svg>
  );

  const adminCheck = formData.isAdmin;

  useEffect(() => {
    console.log({ adminCheck });
    if (adminCheck) {
      localStorage.setItem("Bearer", "admin");
    } else {
      localStorage.setItem("Bearer", "Bearer");
    }
  }, [adminCheck]);

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <AuthCard
        title="Sign In"
        subtitle="Access your account"
        footerText="Don't have an account?"
        footerLink="/register"
        footerLinkText="Sign up now"
      >
        {errorMessage && (
          <Alert severity="error" style={{ marginBottom: '1rem' }}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-fields">
            <InputField
              id="email-address"
              name="email"
              type="email"
              label="Email or Username"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              error={errors.email}
            />

            <InputField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              error={errors.password}
            />

            <Checkbox
              id="admin-login"
              name="isAdmin"
              label="Log as admin"
              checked={formData.isAdmin}
              onChange={handleChange}
              description="Check this box to access admin features"
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
    </>
  );
};

export default Login;