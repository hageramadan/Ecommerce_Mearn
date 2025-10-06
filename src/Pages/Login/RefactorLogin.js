import React, { useEffect, useState } from 'react';
import './RefactorLogin.css';
import AuthCard from '../../Components/AuthCard.js';
import InputField from '../../Components/InputField.js';
import Button from '../../Components/Button.js';
import Checkbox from '../../Components/checkBox.js';
import { useNavigate } from 'react-router-dom';
import { sendLoginRequest } from '../../api/auth/api.auth.js';
import Alert from '@mui/material/Alert';
import Spinner from '../../Components/spinner.js';
import { useSelector } from 'react-redux';

const Login = () => {
  const content = useSelector((state) => state.langReducer.content);
  const navigate = useNavigate();
  
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
      newErrors.email = content.emailRequired;
    } else if (formData.email.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = content.invalidEmail;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = content.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = content.passwordMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    setIsLoading(true);
    try {
      await sendLoginRequest({ emailOrUsername: formData.email, password: formData.password });
      setIsLoading(false);
      if (adminCheck) {
        navigate("/admin");
      }
      else
      {
        navigate("/");
      }
    } catch (error) {
      seterrorMessage(error.response.data.info);
      console.log(error, `error message : ${error.response.data.info}`);
      setIsLoading(false);
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
      {isLoading && <Spinner />}

      <AuthCard
        title={content.signIn}
        subtitle={content.accessYourAccount}
        footerText={content.dontHaveAccount}
        footerLink="/register"
        footerLinkText={content.signUpNow}
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
              label={content.emailOrUsername}
              placeholder={content.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              error={errors.email}
            />

            <InputField
              id="password"
              name="password"
              type="password"
              label={content.password}
              placeholder={content.passwordPlaceholder}
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              error={errors.password}
            />

            <Checkbox
              id="admin-login"
              name="isAdmin"
              label={content.logAsAdmin}
              checked={formData.isAdmin}
              onChange={handleChange}
              description={content.adminDescription}
            />
          </div>

          <div className="submit-section">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              leftIcon={lockIcon}
            >
              {content.logIn}
            </Button>
          </div>
        </form>
      </AuthCard>
    </>
  );
};

export default Login;