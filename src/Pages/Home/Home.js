"use client"

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

// Remove 'async' here ↓
function Home() {
 

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
        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
          {/* Slider */}
          <div className="h-96 animate-slide-left">
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
          {/* Grid Images */}
          <div className="flex  gap-1 h-96 ">
            <ProductHover img={c4} title="Kids Collection" desc="Choose your style" animationClass="animate-slide-top" />
            <ProductHover img={c5} title="Man Collection" desc="Choose your style" animationClass="animate-slide-right" />
          </div>
        </div>
      </div>
      <Category />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-4 md:mx-40 my-12'>
        <ProductCard img={c1} title="Man Collection" price="20$" description="Choose your style" />
        <ProductCard img={c1} title="Man Collection" price="20$" description="Choose your style" />
        <ProductCard img={c1} title="Man Collection" price="20$" description="Choose your style" />
        <ProductCard img={c1} title="Man Collection" price="20$" description="Choose your style" />
        <ProductCard img={c1} title="Man Collection" price="20$" description="Choose your style" />
        <ProductCard img={c1} title="Man Collection" price="20$" description="Choose your style" />
        <ProductCard img={c1} title="Man Collection" price="20$" description="Choose your style" />
        <ProductCard img={c1} title="Man Collection" price="20$" description="Choose your style" />
      </div>
      <Offer />
    </>
  );
}

export default Home;