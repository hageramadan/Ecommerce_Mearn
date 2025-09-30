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

  const handleChange =  (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle registration logic here
    const date = new Date(formData.dateOfBirth);
    const formated = date.toLocaleDateString('en-US',
      {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-');

      const formattedDate = 
      {
        ...formData,
        dateOfBirth: formated
      }

     const response =  await sendRegisterRequest(formattedDate);
    console.log('Registration attempt:', formattedDate,response);
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
      <form onSubmit={handleSubmit} className="register-form">
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
              required
              autoComplete="given-name"
              className="name-field"
            />

            <InputField
              id="last-name"
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete="family-name"
              className="name-field"
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
            required
            autoComplete="email"
          />


          <InputField
            id="username"
            name="username"
            type="text"
            label="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <InputField
            id="date-of-birth"
            name="dateOfBirth"
            type="date"
            label="Date of Birth"
            placeholder=""
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            autoComplete="bday"
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
            autoComplete="new-password"
          />

          <InputField
            id="confirm-password"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
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
      firstName : data.firstName,
      secondName : data.lastName,
      email : data.email,
      DOB : data.dateOfBirth,
      password : data.password,
      role : "user",
      userName : data.username
    });
  console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export default Register;