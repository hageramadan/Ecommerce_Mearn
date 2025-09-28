import axiosInstance from "./../../AxiosInstance/axiosConfig.js"

export default function getToken({userNameOrMail , Password}) {
    // return function (dispatch) {
    //     return axiosInstance.post(`movie/popular`, {
    //         params: { page: activePage }
    //     })
    //         .then((res) => {
    //             dispatch({
    //                 type: "GET_MOVIES",
    //                 payload: res.data.results
    //             });
    //         })
    //         .catch((err) => {
    //             console.error('Movies fetch error:', err.message);
    //             dispatch({
    //                 type: "MOVIES_ERROR",
    //                 payload: err.message
    //             });
    //         });
    // };

    return function (dispatch)
    {
        return axiosInstance.post("/auth/login",{
            email : userNameOrMail,
            password : Password
        })
        .then((res)=>
        {
            dispatch({
                type : "GET_TOKEN",
                payload : res.data.data
            })
        })

        .catch((err)=>
        {
            console.error('Token fetch error:', err.message);
            dispatch({
                    type: "TOKEN_ERROR",
                    payload: err.message
                });
        })
    }
}