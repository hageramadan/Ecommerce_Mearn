import React, { useEffect, useState } from 'react';
import './RefactorLogin.css';
import AuthCard from '../../Components/AuthCard.js';
import InputField from '../../Components/InputField.js';
import Button from '../../Components/Button.js';
// import Checkbox from '../../Components/Checkbox.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getToken from '../../Redux/Actions/loginAction.js';
import Alert from '@mui/material/Alert';
import Checkbox from '../../Components/checkBox.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isAdmin: false
  });

  const navigate = useNavigate();
  const tokenDispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token != null) {
      navigate('/');
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    
    // You can modify the login action to include admin flag if needed
    tokenDispatch(getToken({ 
      userNameOrMail: formData.email, 
      Password: formData.password,
    }));
  };

  const lockIcon = (
    <svg className="lock-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fillRule="evenodd"></path>
    </svg>
  );

  const adminCheck = formData.isAdmin

  useEffect(()=>
  {
    console.log({adminCheck})
    if (adminCheck) {
      localStorage.setItem("Bearer","admin")
    }
    else
    {
      localStorage.setItem("Bearer","Bearer")
    }
  },[adminCheck])

  // const forgotPasswordLink = (
  //   <a href="#" className="forgot-link">
  //     Forgot password?
  //   </a>
  // );

  return (
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

      {token && (
        <Alert severity="success" style={{ marginBottom: '1rem' }}>
          welcome
        </Alert>
      )}
      
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
            // rightElement={forgotPasswordLink}
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
  );
};

export default Login;