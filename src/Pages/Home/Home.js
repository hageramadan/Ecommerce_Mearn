import c1 from '../../assets/c1.webp';
import c2 from '../../assets/c2.webp';
import c3 from '../../assets/c3.webp';
import c4 from '../../assets/c4.jpg';
import c5 from '../../assets/man.webp';
import { BoltIcon } from '@heroicons/react/24/outline';
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../Components/Arrow.js";
import glass from "../../assets/bgnav.jpg";
import ProductHover from '../../Components/ProductHover.js';
import HeroBanner from '../../Components/HeroBanner.js';
import Category from '../../Components/Category.js';
import ProductCard from '../../Components/Product-card.js';
import Offer from '../../Components/Offer.js';
import { addwishlist, getwishlist } from '../../api/wishlist/api.wishlist.js';
import { addToWishlist } from '../../Redux/wishlist.slice.js';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/axiosConfig.js';
import Spinner from '../../Components/spinner.js';
import { motion } from 'framer-motion';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/products?limit=1000`)
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // إعادة ضبط عدد المنتجات عند تغيير الكاتيجوري
  useEffect(() => {
    setVisibleCount(8);
  }, [selectedCategory]);
  const dispatch = useDispatch()
  async function getwishlisonLoading() {
    try {
      const response = await getwishlist()
      const items = response.data.items
      for (let index = 0; index < items.length; index++) {
        dispatch(addToWishlist(items[index]._id))
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getwishlisonLoading()
    console.log("function executed-------------------------------");
  }, [])
  const message = (
    <span className="flex items-center gap-2">
      <BoltIcon className="w-4 h-4 " />
      Free shipping on all US order or order above $200
      <span className="text-[2rem] mb-4">.</span>
    </span>
  );

  const repeatedMessages = Array(20).fill(message);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category?.Name === selectedCategory)
    : products;

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // دوال Cart/Wishlist/Details
  const addToCartCardHanle = async (product) => {
    console.log("Add to Cart", product)

    try {
      const res = await axiosInstance.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      console.log("Added to cart:", res.data);
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };
  const addTowishlistCardHanle = async (product) => {
    console.log("Add to Wishlist", product)
    await addwishlist(product._id)
    dispatch(addToWishlist(product._id))
  };
  const goToDetails = (id) => navigate(`/details/${id}`);

  return (
    <>
      <HeroBanner img={glass} />

      <div className="overflow-hidden whitespace-nowrap shadow text-sm">
        <div className="flex animate-marquee">
          {repeatedMessages.map((msg, index) => (
            <span key={index} className="mx-10">{msg}</span>
          ))}
        </div>
      </div>

      <div className="mx-4 md:mx-40 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="h-96">
            <Slider {...settings}>
              <div className="h-96">
                <img src={c1} alt="cover" className="w-full h-full object-cover" />
              </div>
              <div className="h-96">
                <img src={c2} alt="cover" className="w-full h-full object-cover" />
              </div>
              <div className="h-96">
                <img src={c3} alt="cover" className="w-full h-full object-cover" />
              </div>
            </Slider>
          </div>
          <div className="flex gap-1 h-96">
            <ProductHover img={c4} title="Kids Collection" desc="Choose your style" />
            <ProductHover img={c5} title="Man Collection" desc="Choose your style" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center my-16 gap-8">
          <Spinner />
          <Spinner />
        </div>
      ) : (
        <>
          <Category onSelectCategory={setSelectedCategory} />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-4 md:mx-40 my-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.slice(0, visibleCount).map((product, index) => (
              <motion.div key={product._id || index} variants={cardVariants}>
                <ProductCard
                  products={[product]}
                  addToCart={addToCartCardHanle}
                  addToWishlist={addTowishlistCardHanle}
                  goToDetails={goToDetails}
                />
              </motion.div>
            ))}
          </motion.div>

          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mb-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-gray-800 transition"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}

      <Offer />
    </>
  );
}

export default Home;
