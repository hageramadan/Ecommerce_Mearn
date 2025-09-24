import { Link } from "react-router-dom"

function Deals(props){
    return(
        <>
          <div className="bg-white/90 p-3 shadow mb-4 pb-7 w-full">
            <h3 className="text-base md:text-lg font-bold mb-2 text-gray-800">{props.title}</h3>
            <img src={props.img} alt="deal" className="w-full  object-cover h-80 mb-5" />
            <Link to={"/products"} className="mt-2  hover:text-orange-600  py-2 ">Shop Now</Link>
          </div>       
        </>
    )
}

export default Deals