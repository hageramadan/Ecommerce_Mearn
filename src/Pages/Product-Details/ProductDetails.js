import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import Spinner from "../../Components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../Redux/wishlist.slice";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const content = useSelector((state) => state.langReducer.content);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity] = useState(1);
  const dispatch = useDispatch();

  //  toast message state
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      const res = await axiosInstance.post("/wishlist", {
        productId: product._id,
      });
      console.log("Added to wishlist:", res.data);
      dispatch(addToWishlist(product._id));

      // Show success toast
      setToast({
        show: true,
        message: "Product added to wishlist!",
        type: "success",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      //  Show error toast
      setToast({
        show: true,
        message: "Failed to add to wishlist!",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }
  };

  if (loading) return <Spinner />;
  if (!product) return <p>Product not found</p>;
  const handleAddToCart = async () => {
    try {
      const res = await axiosInstance.post("/cart/add", {
        productId: product._id,
        quantity: quantity,
      });
      console.log("Added to cart:", res.data);
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      {/* Toast Message */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-md text-white z-50 transition-all duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">
          {content.home}
        </Link>{" "}
        /{" "}
        <span className="hover:underline cursor-default">
          {product.category?.Name}
        </span>
      </nav>

      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={
              product.images?.length > 0
                ? `https://raw.githubusercontent.com/MMarzoo/my-image/main/images/${product.images[0]}`
                : "/placeholder.png"
            }
            alt={product.name}
            className="rounded-lg shadow-md w-full max-w-md object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-gray-600 font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <select className="border rounded-lg px-4 py-3 w-full">
                <option disabled selected>
                  {content.size}
                </option>
              </select>
              <select className="border rounded-lg px-4 py-3 w-full">
                <option disabled selected>
                  {content.color}
                </option>
              </select>
            </div>

            {/* Buttons */}
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto px-6 py-3 bg-[rgb(254,153,0)] text-white rounded-lg shadow hover:bg-[rgb(230,130,0)] transition"
            >
              {content.addToCart}
            </button>
            <button
              onClick={handleAddToWishlist}
              className="w-full md:w-auto px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              {content.addToWishlist}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
