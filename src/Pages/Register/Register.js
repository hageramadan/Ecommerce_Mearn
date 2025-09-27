import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    userName: '',
    email: '',
    password: '',
    DOB: ''
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
    // Handle signup logic here
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <main className="signup-main">
          <div className="signup-content">
            <div className="signup-header">
              <div className="logo">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="signup-title">Create your account</h2>
              <p className="signup-subtitle">
                Already have an account?{' '}
                <Link to="/" className="signin-link">Sign In</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-fields">
                <div className="name-row">
                  <div className="name-field">
                    <label htmlFor="first-name" className="sr-only">First Name</label>
                    <input
                      className="form-input"
                      id="first-name"
                      name="firstName"
                      placeholder="First Name"
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="name-field">
                    <label htmlFor="second-name" className="sr-only">Second Name</label>
                    <input
                      className="form-input"
                      id="second-name"
                      name="secondName"
                      placeholder="Second Name"
                      required
                      type="text"
                      value={formData.secondName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="user-name" className="sr-only">User Name</label>
                  <input
                    className="form-input"
                    id="user-name"
                    name="userName"
                    placeholder="User Name"
                    required
                    type="text"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    autoComplete="email"
                    className="form-input"
                    id="email-address"
                    name="email"
                    placeholder="Email address"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    autoComplete="new-password"
                    className="form-input"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="dob" className="sr-only">Date of Birth</label>
                  <input
                    className="form-input"
                    id="dob"
                    name="DOB"
                    placeholder="Date of Birth"
                    required
                    type="date"
                    value={formData.DOB}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="submit-section">
                <button type="submit" className="create-account-btn">
                  Create Account
                </button>
              </div>

              <div className="verification-notice">
                <p>A verification link will be sent to your email address. Please check your inbox and follow the instructions to activate your account.</p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Signup;