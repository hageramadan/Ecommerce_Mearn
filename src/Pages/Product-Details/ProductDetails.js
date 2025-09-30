import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.data);
      })
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading</p>;
  if (!product) return <p>product not found</p>;

  const handleAddToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <span className="hover:underline cursor-default">
          {product.category?.Name}
        </span>
      </nav>

      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        {/* photo Products*/}
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

        {/* product details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-gray-600 font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size & Color */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <select className="border rounded-lg px-4 py-3 w-full">
                <option>Default</option>
              </select>
              <select className="border rounded-lg px-4 py-3 w-full">
                <option>Default</option>
              </select>
            </div>
            {/* add to cart button */}
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto px-6 py-3 bg-[rgb(254,153,0)] text-white rounded-lg shadow hover:bg-[rgb(230,130,0)] transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
