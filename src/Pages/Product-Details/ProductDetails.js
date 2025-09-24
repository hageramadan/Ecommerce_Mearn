import { Link, useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate("/cart");
  };
  const product = {
    id,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    category: "Men's Clothes",
    description:
      "This classic t-shirt is made from 100% premium cotton, offering both comfort and durability. Available in a variety of colors and sizes, it's perfect for everyday wear.",

    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    reviews: [
      {
        user: "Liam Carter",
        date: "2023-08-15",
        rating: 5,
        text: "Great quality t-shirt! The fabric is soft and comfortable, and the fit is perfect. I've washed it several times, and it still looks new.",
        avatar: "https://i.pravatar.cc/40?img=1",
      },
      {
        user: "Sophia Bennett",
        date: "2023-07-22",
        rating: 4,
        text: "I like the t-shirt, but the color was slightly different from what I expected. Overall, it's a good product for the price.",
        avatar: "https://i.pravatar.cc/40?img=2",
      },
      {
        user: "Ethan Harper",
        date: "2023-06-10",
        rating: 5,
        text: "Excellent t-shirt! The material is high-quality, and the stitching is well-done. I highly recommend this product.",
        avatar: "https://i.pravatar.cc/40?img=3",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <span className="hover:underline cursor-default">
          {product.category}
        </span>
      </nav>
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        {/* صورة المنتج */}
        <div className="flex justify-center">
          <img
            src="./image1.png"
            alt={product.name}
            className="rounded-lg shadow-md w-full max-w-md object-cover"
          />
        </div>

        {/* product detalis*/}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-gray-600 font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/*  Size & Color */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <select className="border rounded-lg px-4 py-3 w-full">
                {product.sizes.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
              <select className="border rounded-lg px-4 py-3 w-full">
                {product.colors.map((color) => (
                  <option key={color}>{color}</option>
                ))}
              </select>
            </div>
            {/* add to cart button */}
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold">4.5</p>
            <p className="text-yellow-500 text-lg">★★★★★</p>
            <p className="text-gray-500 text-sm">Based on 125 reviews</p>
          </div>
          {/* Bars */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div key={i} className="flex items-center gap-2 text-sm mb-1">
                <span>{star}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-yellow-400 rounded"
                    style={{
                      width: `${[40, 30, 15, 10, 5][i]}%`,
                    }}
                  ></div>
                </div>
                <span>{[40, 30, 15, 10, 5][i]}%</span>
              </div>
            ))}
          </div>
        </div>
        {/* Comments */}
        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{review.user}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.text}</p>
              <p className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
