import ProductCard from "../../Components/Product-card"
import pro from '../../assets/p1.jpg';
import c1 from '../../assets/c1.webp';
import c2 from '../../assets/c2.webp';
import c3 from '../../assets/c3.webp';
import c4 from '../../assets/c4.webp';
import c5 from '../../assets/c5.webp';

import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrow.js"; 
import d1 from '../../assets/deal.avif';
import d2 from '../../assets/deal2.avif';
import d3 from '../../assets/deal3.webp';
import d4 from '../../assets/deal4.jpg';
import d5 from '../../assets/deal5.jpg';

import Deals from "../../Components/Deals.js";

function Home(){
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

  return(
    <>
  
    <div className="mx-4 md:mx-40 mt-0 relative">
        <div className="relative group mb-2 mt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 overflow-hidden">
           {/* Slider */}
            <Slider {...settings}>
              <img src={c1} alt="cover" className="w-full object-cover" />
              <img src={c2} alt="cover" className="w-full object-cover" />
              <img src={c3} alt="cover" className="w-full object-cover" />
          
            </Slider>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1  overflow-hidden ">
                    <img src={c4} alt="cover" className="w-full object-cover "/>
                   
                    <img src={c5} alt="cover" className="w-full object-cover "/>
             </div>
            
          </div>
           
        </div>
        
        {/* Deals */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Deals title="Deal 1" img={d1} />
          <Deals title="Deal 2" img={d2} />
          <Deals title="Deal 3" img={d3} />
          <Deals title="Deal 4" img={d4} />
          <Deals title="Deal 5" img={d5} />
         </div>

        {/* <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 xl3:grid-cols-4" >
          <ProductCard title="Product 1" description="Description 1" img={pro} price="$10"/>
          <ProductCard title="Product 1" description="Description 1" img={pro}/>
          <ProductCard title="Product 1" description="Description 1" img={pro}/>
          <ProductCard title="Product 1" description="Description 1" img={pro}/>
          <ProductCard title="Product 1" description="Description 1" img={pro}/>
          <ProductCard title="Product 1" description="Description 1" img={pro}/>
        </div> */}
    </div>
    </>
  )
}

export default Home