import axiosInstance from "../../AxiosInstance/axiosConfig.js";


export const getwishlist = async () => {
    try {
        const response = await axiosInstance.get('/wishlist');
        return response.data.items;
    } catch (error) {
        console.log(error.data)
    }
};
export const addwishlist = async (productID) => {
    try {
        const response = await axiosInstance.delete(`/wishlist/remove`,
            {
                productId: productID
            }
        );
    } catch (error) {

    }
};
export const removewishlist = async (productID) => { 
    try {
        const response = await axiosInstance.post(`/wishlist`,
            {
                productId: productID
            }
        );
    } catch (error) {

    }
};        