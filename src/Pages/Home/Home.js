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
import CateCard from '../../Components/CateCard.js';


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
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     // Debug token
//     const token = localStorage.getItem('authToken');
//     console.log('Current token:', token);
    
//     if (!token) {
//         console.error('No auth token found! Make sure you\'re logged in.');
//         setError('No authentication token found');
//         return;
//     }

//     const abortController = new AbortController();
    
//     axiosInstance
//         .get('/category', { signal: abortController.signal })
//         .then((response) => {
//             console.log('User Data:', response.data);
//             setUserData(response.data);
//         })
//         .catch((err) => {
//             if (err.name === 'AbortError') {
//                 console.log('Request aborted');
//             } else {
//                 console.error('Error fetching user:', err);
//                 setError(err.message);
//             }
//         });

//     return () => abortController.abort();
// }, []);
// console.log(userData)
  return (
    <>
      {/* Hero Banner */}
       <HeroBanner img={glass} />

      {/* Scrolling Message */}
      <div className="overflow-hidden whitespace-nowrap shadow text-sm">
        <div className="flex animate-marquee">
          {repeatedMessages.map((msg, index) => (
            <span key={index} className="mx-10">{msg}</span>
          ))}
        </div>
      </div>

      {/* Slider + Grid */}
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
              <ProductHover img={c4} title="Kids Collection" desc="Choose your style" animationClass="animate-slide-top"/>
              <ProductHover img={c5} title="Man Collection" desc="Choose your style" animationClass="animate-slide-right"  />
            </div>
          </div>
      </div>
      <div className="flex justify-around mx-4 md:mx-40 mt-6 items-center" >
        <CateCard image={c4} name="Kids Collection"/>
        <CateCard image={c4} name="Kids Collection"/>
        <CateCard image={c4} name="Kids Collection"/>
      </div>
    </>
  );
}
export default Home;
