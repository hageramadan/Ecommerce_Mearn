import React, { useState } from 'react';
import './RegisterRefactor.css';
import AuthCard from '../../Components/AuthCard.js';
import InputField from '../../Components/InputField.js';
import Button from '../../Components/Button.js';
import { sendRegisterRequest } from '../../api/auth/api.auth.js';
import Alert from '@mui/material/Alert';
import Spinner from '../../Components/spinner.js';
import SuccessPopup from '../../Components/successPopup.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const navigate = useNavigate();
  const content = useSelector((state) => state.langReducer.content);

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

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

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
      newErrors.firstName = content.firstNameRequired;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = content.firstNameMinLength;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = content.lastNameRequired;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = content.lastNameMinLength;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = content.emailRequiredReg;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = content.invalidEmail;
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = content.usernameRequired;
    } else if (formData.username.trim().length < 3) {
      newErrors.username = content.usernameMinLength;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = content.usernameInvalid;
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = content.dobRequired;
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 13) {
        newErrors.dateOfBirth = content.dobMinAge;
      } else if (age > 120) {
        newErrors.dateOfBirth = content.dobInvalid;
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = content.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = content.passwordMinLengthReg;
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = content.passwordLowercase;
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = content.passwordUppercase;
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = content.passwordNumber;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = content.confirmPasswordRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = content.passwordsNotMatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

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

    setIsLoading(true);
    try {
      const response = await sendRegisterRequest(formattedDate);
      setIsLoading(false);
      seterrorMessage('');
      setShowSuccessPopup(true);
      console.log('Registration attempt:', formattedDate, response);
    } catch (error) {
      seterrorMessage(error.response.data.info);
      setIsLoading(false);
      console.log(error, `error message : ${error.response.data.info}`);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/login');
  };

  const userIcon = (
    <svg className="user-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
    </svg>
  );

  return (
    <>
      {isLoading && <Spinner />}

      <SuccessPopup
        open={showSuccessPopup}
        onClose={handleClosePopup}
        email={formData.email}
      />

      <AuthCard
        title={content.createAccount}
        subtitle={content.joinUsToday}
        footerText={content.alreadyHaveAccount}
        footerLink="/login"
        footerLinkText={content.signIn}
      >
        {errorMessage && (
          <Alert severity="error" style={{ marginBottom: '1rem' }}>
            {errorMessage}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <div className="form-fields">
            <div className="name-fields">
              <InputField
                id="first-name"
                name="firstName"
                type="text"
                label={content.firstName}
                placeholder={content.firstNamePlaceholder}
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
                label={content.lastName}
                placeholder={content.lastNamePlaceholder}
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
              label={content.emailAddress}
              placeholder={content.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              error={errors.email}
            />

            <InputField
              id="username"
              name="username"
              type="text"
              label={content.username}
              placeholder={content.usernamePlaceholder}
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              error={errors.username}
            />

            <InputField
              id="date-of-birth"
              name="dateOfBirth"
              type="date"
              label={content.dateOfBirth}
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
              label={content.password}
              placeholder={content.passwordPlaceholder}
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              error={errors.password}
            />

            <InputField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label={content.confirmPassword}
              placeholder={content.passwordPlaceholder}
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
              {content.createAccount}
            </Button>
          </div>
        </form>
      </AuthCard>
    </>
  );
};

export default Register;