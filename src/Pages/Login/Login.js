import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getToken from '../../Redux/Actions/loginAction.js';
import Alert from '@mui/material/Alert';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate  = useNavigate();

  const tokenDispatch = useDispatch();

  const errorMessage = useSelector((state) => state.auth.error);
  const token = useSelector((state)=> state.auth.token);
  useEffect(() => {
    // console.log({ errorMessage });
    // <Alert severity="error">{errorMessage}</Alert>
    if (token != null) {
      navigate('/');
    }
  }, [token])
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
    tokenDispatch(getToken({ userNameOrMail: formData.email, Password: formData.password }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Sign In</h1>
          <p className="login-subtitle">Access your account</p>
        </div>
        {errorMessage&& (
          <Alert severity="error" style={{ marginBottom: '1rem' }}>
            {errorMessage}
          </Alert>
        )}

        {token && (
          <Alert severity="success" style={{ marginBottom: '1rem' }}>
            welome
          </Alert>
        )
        }

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-fields">
            <div className="field-group">
              <label htmlFor="email-address" className="field-label">
                Email or Username
              </label>
              <div className="field-input-wrapper">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="field-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-group">
              <div className="password-header">
                <label htmlFor="password" className="field-label">
                  Password
                </label>
                <div className="forgot-password">
                  <Link to="/" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="field-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="field-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="submit-section">
            <button type="submit" className="submit-button">
              <span className="button-icon">
                <svg className="lock-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fillRule="evenodd"></path>
                </svg>
              </span>
              Log in
            </button>
          </div>
        </form>

        <div className="signup-section">
          <p className="signup-text">
            Don't have an account?{' '}
            <Link to="/" className="signup-link">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;