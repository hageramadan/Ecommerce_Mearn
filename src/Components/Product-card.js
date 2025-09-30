import { ShoppingBagIcon , HeartIcon} from "@heroicons/react/24/outline";


function ProductCard(props) {
  return (
    <>
      <div className="relative flex flex-col gap-1 p-1 cursor-pointer overflow-hidden shadow hover:shadow-sm transition group">
        {/* الصورة */}
        <div className="overflow-hidden w-full h-48 relative">
          <img
            src={props.img}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            alt="..."
          />

          {/* الأيقونات (تظهر عند hover) */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
              <ShoppingBagIcon className="w-6 h-6" />
            </button>
            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
              <HeartIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col p-2 relative">
          <h5 className="font-semibold">{props.title}</h5>
          <p className="text-gray-700">{props.price ? props.price : "5$"}</p>
      
        </div>
      </div>
    </>
  );
}

export default ProductCard;
