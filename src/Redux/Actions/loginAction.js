import axiosInstance from "./../../AxiosInstance/axiosConfig.js"

export default function getToken({ userNameOrMail, Password }) {
    return function (dispatch) {
        return axiosInstance.post("/auth/login", {
            "email": userNameOrMail,
            "password": `${Password}` 
        })
        .then((res) => {
            console.log('✅ SUCCESS:', res.data);
            localStorage.setItem("authToken", res.data.data);
            dispatch({
                type: "GET_TOKEN",
                payload: res.data.data
            });
            return res;
        })
        .catch((err) => {
            console.error('❌ API Error Details:');
            console.error('Status:', err.response?.status);
            console.error('Error message:', err.response?.data?.message);
            console.error('Full error response:', err.response?.data);
            
            dispatch({
                type: "TOKEN_ERROR",
                payload: err.response?.data?.message || err.message
            });
            
            return Promise.reject(err);
        });
    }
}