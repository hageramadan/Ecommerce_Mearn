import axiosInstance from "../../AxiosInstance/axiosConfig.js";

export const sendLoginRequest = async ({emailOrUsername, password}) => {
  let body = {};
  
  try {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailOrUsernameInput = String(emailOrUsername);
    
    // Fix: regex.test() not string.test()
    if (regex.test(emailOrUsernameInput)) {
      body = {
        email: emailOrUsername,
        password: password
      };
    } else {
      body = {
        userName: emailOrUsername,
        password: password  // Fix: lowercase 'password' to match
      };
    }
    
    const response = await axiosInstance.post('/auth/login', body);
    localStorage.setItem("authToken", response.data.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};