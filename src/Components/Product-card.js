import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

function ProductCard({ products, addToCart, addToWishlist, goToDetails, wishlist }) {
  return (
    <>
      {products.map((product) => {
        const isWishlisted = wishlist?.some(item => item._id === product._id);

        return (
          <div
            key={product._id}
            className="relative flex flex-col gap-1 p-1 cursor-pointer overflow-hidden shadow hover:shadow-sm transition group"
          >
            {/* Product Image */}
            <div
              className="overflow-hidden w-full h-48 relative"
              onClick={() => goToDetails(product._id)}
            >
              <img
                src={`https://raw.githubusercontent.com/MMarzoo/my-image/main/images/${product.images[0]}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                alt={product.name}
              />

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent navigation when clicking buttons
                    addToCart(product);
                    toast.success("Product added to cart!");
                  }}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ShoppingBagIcon className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product);
                    toast.success("Product added to wishlist!");
                  }}
                  className={`p-2 rounded-full shadow hover:bg-gray-100 ${
                    isWishlisted ? "bg-red-100" : "bg-white"
                  }`}
                >
                  <HeartIcon
                    className={`w-6 h-6 ${isWishlisted ? "text-red-500" : "text-gray-500"}`}
                  />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col p-2 relative">
              <h5 className="font-semibold">{product.name}</h5>
              <p className="text-gray-700">{product.price ? product.price : "5$"} EGP</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
