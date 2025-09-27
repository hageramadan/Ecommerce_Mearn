import { Link } from "react-router-dom"

function HeroBanner(props) {
    return (<>
     <div style={{ backgroundImage: `url(${props.img})` }} className="relative bg-cover bg-center  bg-no-repeat py-6 text-white">
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="relative z-10 container mx-auto">
          <div className="flex items-center justify-between flex-wrap sm:gap-6">
            <h3 className="font-semibold text-lg md:text-xl text-white animate-slide-left ">
              DON'T MISS 70% OFF ALL SALE! NO CODE NEEDED!
            </h3>
            <Link to="/products">
              <button className="animate-slide-right  px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>)
    }

export default HeroBanner