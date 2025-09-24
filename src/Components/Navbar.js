import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 flex items-center bg-[#edf2fa] relative">
      {/* الحاوية الرئيسية: 3 أعمدة */}
      <div className="flex justify-between items-center w-full">
        
        {/* Logo - شمال */}
        <div className="flex gap-2 items-center">
          <img className="w-10 h-10" src="./favicon.png" alt="buy" />
          <Link to="/" className="text-[1.3rem] font-normal">Buybuy</Link>
        </div>

        {/* القائمة - نص */}
        <ul
          className={`hidden md:flex gap-6 absolute md:static left-1/2 transform -translate-x-1/2 z-50`}
        >
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:underline">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </li>
          <li>
            <Link to="/wishlist" className="hover:underline">Wishlist</Link>
          </li>
        </ul>

        {/* Icons - يمين */}
        <div className="flex gap-4 cursor-pointer items-center">
          <Link to='/wishlist'>
            <HeartIcon className="w-6 h-6 hover:text-pink-500" />
          </Link>
          <Link to='/cart'>
            <ShoppingBagIcon className="w-6 h-6 hover:text-blue-500" />
          </Link>
          <Link to='/login'>
            <UserIcon className="w-6 h-6 hover:text-gray-700" />
          </Link>
          {/* <AdjustmentsHorizontalIcon className="w-6 h-6 hover:text-gray-700"/> */}

          {/* زرار المينيو (يظهر في الموبايل فقط) */}
          <button
            className="text-2xl md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* القائمة في الموبايل */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#edf2fa] z-40 transition-all duration-500 ease-in-out overflow-hidden md:hidden
        ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col gap-4 p-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:underline">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </li>
          <li>
            <Link to="/wishlist" className="hover:underline">Wishlist</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}



export default Navbar;
