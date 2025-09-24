import React, { useState } from 'react';
import './AccountDetails.css';

const AccountDetails = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    // Handle personal info update
    console.log('Personal info update:', personalInfo);
  };

  const handleShippingAddressSubmit = (e) => {
    e.preventDefault();
    // Handle shipping address update
    console.log('Shipping address update:', shippingAddress);
  };

  return (
    <div className="account-details-wrapper">
      <main className="account-details-main">
        <div className="account-details-container">
          <h1 className="page-title">Account Details</h1>
          
          <div className="sections-container">
            {/* Personal Information Section */}
            <div className="info-section">
              <h3 className="section-title">Personal Information</h3>
              <form onSubmit={handlePersonalInfoSubmit} className="section-form">
                <div className="form-grid-two">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                      className="form-input"
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={personalInfo.fullName}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      className="form-input"
                      id="email"
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    className="form-input"
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={personalInfo.phoneNumber}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="form-actions">
                  <button className="update-btn" type="submit">
                    Update Information
                  </button>
                </div>
              </form>
            </div>

            {/* Shipping Address Section */}
            <div className="info-section">
              <h3 className="section-title">Shipping Address</h3>
              <form onSubmit={handleShippingAddressSubmit} className="section-form">
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    className="form-input"
                    id="address"
                    name="address"
                    type="text"
                    value={shippingAddress.address}
                    onChange={handleShippingAddressChange}
                  />
                </div>
                
                <div className="form-grid-three">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      className="form-input"
                      id="city"
                      name="city"
                      type="text"
                      value={shippingAddress.city}
                      onChange={handleShippingAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                      className="form-input"
                      id="state"
                      name="state"
                      type="text"
                      value={shippingAddress.state}
                      onChange={handleShippingAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode" className="form-label">Zip Code</label>
                    <input
                      className="form-input"
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={handleShippingAddressChange}
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button className="update-btn" type="submit">
                    Update Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountDetails;