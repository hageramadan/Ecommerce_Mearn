import axiosInstance from "../../AxiosInstance/axiosConfig.js";


export const getwishlist = async () => {
    try {
        const response = await axiosInstance.get('/wishlist');
        return response.data;
    } catch (error) {
        console.log(error.data)
    }
};
export const addwishlist = async (productID) => {
    try {
        const response = await axiosInstance.post(`/wishlist`,
            {
                productId: productID
            }


        );
        return response
    } catch (error) {

    }


};
export const removeFromwishlist = async (productID) => {
    try {
        const response = await axiosInstance.delete(`wishlist/remove`,
            {
                data: {
                    productId: productID
                }
            }
        );
        return response
    } catch (error) {

    }
};        