import React, { useState } from 'react';
import './RegisterRefactor.css';
import AuthCard from '../../Components/AuthCard.js';
import InputField from '../../Components/InputField.js';
import Button from '../../Components/Button.js';
import axiosInstance from '../../AxiosInstance/axiosConfig.js';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 13) {
        newErrors.dateOfBirth = 'You must be at least 13 years old';
      } else if (age > 120) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Validate form
    try {
      // Format date
      const date = new Date(formData.dateOfBirth);
      const formatted = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-');

      const formattedDate = {
        ...formData,
        dateOfBirth: formatted
      };

      const response = await sendRegisterRequest(formattedDate);
      console.log('Registration attempt:', formattedDate, response);
    } catch (error) {
      // Handle API errors
      if (error.response?.data?.message) {
        setErrors(prev => ({
          ...prev,
          email: error.response.data.info
        }));
      }
    }
  };

  const userIcon = (
    <svg className="user-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
    </svg>
  );

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join us today"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <form onSubmit={handleSubmit} className="register-form" noValidate>
        <div className="form-fields">
          <div className="name-fields">
            <InputField
              id="first-name"
              name="firstName"
              type="text"
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              className="name-field"
              error={errors.firstName}
            />

            <InputField
              id="last-name"
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              className="name-field"
              error={errors.lastName}
            />
          </div>

          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            error={errors.email}
          />

          <InputField
            id="username"
            name="username"
            type="text"
            label="Username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            error={errors.username}
          />

          <InputField
            id="date-of-birth"
            name="dateOfBirth"
            type="date"
            label="Date of Birth"
            placeholder=""
            value={formData.dateOfBirth}
            onChange={handleChange}
            autoComplete="bday"
            error={errors.dateOfBirth}
          />

          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            error={errors.password}
          />

          <InputField
            id="confirm-password"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            error={errors.confirmPassword}
          />
        </div>

        <div className="submit-section">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            leftIcon={userIcon}
          >
            Create Account
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

const sendRegisterRequest = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/signup', {
      firstName: data.firstName,
      secondName: data.lastName,
      email: data.email,
      DOB: data.dateOfBirth,
      password: data.password,
      role: "user",
      userName: data.username
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export default Register;